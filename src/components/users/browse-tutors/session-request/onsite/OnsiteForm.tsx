"use client";

import { useEffect, useState } from "react";
import { SlotsRow } from "@/lib/computedtypes";
import { toast } from "sonner";
import { computeSlotTimestamps } from "./computeSlotTimestamps";
import { OnsiteFormUI } from "./OnsiteFormUI";
import { createOnsiteRequest } from "./createOnsiteRequest";
import { createNotification } from "@/components/notifications/createNotification";

interface OnsiteFormProps {
  slots: SlotsRow[];
  sharedLoad: {
    tutorId: string;
    subjectLabel: string;
    subjectId: string;
  };
  currStudentId: string;
  closeModal: () => void;
}

type SlotWithTimestamp = SlotsRow & {
  next_time: string | null;
};

export function OnsiteForm({
  slots,
  sharedLoad,
  currStudentId,
  closeModal,
}: OnsiteFormProps) {
  const [computedSlots, setComputedSlots] = useState<SlotWithTimestamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const { tutorId, subjectId, subjectLabel } = sharedLoad;
  // -----------------------------
  // Compute next timestamps
  // -----------------------------
  useEffect(() => {
    async function load() {
      setLoading(true);
      const computed = await computeSlotTimestamps(slots);
      setComputedSlots(computed);
      setLoading(false);
    }
    load();
  }, [slots]);

  // -----------------------------
  // Submit handler
  // -----------------------------
  const handleSubmit = async () => {
    if (!selectedSlotId) {
      setSlotError("Please select a slot.");
      return;
    }

    const selected = computedSlots.find((s) => s.id === selectedSlotId);
    if (!selected || !selected.next_time) {
      setSlotError("Slot data is invalid.");
      return;
    }

    setSlotError(null);

    const payload = {
      student_id: currStudentId,
      tutor_id: tutorId,
      slot_id: selectedSlotId,
      scheduled_for: selected.next_time,
      message: message.trim() || null,
      subject_id: subjectId,
    };

    // insert
    setSubmitting(true);
    const res = await createOnsiteRequest(payload);

    // Duplicate unique constraint
    if (res.duplicate) {
      toast.error(
        "You have requested this slot already. View it in session requests."
      );
      return;
    }

    if (res.error) {
      console.error("Insert error:", res.error);
      toast.error("Something went wrong. Please try again.");
      return;
    }

    await createNotification({
      userId: tutorId,
      title: "New Onsite Session Request",
      body: `A student has requested an onsite session for ${subjectLabel}`,
      href: `/tutor/sessions?tab=requests`,
      type: "session_request",
    });

    setSubmitting(false);

    toast.success("Request submitted successfully!");
    closeModal();
  };

  return (
    <OnsiteFormUI
      slots={{ computedSlots, selectedSlotId, setSelectedSlotId }}
      errors={{ slotError, setSlotError }}
      msg={{ message, setMessage }}
      submit={{ submitting, handleSubmit }}
      loading={loading}
    />
  );
}
