"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type OnboardUserRPCArgs = {
  _user_id: string; // uuid
  _role: "student" | "tutor";
  _grade: string;
  _about: string | null;
  _subjects: Array<{
    subject: {
      id: string;
      label: string;
      code: string;
      color: string;
    } | null;
    subtitle: string | null;
  }>;
  _slots?: Array<{
    day: string;
    hour: number;
    duration_minutes: number;
  }>;
  _available_online?: boolean;
};

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
  slots?: Array<{
    day: string;
    hour: number;
    duration_minutes: number;
  }>;
  available_online?: boolean;
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

  const rpcArgs: OnboardUserRPCArgs = {
    _user_id: user.id,
    _role: data.role,
    _grade: data.grade,
    _about: data.about ?? null,
    _subjects: data.subjects,
  };

  if (data.role === "tutor") {
    rpcArgs._slots = data.slots ?? [];
    rpcArgs._available_online = data.available_online ?? false;
  }

  // --- RUN RPC ---
  const { data: rpcData, error: rpcError } = await supabase.rpc(
    "onboard_user",
    rpcArgs
  );

  // Postgres or Postgrest error???
  if (rpcError) {
    console.error("RPC execution error:", rpcError);
    return { error: "RPC failed to execute" };
  }

  //  PL/pgSQL exception handler return error
  if (!rpcData?.success) {
    console.error("RPC returned failure:", rpcData);
    return { error: rpcData?.error ?? "Onboarding failed" };
  }

  // --- UPDATE AUTH METADATA ---
  const { error: metaError } = await supabase.auth.updateUser({
    data: { role: data.role },
  });

  if (metaError) {
    console.error("Failed to update user metadata:", metaError);
    return { error: "Failed to update metadata" };
  }

  return { success: true };
}
