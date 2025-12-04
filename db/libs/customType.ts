import { customType } from "drizzle-orm/sqlite-core";

export const jsonArray = customType<{
  data: string[];       // TS 中的类型
  driverData: string;   // 存到 SQLite 中的类型（TEXT）
}>({
  dataType() {
    return "text";
  },
  fromDriver(value) {
    return JSON.parse(value);
  },
  toDriver(value) {
    return JSON.stringify(value);
  },
});

export const numberArray = customType<{
  data: number[];       // TS 中的类型
  driverData: string;   // 存到 SQLite 中的类型（TEXT）
}>({
  dataType() {
    return "text";
  },
  fromDriver(value) {
    return JSON.parse(value);
  },
  toDriver(value) {
    return JSON.stringify(value);
  },
});
