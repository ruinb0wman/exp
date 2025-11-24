import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
export * from './schema';

// 创建原始数据库连接（单例）
export const rawDB = SQLite.openDatabaseSync('db.db');

// 创建 drizzle 实例（单例）
export const db = drizzle(rawDB);
