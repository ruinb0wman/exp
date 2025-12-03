import { getDB } from "@/db";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from '@/db/drizzle/migrations';

export function useNativeDB() {
  const { db, rawDB } = getDB();
  useDrizzleStudio(rawDB);
  const result = useMigrations(db, migrations);
  console.log(result);
}
