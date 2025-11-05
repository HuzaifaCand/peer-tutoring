import { supabase } from "@/lib/supabase/client";
import { baseSelect, SessionStatus } from "./fetchSessions";
import { SessionWithUsers } from "@/lib/computedtypes";

export async function getSessionTypeById({
  id,
  status,
  extendSelect,
}: {
  id: string;
  status: SessionStatus;
  extendSelect: string;
}) {
  const fullSelect = `${baseSelect}, ${extendSelect}`;

  const query = supabase
    .from("sessions")
    .select(fullSelect)
    .eq("status", status)
    .eq("id", id)
    .single()
    .overrideTypes<SessionWithUsers>();

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching session ${id}:`, error);
    throw error;
  }

  return data;
}
