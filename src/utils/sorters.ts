import { ComputedTutorRow } from "@/lib/users/getTutors";
import {
  chainSorters,
  sortByRequestStats,
  sortByTimestamp,
  sortByVerification,
} from "./sortUtils";
import { ComputedCompletedSessionRow } from "@/lib/sessions/completed/getCompletedSessions";
import { ComputedCancelledSessionRow } from "@/lib/sessions/cancelled/getCancelledSessions";
import { ComputedActiveSession } from "@/lib/sessions/active/getActiveSessions";
import { ComputedScheduledSessionRow } from "@/lib/sessions/scheduled/getScheduledSessions";
import { ComputedStudentRow } from "@/lib/users/getStudents";
import { UnifiedRequest } from "@/components/users/sessions/requests/getSessionRequests";

export const defaultSorters = {
  student: sortByTimestamp<ComputedStudentRow, "created_at">(
    "created_at",
    "desc"
  ),
  tutor: chainSorters(
    sortByVerification,
    sortByTimestamp<ComputedTutorRow, "created_at">("created_at", "desc")
  ),
  completedSession: chainSorters(
    sortByVerification,
    sortByTimestamp<ComputedCompletedSessionRow, "completed_at">(
      "completed_at",
      "desc"
    )
  ),
  cancelledSession: sortByTimestamp<
    ComputedCancelledSessionRow,
    "cancelled_at"
  >("cancelled_at", "desc"),
  activeSession: sortByTimestamp<ComputedActiveSession, "start_time_iso">(
    "start_time_iso",
    "asc"
  ),
  scheduledSession: sortByTimestamp<
    ComputedScheduledSessionRow,
    "scheduled_for_iso"
  >("scheduled_for_iso", "asc"),

  sessionRequests: chainSorters(
    sortByRequestStats,
    sortByTimestamp<UnifiedRequest, "created_at">("created_at", "desc")
  ),
};
