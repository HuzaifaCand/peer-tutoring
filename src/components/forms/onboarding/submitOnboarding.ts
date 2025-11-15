"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function submitOnboarding(data: {
  role: "student" | "tutor";
  grade: string;
  about?: string;
  subjects: Array<{
    subject: {
      id: string;
      label: string;
      code: string;
      color: string;
    } | null;
    subtitle: string | null;
  }>;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.rpc("onboard_user", {
    _user_id: user.id,
    _role: data.role,
    _grade: data.grade,
    _about: data.about ?? null,
    _subjects: data.subjects,
  });

  if (error) {
    console.error("Onboarding transaction error:", error);
    console.log("Onboarding transaction error:", error);

    return { error: "Failed to complete onboarding" };
  }

  const { error: metaError } = await supabase.auth.updateUser({
    data: { role: data.role },
  });

  if (metaError) {
    console.error("Failed to update user metadata:", metaError);
    return { error: "Failed to update metadata" };
  }

  return { success: true };
}
