"use client";

import { ComputedEditRequest } from "./getEditRequests";
import { useState } from "react";
import { ApproveRequestModal } from "./ApproveRequestModal";
import { RejectRequestModal } from "./RejectRequestModal";
import { RequestModalContent } from "./RequestModalContent";
import { useAuthUser } from "@/hooks/useAuthUser";

interface Props {
  request: ComputedEditRequest;
  onClose: () => void;
  refetchTable: () => void;
}
export function RequestModal({ request, onClose, refetchTable }: Props) {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const { user, userLoading } = useAuthUser();

  const sharedPayload = {
    refetchTable: refetchTable,
    request_id: request.id,
    onClose: onClose,
    user: user,
    userLoading: userLoading,
  };

  return (
    <>
      {/* APPROVE MODAL */}
      <ApproveRequestModal
        requestModalConfig={{
          isOpen: approveModal,
          setIsOpen: setApproveModal,
          ...sharedPayload,
        }}
      />

      {/* REJECT MODAL */}
      <RejectRequestModal
        requestModalConfig={{
          isOpen: rejectModal,
          setIsOpen: setRejectModal,
          ...sharedPayload,
        }}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
      />

      {/* MAIN CONTENT */}
      <RequestModalContent
        request={request}
        handleApprove={() => setApproveModal(true)}
        handleReject={() => {
          setRejectReason("");
          setRejectModal(true);
        }}
        onClose={onClose}
      />
    </>
  );
}
