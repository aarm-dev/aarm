ALTER TABLE "builders" ADD COLUMN "conformance_request_status" text DEFAULT 'not_started';--> statement-breakpoint
ALTER TABLE "builders" ADD COLUMN "conformance_target_level" text;--> statement-breakpoint
ALTER TABLE "builders" ADD COLUMN "conformance_assessment_id" text;