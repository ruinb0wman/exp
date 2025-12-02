import { productTemplates } from "@/db"

export function getEmptyProduct(): typeof productTemplates.$inferInsert {
  return {
    title: '',
    description: '',
    pointsCost: 0,
    type: 'consumable', // 默认值来自 schema
    validDuration: 0, // 0 表示永久有效
    enabled: true,
    replenishmentMode: 'none',
    replenishmentInterval: null, // 仅在 daily 模式下使用
    replenishmentDaysOfWeek: null, // JSON 字符串，如 "[1,3]"
    replenishmentDaysOfMonth: null, // JSON 字符串，如 "[1,15]"
    createdAt: undefined, // 通常由数据库自动生成
  };
}

