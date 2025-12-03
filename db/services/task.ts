import { getDB } from "../adaptor";
import { taskTemplates } from "../schema"

export async function getAllTask() {
  const { db } = getDB();
  if (!db) return;
  return db.select().from(taskTemplates);
}
