import { hasEndConditionBeenReached, matchesRepeatCriteria } from "./tools";
import { taskTemplates, taskInstances } from "@/db";
// Define TypeScript types based on the schema
export type TaskTemplate = typeof taskTemplates.$inferSelect;
export type TaskInstance = typeof taskInstances.$inferInsert;
export type DateInput = Date | { startDate: Date; endDate: Date };


/**
 * Generates a task instance from a task template based on the given date
 * @param date The date to check against the template's repeat criteria
 * @param taskTemplate The template to use for creating the instance
 * @returns Task instance object if the date matches the template's repeat criteria, null otherwise
 */
export function generateTaskInstance(userId: number, date: Date, taskTemplate: TaskTemplate): TaskInstance | null {
  // Check if the template is enabled
  if (!taskTemplate.enabled) {
    return null;
  }

  // Check if the end condition has been reached
  if (hasEndConditionBeenReached(date, taskTemplate)) {
    return null;
  }

  // Check if the date matches the template's repeat criteria
  if (!matchesRepeatCriteria(date, taskTemplate)) {
    return null;
  }

  // Select a subtask if random subtasks are enabled and there are subtasks available
  let selectedSubtask = null;
  if (taskTemplate.isRandomSubtask && taskTemplate.subtasks && taskTemplate.subtasks.length > 0) {
    selectedSubtask = taskTemplate.subtasks[Math.floor(Math.random() * taskTemplate.subtasks.length)] || null;
  }

  // Create and return the task instance object
  return {
    templateId: taskTemplate.id,
    userId,
    scheduledDate: date,
    status: 'pending',
    awardedPoints: taskTemplate.rewardPoints,
    subtask: selectedSubtask,
  };
}

/**
 * Generates multiple task instances from an array of task templates based on the given date or date range
 * @param dateInput The date or date range to check against each template's repeat criteria
 * @param taskTemplates An array of templates to use for creating instances
 * @returns Array of task instance objects that match the templates' repeat criteria
 */
export function generateTaskInstances(userId: number, dateInput: DateInput, taskTemplates: TaskTemplate[]): TaskInstance[] {
  const taskInstances: TaskInstance[] = [];

  // Handle single date case
  if (dateInput instanceof Date) {
    for (const taskTemplate of taskTemplates) {
      const taskInstance = generateTaskInstance(userId, dateInput, taskTemplate);
      if (taskInstance !== null) {
        taskInstances.push(taskInstance);
      }
    }
  }
  // Handle date range case
  else {
    const { startDate, endDate } = dateInput;
    const currentDate = new Date(startDate);

    // Iterate through each day in the date range
    while (currentDate <= endDate) {
      // Create a copy of the current date to avoid reference issues
      const dateToCheck = new Date(currentDate);

      for (const taskTemplate of taskTemplates) {
        const taskInstance = generateTaskInstance(userId, dateToCheck, taskTemplate);
        if (taskInstance !== null) {
          taskInstances.push(taskInstance);
        }
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return taskInstances;
}

/**
 * Merges two arrays of task instances and removes duplicates based on templateId and scheduledDate
 * @param generatedInstances Array of newly generated task instances
 * @param savedInstances Array of task instances from the database (will take priority in case of duplicates)
 * @returns Merged array with unique task instances, with saved instances taking priority over generated ones in case of duplicates
 */
export function deduplicateTaskInstances(
  generatedInstances: TaskInstance[],
  savedInstances: TaskInstance[]
): TaskInstance[] {
  const uniqueInstances = new Map<string, TaskInstance>();

  // Add generated instances first
  for (const instance of generatedInstances) {
    const key = `${instance.templateId}-${instance.scheduledDate.toISOString()}`;
    uniqueInstances.set(key, instance);
  }

  // Add saved instances, which will overwrite any duplicates from generated instances
  // This ensures saved instances (from database) take priority over newly generated ones
  for (const instance of savedInstances) {
    const key = `${instance.templateId}-${instance.scheduledDate.toISOString()}`;
    uniqueInstances.set(key, instance);
  }

  return Array.from(uniqueInstances.values());
}

/**
 * Finds task instances that exist in the generated array but not in the database array
 * @param generatedInstances Array of newly generated task instances
 * @param savedInstances Array of task instances from the database
 * @returns Array of task instances that are in generated array but not in database array
 */
export function findNewTaskInstances(
  generatedInstances: TaskInstance[],
  savedInstances: TaskInstance[]
): TaskInstance[] {
  // Create a set of keys for instances in the database array for fast lookup
  const savedInstanceKeys = new Set<string>();
  for (const instance of savedInstances) {
    const key = `${instance.templateId}-${instance.scheduledDate.toISOString()}`;
    savedInstanceKeys.add(key);
  }

  // Filter generated instances to only include those not present in the database
  return generatedInstances.filter(instance => {
    const key = `${instance.templateId}-${instance.scheduledDate.toISOString()}`;
    return !savedInstanceKeys.has(key);
  });
}
