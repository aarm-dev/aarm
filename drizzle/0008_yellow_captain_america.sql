CREATE TABLE "paper_assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"paper_id" uuid NOT NULL,
	"evaluator_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "paper_assignment_unique" UNIQUE("paper_id","evaluator_id")
);
--> statement-breakpoint
ALTER TABLE "paper_assignment" ADD CONSTRAINT "paper_assignment_paper_id_paper_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."paper"("id") ON DELETE cascade ON UPDATE no action;