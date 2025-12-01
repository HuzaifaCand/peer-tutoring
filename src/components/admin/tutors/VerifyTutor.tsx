"use client";

import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { getActionButtonClass } from "@/components/users/sessions/sharedUI";
import { createNotification } from "@/components/notifications/createNotification";

export function VerifyTutor({
  tutorId,
  refetch,
  closeModal,
}: {
  tutorId: string;
  refetch: () => void;
  closeModal: () => void;
}) {
  const [onsiteModal, setOnsiteModal] = useState(false);

  const handleApproveTutor = async () => {
    const { error: reqError } = await supabase
      .from("tutors")
      .update({ approved: true })
      .eq("id", tutorId)
      .select()
      .maybeSingle();

    if (reqError) {
      console.error(reqError);
      toast.error("Failed to verify, try again.");
      return;
    }

    toast.success("Tutor approved successfully.");
    await createNotification({
      userId: tutorId,
      title: "Your profile has been approved",
      body: "You will now be visible to students",
      type: "general",
    });

    closeModal();
    refetch();
  };

  return (
    <>
      <ConfirmationModal
        title="Approve Tutor Profile?"
        type="positive"
        isOpen={onsiteModal}
        onCancel={() => setOnsiteModal(false)}
        onConfirm={handleApproveTutor}
        confirmText="Approve"
      />
      <button
        onClick={() => setOnsiteModal(true)}
        className={getActionButtonClass("positive", "sm")}
      >
        Approve Profile
      </button>
    </>
  );
}
