"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  studentOnboardingSchema,
  tutorOnboardingSchema,
} from "./OnboardingSchema";

export function useOnboardingForm(role: "student" | "tutor") {
  const schema =
    role === "tutor" ? tutorOnboardingSchema : studentOnboardingSchema;

  type FormType = z.infer<typeof schema>;

  return useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: (role === "tutor"
      ? {
          grade: "",
          subjects: [],
          about: "",
          slots: [],
          available_online: true,
          role,
        }
      : {
          grade: "",
          subjects: [],
          about: "",
          role,
        }) as FormType,
  });
}
