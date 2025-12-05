import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ======================
// 用户表（本地单用户默认 ID=1）
// ======================
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  currentPoints: integer('current_points').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),

  lastGenerateTasks: integer('created_at', { mode: 'timestamp' }),
  lastGenerateRewards: integer('created_at', { mode: 'timestamp' }),
});

// ======================
// 积分流水表 (新增)
// ======================
export const pointsHistory = sqliteTable('points_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // 关联用户
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // 变动量：正数表示获得，负数表示花费
  amount: integer('amount').notNull(),

  // 变动类型
  type: text('type', {
    enum: [
      'task_reward',    // 任务完成奖励
      'reward_exchange', // 兑换商品花费
      'admin_adjustment', // 后台调整
    ]
  }).notNull(),

  // 关联的实体 ID （用于追溯）
  relatedEntityId: integer('related_entity_id'),

  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});
