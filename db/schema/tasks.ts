import { sqliteTable, text, integer, index, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';
import { users } from "./users";

// ======================
// 任务模板表 —— 定义任务规则（不直接执行）
// ======================
export const taskTemplates = sqliteTable('task_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),       // 任务名称
  description: text('description'),     // 任务描述

  rewardPoints: integer('reward_points').notNull(), // 完成奖励积分

  // 重复模式：none | daily | weekly | monthly
  repeatMode: text('repeat_mode', { enum: ['none', 'daily', 'weekly', 'monthly'] }).notNull(),

  // daily 模式：每 N 天执行一次（N ≥ 1）
  repeatInterval: integer('repeat_interval'),

  // weekly 模式：JSON 数组 [1..7]，1=周一, 7=周日
  repeatDaysOfWeek: text('repeat_days_of_week'),

  // monthly 模式：JSON 数组 [1..31]
  repeatDaysOfMonth: text('repeat_days_of_month'),

  // 结束条件：times（按次数）| date（截止日期）| manual（手动停止）
  endCondition: text('end_condition', { enum: ['times', 'date', 'manual'] }).notNull(),
  endValue: text('end_value'), // 若为 times → 字符串数字 "10"；若为 date → ISO 日期 "2025-12-31"

  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true), // 是否启用

  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
});

// ======================
// 任务实例表 —— 由模板生成的具体待办事项（绑定到具体日期）
// ======================
export const taskInstances = sqliteTable('task_instances', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  templateId: integer('template_id').notNull().references(() => taskTemplates.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // 实例对应的日期（00:00:00 UTC 时间戳，仅日期维度）
  scheduledDate: integer('scheduled_date', { mode: 'timestamp' }).notNull(),

  // 状态：pending（未完成）| completed（已完成）| skipped（跳过）
  status: text('status', { enum: ['pending', 'completed', 'skipped'] }).notNull().default('pending'),

  completedAt: integer('completed_at', { mode: 'timestamp' }), // 完成时间
  awardedPoints: integer('awarded_points').notNull(),          // 快照：防止模板修改影响历史

}, (table) => ({
  // 联合索引：快速查询某用户某天的任务
  userDateIdx: index('task_instance_user_date_idx').on(table.userId, table.scheduledDate),
  // 防止同一模板同一天重复生成
  uniqueTemplateDate: index('task_instance_template_date_unique')
    .on(table.templateId, table.scheduledDate),
}));

// ======================
// 子任务模板表 —— 属于任务模板的选项列表
// ======================
export const subtaskTemplates = sqliteTable('subtask_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  templateId: integer('template_id').notNull().references(() => taskTemplates.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // 子任务名称，如 "小王子"
});

// ======================
// 任务实例关联的子任务（多选支持）
// ======================
export const taskInstanceSubtasks = sqliteTable(
  'task_instance_subtasks',
  {
    instanceId: integer('instance_id').notNull().references(() => taskInstances.id, { onDelete: 'cascade' }),
    subtaskTemplateId: integer('subtask_template_id').notNull().references(() => subtaskTemplates.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.instanceId, t.subtaskTemplateId] }),
  })
);
