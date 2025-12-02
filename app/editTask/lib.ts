import { taskTemplates } from "@/db";

export function getEmptyTaskTemplates(): typeof taskTemplates.$inferInsert {
  return {
    title: '',
    rewardPoints: 10,
    repeatMode: 'none',
    endCondition: 'manual',
    description: null,
    repeatInterval: null,
    repeatDaysOfWeek: null,
    repeatDaysOfMonth: null,
    endValue: null,
    enabled: true,
    subtasks: [],
    isRandomSubtask: false,
  };
}
