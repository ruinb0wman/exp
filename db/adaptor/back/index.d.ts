import type { OrmType as NativeORM, SqliteType as NativeSqlite } from "./init.native"
import type { OrmType as WebORM } from "./init.web"

// 统一接口
export type DB = { db?: NativeORM & WebORM; rawDB?: NativeSqlite }

// 声明函数签名（不实现）
// export declare function initDB(): InitResult;
export declare function getDB(): DB;
