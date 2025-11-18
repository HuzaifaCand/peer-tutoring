"use client";

import Loading from "@/components/Loading";
import { bg } from "../../LoginComponent";
import { AvailableSlots } from "./AvailableSlots";
import { SubjectsSelection } from "./SubjectsSelection";
import { AboutInput } from "./AboutInput";
import { FormShell } from "./FormShell";
import { FormHeader } from "./Header";
import {
  FormProvider,
  useOnboardingForm,
} from "@/components/forms/onboarding/useOnboardingForm";
import { getOnboardingSchema } from "@/components/forms/onboarding/OnboardingSchema";
import { z } from "zod";
import { toast } from "sonner";
import { submitOnboarding } from "@/components/forms/onboarding/submitOnboarding";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { SubmitButton } from "./SubmitButton";
import { getUserMetadata } from "../getUserMetadata";
import { UserInfoSection } from "../UserInfoSection";

export type SubjectSelect = {
  subject: {
    id: string;
    label: string;
    color: string;
    code: string;
  } | null;
  subtitle: string | null;
};

export default function OnboardingComponent({
  role,
}: {
  role: "tutor" | "student";
}) {
  const router = useRouter();
  const methods = useOnboardingForm(role);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { userLoading, user, userError } = useAuthUser();

  if (userError) console.error("user loading error:", userError);
  if (userLoading) return <Loading bg={bg} />;
  if (!user) return null;

  async function onSubmit(
    data: z.infer<ReturnType<typeof getOnboardingSchema>>
  ) {
    const cleaned = {
      ...data,
      about: data.about?.trim() || undefined,
    };
    const res = await submitOnboarding(cleaned);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Onboarding completed!");
    router.replace(`/${role}`);
  }

  const { displayName, email, studentId } = getUserMetadata(user);

  return (
    <FormProvider {...methods}>
      <FormShell>
        <FormHeader role={role} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserInfoSection
            name={displayName}
            email={email}
            studentId={studentId}
            role={role}
            isOnboarding={true}
          />
          <SubjectsSelection role={role} />
          {role === "tutor" && <AvailableSlots />}
          <AboutInput role={role} />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </FormShell>
    </FormProvider>
  );
}
