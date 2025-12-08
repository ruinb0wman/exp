import { getTodayDateString } from '@/libs/date';

export function getNewUser() {
  return {
    id: 1,
    currentPoints: 0,
    createdAt: new Date(getTodayDateString()),
    lastGenerateTasks: null,
    lastGenerateRewards: null,
  }
}
