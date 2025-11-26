"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { StudentFeedbackModal } from "./StudentFeedbackModal";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";

export function StudentFeedbackButton({ sessionId }: { sessionId: string }) {
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
        .eq("session_id", sessionId)
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
  }, [sessionId, refetch]);

  return (
    <>
      <StudentFeedbackModal
        sessionId={sessionId}
        studentId={studentId}
        isOpen={feedbackModal}
        onClose={() => setFeedbackModal(false)}
        refetch={() => setRefetch((prev) => !prev)}
      />
      {!fetching &&
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
    </>
  );
}
