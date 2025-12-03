CREATE TABLE `task_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`scheduled_date` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`completed_at` integer,
	`awarded_points` integer NOT NULL,
	`subtask` text,
	FOREIGN KEY (`template_id`) REFERENCES `task_templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `task_instance_template_date_unique` ON `task_instances` (`template_id`,`scheduled_date`);--> statement-breakpoint
CREATE TABLE `task_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`reward_points` integer NOT NULL,
	`repeat_mode` text NOT NULL,
	`repeat_interval` integer,
	`repeat_days_of_week` text DEFAULT '[]',
	`repeat_days_of_month` text,
	`end_condition` text NOT NULL,
	`end_value` text,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	`is_random_subtask` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_instances` (
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
CREATE TABLE `product_templates` (
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
