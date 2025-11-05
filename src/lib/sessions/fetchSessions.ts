import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";

export type SessionStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "in_progress";

interface BaseSessionQueryOptions {
  status: SessionStatus;
  extendSelect: string;
}

export const baseSelect = `
  id,
  subject,
  is_online,
  tutors(grade, users(full_name, email)),
  students(grade, users(full_name, email))
`;

export async function fetchSessions({
  status,
  extendSelect,
}: BaseSessionQueryOptions): Promise<SessionWithUsers[]> {
  const fullSelect = extendSelect
    ? `${baseSelect}, ${extendSelect}`
    : baseSelect;

  const { data, error } = await supabase
    .from("sessions")
    .select(fullSelect)
    .eq("status", status)
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error(`Error fetching ${status} sessions:`, error);
    throw error;
  }

  return data ?? [];
}
