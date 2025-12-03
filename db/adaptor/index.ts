import { Platform } from "react-native";
import * as native from "./native";
import * as web from "./web";

export function getDB() {
  if (Platform.OS === "web") return web.getDB();
  return native.getDB();
}

export function initDB() {
  if (Platform.OS === "web") return web.initDB();
  return web.initDB();
}

export function withDB<T>(fn: (db: ReturnType<typeof getDB>["db"]) => T): T | undefined {
  const { db } = getDB();
  if (!db) {
    // 你可以选择 throw new Error("Database not initialized") 或返回 undefined
    console.warn("Database is not available");
    return undefined;
  }
  return fn(db);
}
