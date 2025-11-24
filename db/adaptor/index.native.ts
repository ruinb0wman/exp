import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";

import type { SQLiteDatabase } from "expo-sqlite";
import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

export type OrmType = ExpoSQLiteDatabase<typeof schema> & { $client: SQLiteDatabase };
export type SqliteType = SQLiteDatabase;

const dbInstance: { db?: OrmType, rawDB?: SqliteType } = {}

export function initDB() {
  if (dbInstance.db && dbInstance.rawDB) return dbInstance;
  dbInstance.rawDB = openDatabaseSync('db.db');
  dbInstance.db = drizzle(dbInstance.rawDB);
  return dbInstance;
}

export function getDB() {
  return dbInstance;
}
