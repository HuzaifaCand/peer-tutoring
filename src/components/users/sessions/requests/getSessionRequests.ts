import {
  OnlineSessionRequest,
  OnsiteSessionRequest,
  SubjectRow,
} from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";
import { StudentUser, TutorUser } from "@/lib/users/types";

const select =
  "*, subjects(*), student:students(about, grade, users(full_name)), tutor:tutors(about, users(full_name))";

type OnsiteReq = OnsiteSessionRequest & {
  subjects: SubjectRow;
  tutor: TutorUser;
  student: StudentUser;
};

type OnlineReq = OnlineSessionRequest & {
  subjects: SubjectRow;
  tutor: TutorUser;
  student: StudentUser;
};

export type RequestStatus = "pending" | "accepted" | "rejected";

export type UnifiedRequest = {
  id: string;
  type: "online" | "onsite";
  student_id: string;
  tutor_id: string;
  subject_id: string;
  created_at: string;
  status: RequestStatus;
  message?: string | null;

  // onsite
  scheduled_for?: string | null;
  slot_id?: string | null;

  // online
  suggested_date?: string | null;
  suggested_time?: string | null;

  subjects: SubjectRow;
  studentName: string;
  studentGrade: "AS" | "A2";
  studentAbout: string | null;
  tutorName: string;
  tutorAbout: string | null;
};

function baseMapper(req: OnsiteReq | OnlineReq) {
  return {
    id: req.id,
    student_id: req.student_id,
    tutor_id: req.tutor_id,
    subject_id: req.subject_id,
    created_at: req.created_at,
    status: req.status as RequestStatus,
    message: req.message ?? null,
    subjects: req.subjects,
    studentName: req.student.users.full_name,
    studentGrade: req.student.grade as "AS" | "A2",
    studentAbout: req.student.about,
    tutorName: req.tutor.users.full_name,
    tutorAbout: req.tutor.about,
  };
}

export async function getSessionRequests(
  userId: string,
  role: "tutor" | "student"
): Promise<UnifiedRequest[]> {
  const userColumn = role === "tutor" ? "tutor_id" : "student_id";

  const { data: onsite } = await supabase
    .from("onsite_session_requests")
    .select(select)
    .eq(userColumn, userId)
    .overrideTypes<OnsiteReq[]>();

  const formattedOnsite =
    onsite?.map((req) => ({
      type: "onsite" as const,
      ...baseMapper(req),
      scheduled_for: req.scheduled_for,
      slot_id: req.slot_id,
    })) ?? [];

  const { data: online } = await supabase
    .from("online_session_requests")
    .select(select)
    .eq(userColumn, userId)
    .overrideTypes<OnlineReq[]>();

  const formattedOnline =
    online?.map((req) => ({
      type: "online" as const,
      ...baseMapper(req),
      suggested_date: req.suggested_date,
      suggested_time: req.suggested_time,
    })) ?? [];

  return [...formattedOnsite, ...formattedOnline];
}
