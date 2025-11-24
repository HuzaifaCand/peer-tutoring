import { supabase } from "@/lib/supabase/client";

export async function createOnlineRequest(payload: {
  student_id: string;
  tutor_id: string;
  subject_id: string;
  suggested_date: string;
  suggested_time: string | null;
  message: string | null;
}) {
  const { error } = await supabase
    .from("online_session_requests")
    .insert(payload);

  if (error) {
    return { success: false, error: true };
  }

  return { success: true };
}
