import { supabase } from "@/lib/supabase/client";
import { TutorUser } from "@/lib/types/views";

export async function getTutors() {
  const { data: tutors, error } = await supabase
    .from("tutors")
    .select(
      `
      grade,
      subjects,
      approved,
      admin_seen,
      users(full_name, email),
      available_slots(id, available)
    `
    )
    .overrideTypes<TutorUser[]>();

  if (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }

  const formatted = (tutors || []).map((t) => ({
    id: t.users.email.split("@")[0],
    full_name: t.users.full_name.split(" ").slice(0, -1).join(" "),
    email: t.users.email,
    grade: t.grade,
    subjects: t.subjects.join(" | "),
    verified:
      t.approved === false
        ? "Rejected"
        : t.approved === true
        ? "Verified"
        : "Unverified",
    available_slots: t.available_slots
      ? t.available_slots.filter((s) => s.available).length
      : 0, // count only available ones
    unavailable_slots: t.available_slots
      ? t.available_slots.filter((s) => s.available === false).length
      : 0, // count only unavailable ones to compute activity -- slot is unavailable if session is "scheduled" or "in_progress" at that slot time
    admin_seen: t.admin_seen,
  }));

  return formatted;
}

export type ComputedTutorRow = Awaited<ReturnType<typeof getTutors>>[number];
