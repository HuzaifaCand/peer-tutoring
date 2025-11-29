"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { UnifiedRequest } from "../../getSessionRequests";
import { FormButton } from "@/components/forms/FormButton";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";

const cutoff = new Date(Date.now() + 30 * 60 * 1000).toISOString();

export function AcceptOnsiteRequest({
  req,
  refetch,
  closeModal,
}: {
  req: UnifiedRequest;
  refetch: () => void;
  closeModal: () => void;
}) {
  const [onsiteModal, setOnsiteModal] = useState(false);

  const formatted = (ts: string | null) =>
    ts &&
    new Date(ts).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handleAcceptOnsite = async () => {
    const { error: reqError, data: updateReq } = await supabase
      .from("onsite_session_requests")
      .update({ status: "accepted" })
      .eq("id", req.id)
      .eq("status", "pending")
      .gte("scheduled_for", cutoff) // dont allow accepting 30 minutes before
      .select()
      .maybeSingle();

    if (reqError) {
      console.error(reqError);
      toast.error("Session created but request update failed.");
      return;
    }

    if (!updateReq || updateReq.length === 0) {
      toast.error("This request has expired or is no longer pending.");
      return;
    }

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
      toast.error("Could not schedule the session.");
      return;
    }

    toast.success("Session scheduled!");
    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title={`Schedule session for ${formatted(req.scheduled_for!)}?`}
        type="positive"
        isOpen={onsiteModal}
        onCancel={() => setOnsiteModal(false)}
        onConfirm={handleAcceptOnsite}
        confirmText="Schedule"
      />
      <FormButton
        text="Accept"
        size="sm"
        handleClick={() => setOnsiteModal(true)}
      />
    </>
  );
}
