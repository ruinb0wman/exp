import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

// ======================
// 任务模板表
// ======================
export const taskTemplates = sqliteTable('task_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  rewardPoints: integer('reward_points').notNull(),
  repeatMode: text('repeat_mode', { enum: ['none', 'daily', 'weekly', 'monthly'] }).notNull(),
  repeatInterval: integer('repeat_interval'),
  repeatDaysOfWeek: text('repeat_days_of_week'), // JSON string of number[]
  repeatDaysOfMonth: text('repeat_days_of_month'), // JSON string of number[]
  endCondition: text('end_condition', { enum: ['times', 'date', 'manual'] }).notNull(),
  endValue: text('end_value'),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
  subtasks: text('subtasks').$type<string[]>().default(sql`'[]'`),
  isRandomSubtask: integer('is_random_subtask', { mode: 'boolean' }).notNull().default(false),
});

// ======================
// 任务实例表
// ======================
export const taskInstances = sqliteTable('task_instances', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  templateId: integer('template_id').notNull().references(() => taskTemplates.id, { onDelete: 'cascade' }),
  scheduledDate: integer('scheduled_date', { mode: 'timestamp' }).notNull(),
  status: text('status', { enum: ['pending', 'completed', 'skipped'] }).notNull().default('pending'),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  awardedPoints: integer('awarded_points').notNull(),
  subtask: text('subtask'),
}, (table) => ({
  uniqueTemplateDate: index('task_instance_template_date_unique')
    .on(table.templateId, table.scheduledDate),
}));
