"use client";

import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { getActionButtonClass } from "../../sharedUI";

interface StartSessionProps {
  isOnline: boolean;
  refetch: () => void;
  sessionId: string;
  disabled: boolean;
}
export function StartSession({
  isOnline,
  sessionId,
  refetch,
  disabled,
}: StartSessionProps) {
  const [startModal, setStartModal] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");

  async function handleStartSession(link: string | undefined) {
    if (isOnline && !link?.trim()) return;

    const { error } = await supabase
      .from("sessions")
      .update({
        status: "in_progress",
        start_time: new Date().toISOString(),
        meeting_link: link?.trim() ?? null,
      })
      .eq("id", sessionId);

    if (error) {
      console.error("cancellation error", error);
      toast.error("Failed to start sessions. Try again");
      return;
    }

    refetch();
    setStartModal(false);
  }

  const sharedProps = {
    type: "positive",
    onCancel: () => setStartModal(false),
    isOpen: startModal,
    confirmText: "Start Session",
    title: "Are you sure you want to start this session",
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
      <button
        onClick={() => setStartModal(true)}
        disabled={disabled}
        className={getActionButtonClass("positive")}
      >
        Start Session
      </button>
    </>
  );
}
