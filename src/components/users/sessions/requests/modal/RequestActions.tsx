"use client";

import { UnifiedRequest } from "../getSessionRequests";
import { FormButton } from "@/components/forms/FormButton";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";

export function RequestActions({
  req,
  role,
  closeModal,
  onRefetch,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
  closeModal: () => void;
  onRefetch: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const isStudent = role === "student";
  const isTutor = role === "tutor";

  const handleCancel = async () => {
    const table =
      req.type === "onsite"
        ? "onsite_session_requests"
        : "online_session_requests";

    const { error } = await supabase
      .from(table)
      .delete() // treat cancellation as rejection
      .eq("id", req.id);

    if (error) {
      console.error(error);
      toast.error("Could not cancel the request.");
      return;
    }

    closeModal();
    onRefetch();
  };

  const handleReject = async () => {
    setLoading(true);

    const table =
      req.type === "onsite"
        ? "onsite_session_requests"
        : "online_session_requests";

    const { error } = await supabase
      .from(table)
      .update({ status: "rejected" })
      .eq("id", req.id);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Could not reject the request.");
      return;
    }

    toast.success("Request rejected.");
    closeModal();
    onRefetch();
  };

  const handleAcceptOnsite = async () => {
    setLoading(true);

    // 1. Create session
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

    // 2. Mark request accepted
    const { error: reqError } = await supabase
      .from("onsite_session_requests")
      .update({ status: "accepted" })
      .eq("id", req.id);

    setLoading(false);

    if (reqError) {
      console.error(reqError);
      toast.error("Session created but request update failed.");
      return;
    }

    toast.success("Session scheduled!");
    closeModal();
    onRefetch();
  };

  // UI CASES ---------------------------------------

  const [cancelModal, setCancelModal] = useState(false);
  if (isStudent) {
    return (
      <>
        <ConfirmationModal
          type="destructive"
          title="Are you sure you want to cancel?"
          isOpen={cancelModal}
          onCancel={() => setCancelModal(false)}
          onConfirm={handleCancel}
        />
        <div className="flex justify-end pt-4">
          <FormButton
            text="Cancel Request"
            size="xs"
            del
            handleClick={() => setCancelModal(true)}
            disabled={loading}
          />
        </div>
      </>
    );
  }

  if (isTutor) {
    return (
      <div className="flex justify-end gap-3 pt-4">
        <FormButton
          text="Reject"
          size="sm"
          handleClick={handleReject}
          disabled={loading}
        />

        {req.type === "onsite" && (
          <FormButton
            text="Accept"
            size="sm"
            handleClick={handleAcceptOnsite}
            disabled={loading}
          />
        )}

        {req.type === "online" && (
          <FormButton
            text="Accept"
            size="sm"
            handleClick={() => {
              toast.message("Online scheduling coming soon.");
            }}
            disabled={loading}
          />
        )}
      </div>
    );
  }

  return null;
}
