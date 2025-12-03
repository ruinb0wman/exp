import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy";
import * as schema from "@/db/schema";
import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";

export type OrmType = SqliteRemoteDatabase<typeof schema>;

const dbInstance: { db: OrmType | null, rawDB: null } = { db: null, rawDB: null }

export function initDB() {
  if (dbInstance.db) return dbInstance;
  dbInstance.db = drizzleProxy(async (...args) => {
    try {
      const result = await window.exp.sql(...args);
      return { rows: result };
    } catch (e: any) {
      console.error('Error from sqlite proxy server: ', e.response?.data || e);
      return { rows: [] };
    }
  }, {
    schema,
  });
  return dbInstance;
}

export function getDB() {
  if (!dbInstance.db) return initDB();
  return dbInstance;
}
