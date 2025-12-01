"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { getActionButtonClass } from "../../sharedUI";
import { TimeToSessionType } from "../formatSessionCountdown";
import { createNotification } from "@/components/notifications/createNotification";
import clsx from "clsx";

interface StartSessionProps {
  isOnline: boolean;
  refetch: () => void;
  sessionId: string;
  timeToSession: TimeToSessionType;
}
export function StartSession({
  isOnline,
  sessionId,
  refetch,
  timeToSession,
}: StartSessionProps) {
  const [startModal, setStartModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");

  let disableStart = true;

  const { mode, hours, minutes } = timeToSession;

  if (mode === "before") {
    // Start allowed only when <= 10 minutes before scheduled time
    if (hours !== null && hours === 0 && minutes !== null && minutes <= 10) {
      disableStart = false;
    }
  }

  if (mode === "grace") {
    // Session time has passed — tutor should still be able to start
    disableStart = false;
  }

  if (mode === "expired") {
    disableStart = true;
  }

  async function handleStartSession(link: string | undefined) {
    if (isOnline && !link?.trim()) return;

    const { data, error } = await supabase
      .from("sessions")
      .update({
        status: "in_progress",
        start_time: new Date().toISOString(),
        meeting_link: link?.trim() ?? null,
      })
      .eq("id", sessionId)
      .select("student_id")
      .maybeSingle();

    if (error) {
      console.error("cancellation error", error);
      toast.error("Failed to start sessions. Try again");
      return;
    }

    if (!data) {
      return;
    }

    await createNotification({
      userId: data.student_id,
      title: "Session started",
      body: "Tutor has started the session. Please join them if you have not.",
      href: "/student/sessions?tab=active",
      type: "session_started",
    });

    refetch();
    setStartModal(false);
  }

  const sharedProps = {
    type: "positive",
    onCancel: () => setStartModal(false),
    isOpen: startModal,
    confirmText: "Start Session",
    title: "Are you sure you want to start this session?",
    successMessage: "Session has started, student has been notified!",
    onConfirm: () => handleStartSession(meetingLink),
  } as const;

  return (
    <>
      {isOnline ? (
        <ConfirmationModal
          {...sharedProps}
          inputConfig={{
            inputValue: meetingLink,
            onInputChange: setMeetingLink,
            inputRequired: true,
            inputLabel: "Add Meeting Link",
          }}
        />
      ) : (
        <ConfirmationModal {...sharedProps} />
      )}
      <div
        onClick={() => {
          if (disableStart) {
            toast.error(
              `Cannot start the session ${
                timeToSession.mode === "expired" ? "anymore" : "right now"
              }.`
            );
            return;
          }

          setStartModal(true);
        }}
      >
        <button
          disabled={disableStart}
          className={clsx(
            getActionButtonClass("positive"),
            "disabled:pointer-events-none"
          )}
        >
          Start Session
        </button>
      </div>
    </>
  );
}
