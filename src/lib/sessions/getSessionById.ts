import { supabase } from "@/lib/supabase/client";
import { baseSelect, SessionStatus } from "./fetchSessions";
import { SessionWithUsers } from "@/lib/computedtypes";
import { sessionExtendSelects } from "./fetchSessions";
import { logSupabaseError } from "../users/getStudents";

export async function getSessionById({
  id,
  status,
}: {
  id: string;
  status: SessionStatus;
}): Promise<SessionWithUsers> {
  const fullSelect = `${baseSelect}, ${sessionExtendSelects[status]}`;

  const query = supabase
    .from("sessions")
    .select(fullSelect)
    .eq("status", status)
    .eq("id", id)
    .single()
    .overrideTypes<SessionWithUsers>();

  const { data, error } = await query;

  if (error) {
    logSupabaseError(`Error fetching session ${id}:`, error);
    throw error;
  }

  return data;
}
