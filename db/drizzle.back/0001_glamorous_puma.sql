DROP TABLE `subtask_templates`;--> statement-breakpoint
DROP TABLE `task_instance_subtasks`;--> statement-breakpoint
DROP TABLE `user_points`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_product_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`issued_at` integer NOT NULL,
	`expires_at` integer,
	`used_at` integer,
	`metadata` text,
	FOREIGN KEY (`template_id`) REFERENCES `product_templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_product_instances`("id", "template_id", "status", "issued_at", "expires_at", "used_at", "metadata") SELECT "id", "template_id", "status", "issued_at", "expires_at", "used_at", "metadata" FROM `product_instances`;--> statement-breakpoint
DROP TABLE `product_instances`;--> statement-breakpoint
ALTER TABLE `__new_product_instances` RENAME TO `product_instances`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_product_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`points_cost` integer NOT NULL,
	`type` text DEFAULT 'consumable' NOT NULL,
	`valid_duration` integer DEFAULT 0 NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`replenishment_mode` text DEFAULT 'none' NOT NULL,
	`replenishment_interval` integer,
	`replenishment_days_of_week` text,
	`replenishment_days_of_month` text,
	`last_replenished_at` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
INSERT INTO `__new_product_templates`("id", "title", "description", "points_cost", "type", "valid_duration", "enabled", "replenishment_mode", "replenishment_interval", "replenishment_days_of_week", "replenishment_days_of_month", "last_replenished_at", "created_at") SELECT "id", "title", "description", "points_cost", "type", "valid_duration", "enabled", "replenishment_mode", "replenishment_interval", "replenishment_days_of_week", "replenishment_days_of_month", "last_replenished_at", "created_at" FROM `product_templates`;--> statement-breakpoint
DROP TABLE `product_templates`;--> statement-breakpoint
ALTER TABLE `__new_product_templates` RENAME TO `product_templates`;--> statement-breakpoint
CREATE TABLE `__new_task_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`scheduled_date` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`completed_at` integer,
	`awarded_points` integer NOT NULL,
	FOREIGN KEY (`template_id`) REFERENCES `task_templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_task_instances`("id", "template_id", "scheduled_date", "status", "completed_at", "awarded_points") SELECT "id", "template_id", "scheduled_date", "status", "completed_at", "awarded_points" FROM `task_instances`;--> statement-breakpoint
DROP TABLE `task_instances`;--> statement-breakpoint
ALTER TABLE `__new_task_instances` RENAME TO `task_instances`;--> statement-breakpoint
CREATE INDEX `task_instance_template_date_unique` ON `task_instances` (`template_id`,`scheduled_date`);--> statement-breakpoint
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
	`is_random_subtask` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_task_templates`("id", "title", "description", "reward_points", "repeat_mode", "repeat_interval", "repeat_days_of_week", "repeat_days_of_month", "end_condition", "end_value", "enabled", "created_at", "is_random_subtask") SELECT "id", "title", "description", "reward_points", "repeat_mode", "repeat_interval", "repeat_days_of_week", "repeat_days_of_month", "end_condition", "end_value", "enabled", "created_at", "is_random_subtask" FROM `task_templates`;--> statement-breakpoint
DROP TABLE `task_templates`;--> statement-breakpoint
ALTER TABLE `__new_task_templates` RENAME TO `task_templates`;