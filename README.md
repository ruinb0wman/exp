# exp - 任务导向自律养成工具

## 项目简介

exp 是一个以任务为导向、商城商品作为激励的自律养成工具。用户通过完成任务获得积分，用积分在商城兑换商品，形成正向激励循环，帮助养成良好习惯。

## 核心功能

### 任务管理
- **创建任务**：设置任务名称、描述、完成奖励积分
- **重复设置**：支持每日、每周、每月重复模式
  - 按日重复, 则可以设置每n天执行
  - 按周重复, 则可以设置每周几重复, 例如每周一, 周二
  - 按月重复, 可可以设置每月几号重复, 例如每月15号, 20号
- **结束条件**：按完成次数、截止日期或手动停止
- **子任务**：支持多选项任务，可选择手动或随机模式
  - 子任务仅仅是一个名称数组
  - 例如有一个"读书"任务有三个子任务"小王子","活着","1984"
- **任务模板**：基于模板动态生成任务实例

### 日历视图
- **日期筛选**：查看指定日期的待执行任务
- **任务预览**：日历界面显示任务完成状态

### 积分商城
- **商品管理**：创建、编辑、删除商城商品
- **自动补货**：支持多种补货周期设置
  - 按日补货, 则可以设置每n天执行
  - 按周补货, 则可以设置每周几重复, 例如每周一, 周二
  - 按月补货, 可可以设置每月几号重复, 例如每月15号, 20号
- **库存控制**：设置库存上限，避免过度补货

### 个人中心
- **积分管理**：查看当前积分余额
- **背包系统**：管理已购买商品，支持使用功能

## 技术特点

- **响应式设计**：适配多种设备屏幕
- **本地存储**：数据持久化，保护用户信息
- **直观界面**：简洁易用的操作体验
- **灵活配置**：丰富的任务和商品设置选项
- 技术栈: expo, sqlite, drizzle, zustand

## 使用场景

- 个人习惯养成
- 学习计划管理
- 工作任务跟踪
- 健康生活规划

## drizzle schema

```ts
// ======================
// 依赖导入
// ======================
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  index,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ======================
// 用户表
// ======================
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

// ======================
// （可选）任务完成记录审计表 —— 用于调试或统计
// ======================
// export const taskCompletions = sqliteTable('task_completions', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   instanceId: integer('instance_id').not null().references(() => taskInstances.id),
//   completedAt: integer('completed_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now') * 1000)`),
//   awardedPoints: integer('awarded_points').notNull(),
// });
```
