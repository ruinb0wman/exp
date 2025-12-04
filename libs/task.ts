// file: lib/task-scheduling.ts (或你项目的任意位置)

import { eq, sql, and, inArray } from 'drizzle-orm';
import type { InferSelectModel } from 'drizzle-orm';
import { taskTemplates, taskInstances } from '@/db/schema'; // 👈 替换为你的实际 schema 路径

// 类型别名
export type TaskTemplate = InferSelectModel<typeof taskTemplates>;
export type TaskInstanceInsert = typeof taskInstances.$inferInsert;
export type TaskInstanceStatus = 'pending' | 'completed' | 'skipped';

/**
 * 统计某个任务模板已生成的实例数量
 * @param db Drizzle 数据库实例
 * @param templateId 模板 ID
 * @param options.status 可选，指定要统计的状态（如 ['pending', 'completed']）
 * @param options.scheduledBefore 可选，只统计 scheduledDate <= 该时间戳 的实例（单位：毫秒）
 * @returns 实例数量（number）
 */
export async function countTaskInstances(
  db: any,
  templateId: number,
  options?: {
    status?: TaskInstanceStatus[] | null;
    scheduledBefore?: number | null;
  }
): Promise<number> {
  const { status, scheduledBefore } = options ?? {};

  let whereConditions = [eq(taskInstances.templateId, templateId)];

  if (status && status.length > 0) {
    whereConditions.push(inArray(taskInstances.status, status));
  }

  if (scheduledBefore != null) {
    whereConditions.push(sql`${taskInstances.scheduledDate} <= ${scheduledBefore}`);
  }

  const whereClause =
    whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(taskInstances)
    .where(whereClause);

  return count;
}

// ==============================
// 2. 判断是否应生成任务实例
// ==============================
/**
 * 根据模板和日期，判断是否应生成一个任务实例
 * @param db Drizzle 数据库实例
 * @param date 要检查的日期（函数内部会标准化为当天 00:00:00）
 * @param template 任务模板对象
 * @returns 可插入的 taskInstances 对象，或 null（不生成）
 */
export async function generateTaskInstanceIfApplicable(
  db: any,
  date: Date,
  template: TaskTemplate
): Promise<TaskInstanceInsert | null> {
  // 标准化目标日期为当天 00:00:00（本地时区）
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const targetTimestamp = targetDate.getTime();

  // 1. 模板必须启用
  if (!template.enabled) return null;

  // 2. 一次性任务不参与自动排期
  if (template.repeatMode === 'none') return null;

  // 3. 检查结束条件：date
  if (template.endCondition === 'date' && template.endValue) {
    const endDate = new Date(template.endValue);
    endDate.setHours(0, 0, 0, 0);
    if (targetDate >= endDate) {
      return null;
    }
  }

  // 4. 检查结束条件：times
  if (template.endCondition === 'times' && template.endValue) {
    const maxTimes = Number(template.endValue);
    if (isNaN(maxTimes) || maxTimes <= 0) return null;

    // 👇 关键：统计截至 targetDate 的有效实例数（这里包含 skipped）
    // 如果你不希望 skipped 算次数，请将 status 改为 ['pending', 'completed']
    const currentCount = await countTaskInstances(db, template.id, {
      scheduledBefore: targetTimestamp,
      // status: ['pending', 'completed'] // ← 取消注释以排除 skipped
    });

    if (currentCount >= maxTimes) {
      return null;
    }
  }

  // 5. 检查重复规则
  const dayOfWeek = targetDate.getDay();     // 0=Sun, 1=Mon, ..., 6=Sat
  const dayOfMonth = targetDate.getDate();   // 1–31

  switch (template.repeatMode) {
    case 'daily':
      break; // 每天都允许

    case 'weekly': {
      let days: number[] = [];
      try {
        if (template.repeatDaysOfWeek) {
          days = JSON.parse(template.repeatDaysOfWeek);
        }
      } catch (e) {
        console.warn(`Invalid repeatDaysOfWeek for template ${template.id}`);
        return null;
      }
      if (!days.includes(dayOfWeek)) return null;
      break;
    }

    case 'monthly': {
      let days: number[] = [];
      try {
        if (template.repeatDaysOfMonth) {
          days = JSON.parse(template.repeatDaysOfMonth);
        }
      } catch (e) {
        console.warn(`Invalid repeatDaysOfMonth for template ${template.id}`);
        return null;
      }
      if (!days.includes(dayOfMonth)) return null;
      break;
    }

    default:
      return null;
  }

  // 6. 决定子任务（如果启用随机）
  let subtask: string | undefined;
  if (Array.isArray(template.subtasks) && template.subtasks.length > 0) {
    if (template.isRandomSubtask) {
      const randomIdx = Math.floor(Math.random() * template.subtasks.length);
      subtask = template.subtasks[randomIdx];
    }
    // 否则留空，由业务层决定（比如让用户选择）
  }

  // 7. 返回可插入对象
  return {
    templateId: template.id,
    scheduledDate: targetDate,
    awardedPoints: template.rewardPoints,
    subtask,
    status: 'pending',
  };
}

/**
 * 为多个任务模板在指定日期范围内生成所有应安排的任务实例（仅生成对象，不插入 DB）
 * @param db Drizzle 数据库实例
 * @param startDate 起始日期（包含）
 * @param endDate 结束日期（包含）
 * @param templates 任务模板列表
 * @returns 所有符合排期规则的 taskInstances 插入对象数组
 */
export async function generateTaskInstancesInRange(
  db: any,
  startDate: Date,
  endDate: Date,
  templates: TaskTemplate[]
): Promise<TaskInstanceInsert[]> {
  // 标准化日期范围（本地时区 00:00:00）
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (start > end) {
    return [];
  }

  // 生成日期范围内的所有日期（含首尾）
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // 为每个模板 + 每个日期尝试生成实例
  const instancesToCreate: TaskInstanceInsert[] = [];

  for (const template of templates) {
    for (const date of dates) {
      const instance = await generateTaskInstanceIfApplicable(db, date, template);
      if (instance) {
        instancesToCreate.push(instance);
      }
    }
  }

  return instancesToCreate;
}
