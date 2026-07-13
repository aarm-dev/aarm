CREATE TABLE "paper_review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"paper_id" uuid NOT NULL,
	"evaluator_id" text NOT NULL,
	"score_core" integer,
	"score_takeaways" integer,
	"score_relevance" integer,
	"comment_core" text,
	"comment_takeaways" text,
	"comment_relevance" text,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "paper_review_unique" UNIQUE("paper_id","evaluator_id")
);
--> statement-breakpoint
CREATE TABLE "paper" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" serial NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"core_topics" text,
	"key_takeaways" text,
	"relevance" text,
	"file_url" text,
	"file_name" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "speaker_profile" (
	"user_id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"bio" text,
	"title" text,
	"company_website" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_chair" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_evaluator" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "paper_review" ADD CONSTRAINT "paper_review_paper_id_paper_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."paper"("id") ON DELETE cascade ON UPDATE no action;