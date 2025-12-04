// Define TypeScript types based on the schema
export type TaskTemplate = typeof taskTemplates.$inferSelect;
export type TaskInstance = typeof taskInstances.$inferSelect;

export interface TaskTemplateInput {
  id: number;
  title: string;
  description?: string;
  rewardPoints: number;
  repeatMode: 'none' | 'daily' | 'weekly' | 'monthly';
  repeatInterval?: number;
  repeatDaysOfWeek?: number[];
  repeatDaysOfMonth?: number[];
  endCondition: 'times' | 'date' | 'manual';
  endValue?: string;
  enabled: boolean;
  createdAt: Date;
  subtasks?: Array<{ id: string, content: string, completed: boolean }>;
  isRandomSubtask: boolean;
}

export interface TaskInstanceInput {
  templateId: number;
  scheduledDate: Date;
  status: 'pending' | 'completed' | 'skipped';
  awardedPoints: number;
  subtask?: string;
  completedAt?: Date;
}
