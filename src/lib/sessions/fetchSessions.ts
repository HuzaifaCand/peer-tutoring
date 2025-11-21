import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "./types";

export type SessionStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "in_progress";

export const sessionExtendSelects: Record<SessionStatus, string> = {
  scheduled: `
      duration_minutes,
      scheduled_for,
      booked_at
    `,
  cancelled: `
      cancel_reason,
      cancelled_at,
      cancellation_source,
      cancelled_by,
      scheduled_for
    `,
  in_progress: `
      start_time,
      duration_minutes
    `,
  completed: `
      scheduled_for,
      verified,
      rejection_reason,
      start_time,
      completed_at,
      duration_minutes
    `,
};

export const baseSelect = `
  id,
  subjects(id, label, code),
  is_online,
  tutors(grade, users(full_name, email)),
  students(grade, users(full_name, email))
`;

export async function fetchSessions(
  status: SessionStatus
): Promise<SessionWithUsers[]> {
  const fullSelect = `${baseSelect}, ${sessionExtendSelects[status]}`;

  const { data, error } = await supabase
    .from("sessions")
    .select(fullSelect)
    .eq("status", status)
    .overrideTypes<SessionWithUsers[]>();

  if (error) {
    console.error(`${status} error with fetchSessions`, error);
    throw error;
  }

  return data ?? [];
}
