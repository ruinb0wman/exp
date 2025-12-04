import { taskTemplates, taskInstances } from "@/db";
// Define TypeScript types based on the schema
export type TaskTemplate = typeof taskTemplates.$inferSelect;
export type TaskInstance = typeof taskInstances.$inferInsert;
export type DateInput = Date | { startDate: Date; endDate: Date };

/**
 * Checks if the end condition has been reached for a task template
 */
export function hasEndConditionBeenReached(date: Date, taskTemplate: TaskTemplate): boolean {
  if (taskTemplate.endCondition === 'manual') {
    return false;
  }

  if (taskTemplate.endCondition === 'date' && taskTemplate.endValue) {
    const endDate = new Date(taskTemplate.endValue);
    return date > endDate;
  }

  // For 'times' end condition we would need to track completed instances
  // This would require database lookup which is beyond this utility function
  // So we'll return false here, assuming that check is done elsewhere
  return false;
}

/**
 * Checks if the given date matches the template's repeat criteria
 */
export function matchesRepeatCriteria(date: Date, taskTemplate: TaskTemplate): boolean {
  const dateToCheck = new Date(date);
  dateToCheck.setHours(0, 0, 0, 0); // Normalize to start of day

  switch (taskTemplate.repeatMode) {
    case 'none':
      // For 'none' repeat mode, only match if this is the first time (like a one-time task)
      // This logic would need to be handled with state tracking outside this function
      return true;

    case 'daily':
      if (taskTemplate.repeatInterval) {
        // If repeatInterval is set, check if the number of days since creation is divisible by the interval
        const creationDate = taskTemplate.createdAt;
        const timeDiff = dateToCheck.getTime() - creationDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        return daysDiff % taskTemplate.repeatInterval === 0;
      }
      return true; // Otherwise, repeat daily

    case 'weekly':
      if (taskTemplate.repeatDaysOfWeek && taskTemplate.repeatDaysOfWeek.length > 0) {
        // Check if the current day of the week is in the allowed days
        const dayOfWeek = dateToCheck.getDay(); // 0 (Sunday) to 6 (Saturday)
        return taskTemplate.repeatDaysOfWeek.includes(dayOfWeek);
      } else if (taskTemplate.repeatInterval) {
        // If repeatInterval is set in weeks, check week intervals
        const creationDate = new Date(taskTemplate.createdAt);
        const timeDiff = dateToCheck.getTime() - creationDate.getTime();
        const weeksDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 7));
        return weeksDiff % taskTemplate.repeatInterval === 0;
      }
      // Default to every week
      return true;

    case 'monthly':
      if (taskTemplate.repeatDaysOfMonth && taskTemplate.repeatDaysOfMonth.length > 0) {
        // Check if the current day of the month is in the allowed days
        const dayOfMonth = dateToCheck.getDate(); // 1 to 31
        return taskTemplate.repeatDaysOfMonth.includes(dayOfMonth);
      } else if (taskTemplate.repeatInterval) {
        // If repeatInterval is set in months, check month intervals
        const creationDate = new Date(taskTemplate.createdAt);
        const monthDiff = (dateToCheck.getFullYear() - creationDate.getFullYear()) * 12
          + (dateToCheck.getMonth() - creationDate.getMonth());
        return monthDiff % taskTemplate.repeatInterval === 0;
      }
      // Default to every month on the same day
      return dateToCheck.getDate() === new Date(taskTemplate.createdAt).getDate();

    default:
      return false;
  }
}
