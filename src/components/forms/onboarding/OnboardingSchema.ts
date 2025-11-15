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

export const getOnboardingSchema = ({ role }: { role: "student" | "tutor" }) =>
  z.object({
    grade: z
      .union([z.literal(""), z.enum(["AS", "A2"])])
      .refine((val) => val !== "", { message: "Please select a grade" }),
    subjects: z
      .array(getAddSubjectSchema(role))
      .min(1, "Please select at least one subject."),
    about: z.string().optional(),
    role: z.literal(role),
  });
