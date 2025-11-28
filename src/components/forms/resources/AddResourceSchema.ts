import { subjectOptions } from "@/lib/constants/subjects";
import z from "zod";

export const addResourceSchema = z.object({
  subject: z
    .string("Subject cannot be empty.")
    .refine(
      (val) => subjectOptions.some((s) => s.id === val),
      "Please select a valid subject."
    ),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().max(300).optional().or(z.literal("")),
  link: z
    .string()
    .min(1, "Link cannot be empty.")
    .refine(
      (val) => /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/?#].*)?$/i.test(val),
      { message: "Please enter a valid URL." }
    ),
});

export type AddResourceData = z.infer<typeof addResourceSchema>;
