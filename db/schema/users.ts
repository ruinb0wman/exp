import { sqliteTable, text, integer, index, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // 实际应存储 bcrypt 哈希值
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}));

// ======================
// 用户积分余额（冗余设计，提升性能）
// ======================
export const userPoints = sqliteTable('user_points', {
  userId: integer('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  balance: integer('balance').notNull().default(0),
});

// ======================
// （可选）任务完成记录审计表 —— 用于调试或统计
// ======================
// export const taskCompletions = sqliteTable('task_completions', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   instanceId: integer('instance_id').not null().references(() => taskInstances.id),
//   completedAt: integer('completed_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
//   awardedPoints: integer('awarded_points').notNull(),
// });
