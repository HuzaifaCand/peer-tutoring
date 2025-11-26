"use client";

import { CardShell } from "@/components/card/CardShell";
import { CompletedSessionsType } from "./getCompletedSessions";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import { StudentFeedbackModal } from "./StudentFeedbackModal";
import { useEffect, useState } from "react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabase/client";

export function CompletedSessionCard({
  cs,
  role,
}: {
  cs: CompletedSessionsType;
  role: "tutor" | "student";
}) {
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackExists, setFeedbackExists] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { user } = useAuthUser();
  const studentId = user?.id; // obv just user id but naming it for clarity

  useEffect(() => {
    let mounted = true;

    async function fetchFeedback() {
      setFetching(true);

      const { data, error } = await supabase
        .from("student_session_feedback")
        .select("*")
        .eq("session_id", cs.id)
        .maybeSingle();

      if (!mounted) return; // prevent state updates after unmount

      if (error) {
        console.error("failed to fetch feedback status", error);
        setFetching(false);
        return;
      }

      setFeedbackExists(!!data);
      setFetching(false);
    }

    fetchFeedback();

    return () => {
      mounted = false;
    };
  }, [cs.id, refetch]);

  const name = role === "tutor" ? cs.sName : cs.tName;

  const formatted = (ts: string | null) =>
    ts &&
    new Date(ts).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const durationText = cs.actualDuration
    ? `${cs.actualDuration} mins`
    : `${cs.expectedDuration} mins`;

  const verificationColor =
    cs.verificationStatus === "verified"
      ? "green"
      : cs.verificationStatus === "rejected"
      ? "red"
      : "gray";

  return (
    <>
      {role === "student" && (
        <StudentFeedbackModal
          sessionId={cs.id}
          studentId={studentId}
          isOpen={feedbackModal}
          onClose={() => setFeedbackModal(false)}
          refetch={() => setRefetch((prev) => !prev)}
        />
      )}
      <CardShell>
        <div className="space-y-5">
          {/* Tags */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Tag
                textSize="text-[10px] sm:text-[11px]"
                value={cs.subjectLabel}
                color="gray"
              />
              <Tag
                textSize="text-[10px] sm:text-[11px]"
                value={cs.isOnline ? "online" : "onsite"}
                color={cs.isOnline ? "blue" : "yellow"}
              />
            </div>

            {role === "tutor" && (
              <Tag
                value={cs.verificationStatus}
                color={verificationColor}
                textSize="text-[10px] sm:text-[11px]"
              />
            )}
            {role === "student" &&
              !fetching &&
              (!feedbackExists ? (
                <div onClick={() => setFeedbackModal(true)}>
                  <CardCTA
                    padding="px-2 sm:px-3 py-0.5 sm:py-1"
                    textSize="text-[10px] sm:text-[11px]"
                    cta="Leave Feedback"
                  />
                </div>
              ) : (
                <Tag
                  value="Feedback Submitted"
                  color="green"
                  textSize="text-[10px] sm:text-[11px]"
                />
              ))}
          </div>

          {/* Who + Duration */}

          <div className="space-y-3">
            <p className="text-textWhite text-sm sm:text-lg font-medium">
              {role === "tutor" ? "Student: " : "Tutor: "} {name}{" "}
            </p>
            <div className="flex justify-between items-center gap-4 border-b border-textMuted/10 pb-3">
              <p className="text-[10px] sm:text-[11px] text-textMuted">
                Scheduled:{" "}
                <span className="text-textWhite/80">
                  {formatted(cs.scheduledFor)}
                </span>
              </p>

              {cs.startTime && (
                <p className="text-[10px] sm:text-[11px] text-textMuted text-right">
                  Started:{" "}
                  <span className="text-textWhite/80">
                    {formatted(cs.startTime)}
                  </span>
                </p>
              )}
            </div>

            {/* Schedule & Completion Metadata */}
            <div className="flex justify-between items-center gap-6">
              <p className="text-[10px] sm:text-[11px] text-textMuted">
                Completed:{" "}
                <span className="text-textWhite/80">
                  {formatted(cs.completedAt)}
                </span>
              </p>
              <Tag
                textSize="text-[10px] sm:text-[11px]"
                value={`Duration: ${durationText}`}
                color="gray"
              />
            </div>
          </div>
        </div>
      </CardShell>
    </>
  );
}
