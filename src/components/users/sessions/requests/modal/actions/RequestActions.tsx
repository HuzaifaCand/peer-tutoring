"use client";

import { UnifiedRequest } from "../../getSessionRequests";
import { FormButton } from "@/components/forms/FormButton";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { RejectRequest } from "./RejectRequest";
import { AcceptRequest } from "./AcceptRequest";

export function RequestActions({
  req,
  role,
  closeModal,
  refetch,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
  closeModal: () => void;
  refetch: () => void;
}) {
  const type = req.type;

  const handleCancel = async () => {
    const table =
      type === "onsite" ? "onsite_session_requests" : "online_session_requests";

    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", req.id)
      .eq("status", "pending");

    if (error) {
      console.error(error);
      toast.error("Could not cancel the request.");
      return;
    }

    closeModal();
    refetch();
  };

  const [cancelModal, setCancelModal] = useState(false);
  if (role === "student") {
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
            style="reject"
            handleClick={() => setCancelModal(true)}
          />
        </div>
      </>
    );
  }

  if (role === "tutor") {
    return (
      <div className="flex justify-end gap-3 pt-4">
        <RejectRequest
          type={type}
          refetch={refetch}
          requestId={req.id}
          closeModal={closeModal}
        />
        <AcceptRequest
          type={type}
          refetch={refetch}
          req={req}
          closeModal={closeModal}
        />
      </div>
    );
  }

  return null;
}
