import type { TaskInstanceInput, TaskTemplateInput } from "./type.d"
import { hasEndConditionBeenReached, matchesRepeatCriteria } from "./tools";

/**
 * Generates a task instance from a task template based on the given date
 * @param date The date to check against the template's repeat criteria
 * @param taskTemplate The template to use for creating the instance
 * @returns Task instance object if the date matches the template's repeat criteria, null otherwise
 */
export function generateTaskInstance(date: Date, taskTemplate: TaskTemplateInput): TaskInstanceInput | null {
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
  let selectedSubtask: string | undefined;
  if (taskTemplate.isRandomSubtask && taskTemplate.subtasks && taskTemplate.subtasks.length > 0) {
    const incompleteSubtasks = taskTemplate.subtasks.filter(subtask => !subtask.completed);
    if (incompleteSubtasks.length > 0) {
      const randomSubtask = incompleteSubtasks[Math.floor(Math.random() * incompleteSubtasks.length)];
      selectedSubtask = randomSubtask.content;
    }
  }

  // Create and return the task instance object
  return {
    templateId: taskTemplate.id,
    scheduledDate: date,
    status: 'pending',
    awardedPoints: taskTemplate.rewardPoints,
    subtask: selectedSubtask,
  };
}

/**
 * Generates multiple task instances from an array of task templates based on the given date
 * @param date The date to check against each template's repeat criteria
 * @param taskTemplates An array of templates to use for creating instances
 * @returns Array of task instance objects that match the templates' repeat criteria
 */
export function generateTaskInstances(date: Date, taskTemplates: TaskTemplateInput[]): TaskInstanceInput[] {
  const taskInstances: TaskInstanceInput[] = [];

  for (const taskTemplate of taskTemplates) {
    const taskInstance = generateTaskInstance(date, taskTemplate);
    if (taskInstance !== null) {
      taskInstances.push(taskInstance);
    }
  }

  return taskInstances;
}
