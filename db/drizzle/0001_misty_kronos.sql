PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_task_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`reward_points` integer NOT NULL,
	`repeat_mode` text NOT NULL,
	`repeat_interval` integer,
	`repeat_days_of_week` text,
	`repeat_days_of_month` text,
	`end_condition` text NOT NULL,
	`end_value` text,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	`subtasks` text DEFAULT '[]',
	`is_random_subtask` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_task_templates`("id", "title", "description", "reward_points", "repeat_mode", "repeat_interval", "repeat_days_of_week", "repeat_days_of_month", "end_condition", "end_value", "enabled", "created_at", "subtasks", "is_random_subtask") SELECT "id", "title", "description", "reward_points", "repeat_mode", "repeat_interval", "repeat_days_of_week", "repeat_days_of_month", "end_condition", "end_value", "enabled", "created_at", "subtasks", "is_random_subtask" FROM `task_templates`;--> statement-breakpoint
DROP TABLE `task_templates`;--> statement-breakpoint
ALTER TABLE `__new_task_templates` RENAME TO `task_templates`;--> statement-breakpoint
PRAGMA foreign_keys=ON;