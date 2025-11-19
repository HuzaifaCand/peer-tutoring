"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getOnboardingSchema } from "./OnboardingSchema";
import { z } from "zod";

export type OnboardingSchema = z.infer<ReturnType<typeof getOnboardingSchema>>;

export function useOnboardingForm(role: "student" | "tutor") {
  const schema = getOnboardingSchema(role);

  const methods = useForm<OnboardingSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      grade: "",
      subjects: [],
      about: "",
      role,
    },
  });

  return methods;
}

export { FormProvider };
