import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from 'drizzle-orm';
import { users } from "./users";

// ======================
// 商品模板表 —— 定义可兑换商品的规则
// ======================
export const productTemplates = sqliteTable('product_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  title: text('title').notNull(),
  description: text('description'),
  pointsCost: integer('points_cost').notNull(), // 兑换所需积分

  // 类型：consumable（需“使用”） | permanent（永久拥有，如徽章）
  type: text('type', { enum: ['consumable', 'permanent'] }).notNull().default('consumable'),

  // 兑换后有效时长（毫秒），0 表示永久有效
  validDuration: integer('valid_duration').notNull().default(0),

  // 每人最多可持有数量（-1 表示无限制）
  maxPerUser: integer('max_per_user').notNull().default(-1),

  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true), // 是否可兑换

  // 补货规则：控制该商品是否在当前时间窗口内可兑换
  replenishmentMode: text('replenishment_mode', {
    enum: ['none', 'daily', 'weekly', 'monthly'],
  }).notNull().default('none'),

  replenishmentInterval: integer('replenishment_interval'), // daily 模式用
  replenishmentDaysOfWeek: text('replenishment_days_of_week'),   // JSON: "[1,3]"
  replenishmentDaysOfMonth: text('replenishment_days_of_month'), // JSON: "[1,15]"

  // 上次开放兑换时间（用于判断补货周期）
  lastReplenishedAt: integer('last_replenished_at', { mode: 'timestamp' }),

  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
});

// ======================
// 商品实例表 —— 用户背包中的具体物品（支持“使用”动作）
// ======================
export const productInstances = sqliteTable('product_instances', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  templateId: integer('template_id').notNull().references(() => productTemplates.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // 状态：
  // - available: 可使用
  // - used: 已使用（仅 consumable 类型）
  // - expired: 已过期
  status: text('status', { enum: ['available', 'used', 'expired'] }).notNull().default('available'),

  issuedAt: integer('issued_at', { mode: 'timestamp' }).notNull(), // 兑换时间
  expiresAt: integer('expires_at', { mode: 'timestamp' }),         // 过期时间（可为空）
  usedAt: integer('used_at', { mode: 'timestamp' }),               // 使用时间（可为空）

  // 扩展数据：存储唯一码、批次号等（JSON 字符串）
  metadata: text('metadata'), // e.g. '{"code":"XYZ789","store":"Cafe"}'

}, (table) => ({
  userStatusIdx: index('product_instance_user_status_idx').on(table.userId, table.status),
}));
