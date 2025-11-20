import { z } from "zod";
import { SUBJECTS } from "@/lib/constants/subjects";

export const getAddSubjectSchema = (role: "student" | "tutor") =>
  z.object({
    subject: z
      .object({
        id: z.string(),
        label: z.string(),
        color: z.string(),
        code: z.string(),
      })
      .nullable()
      .refine((val) => !!val, {
        message: "Please select a subject before adding.",
      })
      .refine((val) => !val || !!SUBJECTS.find((s) => s.id === val.id), {
        message: "Please select a valid subject from the list.",
      }),

    subtitle: z
      .string()
      .nullable()
      .refine((val) => !val || val.trim().length > 0, {
        message:
          role === "tutor"
            ? "Credential cannot be just spaces."
            : "Note cannot be just spaces.",
      }),
  });

// Monday - Thursday [08:00 ---- 04:00] // either i do the range which is one hour or mention the range once (1 hour slots)

const VALID_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday"] as const;

export const getSlotSchema = () =>
  z.object({
    day: z.enum(VALID_DAYS),
    hour: z
      .number()
      .int()
      .min(8, "Onsite slots must start at or after 8 AM")
      .max(16, "Last slot must start before 5 PM"),
    duration_minutes: z.number(),
  });

export const studentOnboardingSchema = z.object({
  grade: z
    .union([z.literal(""), z.enum(["AS", "A2"])])
    .refine((val) => val !== "", { message: "Please select a grade" }),
  subjects: z
    .array(getAddSubjectSchema("student"))
    .min(1, "Please select at least one subject."),
  about: z.string().optional(),
  role: z.literal("student"),
});

export const tutorOnboardingSchema = z.object({
  grade: z
    .union([z.literal(""), z.enum(["AS", "A2"])])
    .refine((val) => val !== "", { message: "Please select a grade" }),
  subjects: z
    .array(getAddSubjectSchema("tutor"))
    .min(1, "Please add at least one subject."),
  about: z.string().optional(),
  slots: z.array(getSlotSchema()).min(1, "Please select at least one slot."),
  available_online: z.boolean(),
  role: z.literal("tutor"),
});
