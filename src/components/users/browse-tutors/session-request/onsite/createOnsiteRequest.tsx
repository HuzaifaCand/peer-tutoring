import { supabase } from "@/lib/supabase/client";

export async function createOnsiteRequest(payload: {
  student_id: string;
  tutor_id: string;
  slot_id: string;
  scheduled_for: string;
  subject_id: string;
  message: string | null;
}) {
  const { error } = await supabase
    .from("onsite_session_requests")
    .insert(payload);

  if (error?.code === "23505") {
    return { success: false, duplicate: true };
  }

  if (error) {
    return { success: false, error: true };
  }

  return { success: true };
}
