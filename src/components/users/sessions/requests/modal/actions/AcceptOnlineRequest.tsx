"use client";

import { useState } from "react";
import { getActionButtonClass } from "../../../sharedUI";
import { UnifiedRequest } from "../../getSessionRequests";
import { AcceptOnlineModal } from "./AcceptOnlineModal";

export function AcceptOnlineRequest({
  req,
  refetch,
  closeModal,
}: {
  req: UnifiedRequest;
  refetch: () => void;
  closeModal: () => void;
}) {
  const [onlineModal, setOnlineModal] = useState(false);

  return (
    <>
      <AcceptOnlineModal
        req={req}
        refetch={refetch}
        isOpen={onlineModal}
        onClose={() => setOnlineModal(false)}
        closeModal={closeModal}
      />
      <button
        onClick={() => setOnlineModal(true)}
        className={getActionButtonClass("positive", "sm")}
      >
        Schedule & Accept
      </button>
    </>
  );
}
