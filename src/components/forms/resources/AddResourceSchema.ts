import { subjectOptions } from "@/lib/constants/subjects";
import z from "zod";

export const addResourceSchema = z.object({
  subject: z
    .string()
    .refine(
      (val) => subjectOptions.some((s) => s.id === val),
      "Please select a valid subject."
    ),
  title: z.string().min(3),
  description: z.string().max(300).optional().or(z.literal("")),
  link: z
    .string()
    .min(1)
    .refine(
      (val) => /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/?#].*)?$/i.test(val),
      { message: "Please enter a valid URL." }
    ),
});

export type AddResourceData = z.infer<typeof addResourceSchema>;
