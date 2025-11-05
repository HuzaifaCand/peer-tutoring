import { ComputedTutorRow } from "@/components/admin/tutors/getTutors";
import {
  chainSorters,
  sortByAdminSeen,
  sortByTimestamp,
  sortByVerification,
} from "./sortUtils";
import { ComputedCompletedSessionRow } from "@/components/admin/sessions/completed/getCompletedSessions";
import { ComputedCancelledSessionRow } from "@/components/admin/sessions/cancelled/getCancelledSessions";
import { ComputedActiveSession } from "@/components/admin/sessions/active/getActiveSessions";
import { ComputedScheduledSessionRow } from "@/components/admin/sessions/scheduled/getScheduledSessions";
import { ComputedStudentRow } from "@/components/admin/students/getStudents";

export const defaultSorters = {
  student: chainSorters(
    sortByAdminSeen,
    sortByTimestamp<ComputedStudentRow>("created_at", "desc")
  ),
  tutor: chainSorters(
    sortByVerification,
    sortByAdminSeen,
    sortByTimestamp<ComputedTutorRow>("created_at", "desc")
  ),
  completedSession: chainSorters(
    sortByVerification,
    sortByTimestamp<ComputedCompletedSessionRow>("completed_at", "desc")
  ),
  cancelledSession: sortByTimestamp<ComputedCancelledSessionRow>(
    "cancelled_at",
    "desc"
  ),
  activeSession: sortByTimestamp<ComputedActiveSession>(
    "start_time_iso",
    "asc"
  ),
  scheduledSession: sortByTimestamp<ComputedScheduledSessionRow>(
    "pure_scheduled_for",
    "asc"
  ),
};
