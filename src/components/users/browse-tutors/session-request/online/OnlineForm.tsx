"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createOnlineRequest } from "./createOnlineRequest";
import { OnlineFormUI } from "./OnlineFormUI";
import { createNotification } from "@/components/notifications/createNotification";

interface OnlineFormProps {
  currStudentId: string;
  sharedLoad: {
    tutorId: string;
    subjectLabel: string;
    subjectId: string;
  };
  closeModal: () => void;
}

export function OnlineForm({
  currStudentId,
  sharedLoad,
  closeModal,
}: OnlineFormProps) {
  const { tutorId, subjectId, subjectLabel } = sharedLoad;

  const [suggestedDate, setSuggestedDate] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!suggestedDate) {
      return toast.error("Please select a date.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(suggestedDate);
    selected.setHours(0, 0, 0, 0);

    // If selected date is BEFORE today → invalid
    if (selected < today) {
      return toast.error(
        "Please select a valid date. You cannot select a past day."
      );
    }

    // --- Validate time only if provided ---
    if (suggestedTime) {
      const [h, m] = suggestedTime.split(":").map(Number);

      const now = new Date();

      const isToday = selected.getTime() === today.getTime();

      if (isToday) {
        const selectedMinutes = h * 60 + m;
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        if (selectedMinutes < nowMinutes) {
          return toast.error("The selected time has already passed.");
        }
      }
    }

    setSubmitting(true);

    const payload = {
      student_id: currStudentId,
      tutor_id: tutorId,
      subject_id: subjectId,
      suggested_date: suggestedDate,
      suggested_time: suggestedTime.trim() || null,
      message: message.trim() || null,
    };

    const res = await createOnlineRequest(payload);

    if (res.error) {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    toast.success(`Request sent to tutor! They'll respond soon.`);

    await createNotification({
      userId: tutorId,
      title: "New Online Session Request",
      body: `A student has requested an online session for ${subjectLabel}`,
      href: `/tutor/sessions?tab=requests`,
      type: "session_request",
    });

    closeModal();
    setSubmitting(false);
  };

  return (
    <OnlineFormUI
      fields={{
        suggestedDate,
        setSuggestedDate,
        suggestedTime,
        setSuggestedTime,
        message,
        setMessage,
      }}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );
}
