"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { UnifiedRequest } from "../../getSessionRequests";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { getActionButtonClass } from "../../../sharedUI";
import { format, parseISO } from "date-fns";
import { createNotification } from "@/components/notifications/createNotification";

const cutoff = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minute buffer

function formatDateTime(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  const d = parseISO(dateStr);
  const date = format(d, "EEEEEEEEEEEEEEEE, d MMM");
  const time = format(d, "h:mm a");
  return `${date} at ${time}`;
}

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

    if (!updateReq) {
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

    await createNotification({
      userId: req.student_id,
      title: "Session Request Accepted",
      type: "session_accepted",
      body: `Your session request for ${formatDateTime(
        req.scheduled_for
      )} has been accepted. The session has been scheduled.`,
      href: "/student/session?tab=scheduled",
    });

    toast.success("Session scheduled!");
    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title={`Schedule session for ${formatDateTime(req.scheduled_for!)}?`}
        type="positive"
        isOpen={onsiteModal}
        onCancel={() => setOnsiteModal(false)}
        onConfirm={handleAcceptOnsite}
        confirmText="Schedule"
      />
      <button
        onClick={() => setOnsiteModal(true)}
        className={getActionButtonClass("positive")}
      >
        Accept
      </button>
    </>
  );
}
