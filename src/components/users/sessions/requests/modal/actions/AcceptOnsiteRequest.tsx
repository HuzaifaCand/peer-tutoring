"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { UnifiedRequest } from "../../getSessionRequests";
import { FormButton } from "@/components/forms/FormButton";

export function AcceptOnsiteRequest({
  req,
  refetch,
  closeModal,
}: {
  req: UnifiedRequest;
  refetch: () => void;
  closeModal: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [onsiteModal, setOnsiteModal] = useState(false);

  const handleAcceptOnsite = async () => {
    setLoading(true);

    const { error: sessionError } = await supabase.from("sessions").insert({
      tutor_id: req.tutor_id,
      student_id: req.student_id,
      subject_id: req.subject_id,
      slot_id: req.slot_id,
      scheduled_for: req.scheduled_for,
      is_online: false,
      status: "scheduled",
    });

    if (sessionError) {
      console.error(sessionError);
      setLoading(false);
      toast.error("Could not schedule the session.");
      return;
    }

    const { error: reqError, data } = await supabase
      .from("onsite_session_requests")
      .update({ status: "accepted" })
      .eq("id", req.id)
      .eq("status", "pending")
      .gte("scheduled_for", new Date(Date.now() + 30 * 60 * 1000)) // NOW + 30 minutes buffer
      .select();

    if (!data || data.length === 0) {
      toast.error("This request has expired or is no longer pending.");
      setLoading(false);
      return;
    }

    setLoading(false);

    if (reqError) {
      console.error(reqError);
      toast.error("Session created but request update failed.");
      return;
    }

    toast.success("Session scheduled!");
    closeModal();
    refetch();
  };

  return (
    <>
      <FormButton
        text="Accept"
        size="sm"
        handleClick={() => setOnsiteModal(true)}
        disabled={loading}
      />
    </>
  );
}
