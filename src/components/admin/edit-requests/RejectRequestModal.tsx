import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface Props {
  requestModalConfig: {
    request_id: string;
    refetchTable: () => void;
    onClose: () => void;
    isOpen: boolean;
    setIsOpen: (b: boolean) => void;
    user: User | null;
    userLoading: boolean;
  };
  rejectReason: string;
  setRejectReason: (s: string) => void;
}

export function RejectRequestModal({
  requestModalConfig,
  setRejectReason,
  rejectReason,
}: Props) {
  const {
    request_id,
    refetchTable,
    onClose,
    isOpen,
    setIsOpen,
    user,
    userLoading,
  } = requestModalConfig;

  async function rejectRequest() {
    if (!user || userLoading) return;
    const { error } = await supabase
      .from("edit_requests")
      .update({
        approved: false,
        admin_id: user.id,
        rejection_reason: rejectReason.trim(),
      })
      .eq("id", request_id);

    if (error) {
      console.error("rejecting error:", error);
      return;
    }

    refetchTable();
    setIsOpen(false);
    onClose();
  }

  return (
    <ConfirmationModal
      title="Reject Request?"
      confirmText="Reject"
      type="destructive"
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
      onConfirm={rejectRequest}
      inputConfig={{
        inputLabel: "Rejection Reason",
        inputValue: rejectReason,
        onInputChange: setRejectReason,
        inputRequired: true, // Required for rejects
        placeholder: "Please provide a reason for rejecting this request.",
      }}
      successMessage="Request rejected successfully!"
    />
  );
}
