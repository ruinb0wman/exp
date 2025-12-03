import { getDB } from "@/db";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from '@/db/drizzle/migrations';

export function initDB() {
  const { db, rawDB } = getDB();
  useDrizzleStudio(rawDB);
  const { success, error } = useMigrations(db, migrations);
}
