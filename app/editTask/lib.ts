import { taskTemplates } from "@/db";
import { users } from "@/db";

type UserInfo = typeof users.$inferSelect;
type TaskTemplate = typeof taskTemplates.$inferInsert;

export function getEmptyTaskTemplates(userInfo: UserInfo): TaskTemplate {

  return {
    userId: userInfo!.id,
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
