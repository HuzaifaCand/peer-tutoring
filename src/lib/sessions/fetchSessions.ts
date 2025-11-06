import { supabase } from "@/lib/supabase/client";
import { SessionWithUsers } from "@/lib/computedtypes";

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
  subject,
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
    console.error(`Error fetching ${status} sessions:`, error);
    throw error;
  }

  return data ?? [];
}
