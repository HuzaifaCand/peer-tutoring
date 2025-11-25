"use client";

import ModalBase from "@/components/modal/ModalBase";
import { UnifiedRequest } from "../getSessionRequests";
import { RequestHeader } from "./RequestHeader";
import { RequestMeta } from "./RequestMeta";
import { refetchFlagType } from "@/components/table/types";
import { RequestActions } from "./RequestActions";

// needs to handle the option for deletion by students if req.status === "pending"
// needs to show more detailed info
// needs to allow tutors to accept or reject it and based on if the req.type is online or not, they will have to schedule an exact time for it and then we also need to have a messaging panel to handle messages, very beefy modal. easier for onsite then online but will have to divide concerns

export function ViewRequestModal({
  req,
  closeModal,
  role,
  onRefetch,
}: {
  req: UnifiedRequest | null;
  closeModal: () => void;
  role: "tutor" | "student";
  onRefetch: () => void;
}) {
  return (
    <ModalBase isOpen={!!req} onClose={closeModal}>
      {req && (
        <div className="space-y-4">
          <RequestHeader role={role} req={req} />
          <RequestMeta req={req} />
          {req.status === "pending" && (
            <RequestActions
              req={req}
              role={role}
              closeModal={closeModal}
              onRefetch={onRefetch}
            />
          )}
        </div>
      )}
    </ModalBase>
  );
}
