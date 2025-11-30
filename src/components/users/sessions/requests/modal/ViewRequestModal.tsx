"use client";

import ModalBase from "@/components/modal/ModalBase";
import { UnifiedRequest } from "../getSessionRequests";
import { RequestHeader } from "./RequestHeader";
import { RequestMeta } from "./RequestMeta";
import { RequestActions } from "./actions/RequestActions";
import { MessagingPanel } from "../MessagingPanel";

// needs to handle the option for deletion by students if req.status === "pending"
// needs to show more detailed info
// needs to allow tutors to accept or reject it and based on if the req.type is online or not, they will have to schedule an exact time for it and then we also need to have a messaging panel to handle messages, very beefy modal. easier for onsite then online but will have to divide concerns

export function ViewRequestModal({
  req,
  closeModal,
  role,
  refetch,
}: {
  req: UnifiedRequest | null;
  closeModal: () => void;
  role: "tutor" | "student";
  refetch: () => void;
}) {
  return (
    <ModalBase isOpen={!!req} onClose={closeModal}>
      {req && (
        <div className="space-y-6 pt-4">
          <RequestHeader role={role} req={req} />
          <hr className="my-6 text-textMuted/10 h-[1px]" />
          <RequestMeta role={role} req={req} />
          {req.type === "online" && (
            <MessagingPanel
              disable={req.status !== "pending"}
              requestId={req.id}
              userId={role === "tutor" ? req.tutor_id : req.student_id}
            />
          )}

          {req.type === "onsite" && (
            <hr className="my-2 text-textMuted/10 h-[1px]" />
          )}

          {req.status === "pending" && (
            <RequestActions
              req={req}
              role={role}
              closeModal={closeModal}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </ModalBase>
  );
}
