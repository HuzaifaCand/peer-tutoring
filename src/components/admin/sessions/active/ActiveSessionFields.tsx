import { CardField } from "@/components/card/types";
import { ComputedActiveSessionRow } from "./getActiveSessions";

export const activeSessionFields: CardField<ComputedActiveSessionRow>[] = [
  { key: "tutor_name", label: "Tutor", section: "header" },
  { key: "student_name", label: "Student", section: "header" },
  { key: "subject", label: "Subject", section: "body" },
  { key: "start_time", label: "Started", section: "footer" },
  { key: "duration_minutes", label: "Remaining", section: "footer" },
];
