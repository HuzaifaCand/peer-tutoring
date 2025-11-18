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
}
export function ApproveRequestModal({ requestModalConfig }: Props) {
  const {
    request_id,
    refetchTable,
    onClose,
    isOpen,
    setIsOpen,
    user,
    userLoading,
  } = requestModalConfig;

  async function approveRequest() {
    if (!user || userLoading) return;
    const { error } = await supabase
      .from("edit_requests")
      .update({
        approved: true,
        admin_id: user.id,
        rejection_reason: null,
      })
      .eq("id", request_id);

    if (error) {
      console.error("approving error:", error);
      return;
    }

    refetchTable();
    setIsOpen(false);
    onClose();
  }

  return (
    <ConfirmationModal
      title="Approve Request?"
      confirmText="Confirm"
      description="Are you sure you want to approve this request?"
      type="positive"
      onConfirm={approveRequest}
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
      successMessage="Success! Please send a message to resolve if necessary"
    />
  );
}
