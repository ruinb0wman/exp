import { TaskInstance } from "@/libs/task";
import { getDB } from "../adaptor";
import { taskTemplates, taskInstances } from "../schema"
import { eq, and, gte, lt } from "drizzle-orm";
import { getTodayDateString, getTodayTimestamp } from "@/libs/date";

type Template = typeof taskTemplates.$inferInsert

//
// taskTemplates section
//
export function getAllTaskTemplates() {
  const { db } = getDB();
  if (!db) return;
  return db.select().from(taskTemplates);
}

export function createTaskTemplate(task: typeof taskTemplates.$inferInsert) {
  const { db } = getDB();
  if (!db) return;

  return db.insert(taskTemplates).values(task);
}

export function getTaskTemplate(id: number) {
  const { db } = getDB();
  if (!db) return;

  return db.select().from(taskTemplates).where(eq(taskTemplates.id, id))
}

export function updateTaskTemplate(id: number, task: Partial<Template>) {
  const { db } = getDB();
  if (!db) return;

  return db
    .update(taskTemplates)
    .set(task)
    .where(eq(taskTemplates.id, id));
}

export function deleteTaskTemplate(id: number) {
  const { db } = getDB();
  if (!db) return;

  return db.delete(taskTemplates).where(eq(taskTemplates.id, id));
}

//
// taskInstances section
//

export function getAllTaskInstance() {
  const { db } = getDB();
  if (!db) return;

  return db.select().from(taskInstances);
}

export function getTodaysTaskInstance() {
  const { db } = getDB();
  if (!db) return;

  const today = getTodayDateString();
  console.log('todayStartTimestamp', today, getTodayTimestamp())

  return db
    .select()
    .from(taskInstances)
    .where(
      eq(taskInstances.scheduledDate, new Date(today))
    ).leftJoin(taskTemplates, eq(taskInstances.templateId, taskTemplates.id));
}

export function createTaskInstance(values: TaskInstance | TaskInstance[]) {
  const { db } = getDB();
  if (!db) return;

  const insertStatement = db.insert(taskInstances);
  // 处理drizzle values方法重载
  if (Array.isArray(values)) {
    return insertStatement.values(values).onConflictDoNothing();
  } else {
    return insertStatement.values(values).onConflictDoNothing();
  }
}

export function updateTaskInstance(id: number, task: Partial<TaskInstance>) {
  const { db } = getDB();
  if (!db) return;

  return db.update(taskInstances).set(task).where(eq(taskInstances.id, id))
}
