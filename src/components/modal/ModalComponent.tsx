import { ComputedActiveSession } from "../../lib/sessions/active/getActiveSessions";
import { ComputedCancelledSessionRow } from "../../lib/sessions/cancelled/getCancelledSessions";
import { ComputedCompletedSessionRow } from "../../lib/sessions/completed/getCompletedSessions";
import { ComputedScheduledSessionRow } from "../../lib/sessions/scheduled/getScheduledSessions";
import ModalBase from "./ModalBase";
import { ActiveSessionModal } from "./session/ActiveSessionModal";
import { CancelledSessionModal } from "./session/CancelledSessionModal";
import { CompletedSessionModal } from "./session/CompletedSessionModal";
import { ScheduledSessionModal } from "./session/ScheduledSessionModal";

type ModalType =
  | "activeSession"
  | "cancelledSession"
  | "scheduledSession"
  | "completedSession";

interface ModalProps {
  type: ModalType;
  data: unknown;
  onClose: () => void;
}

export function Modal({ type, data, onClose }: ModalProps) {
  if (!type) return null;

  let content: React.ReactNode = null;
  if (type === "activeSession") {
    content = (
      <ActiveSessionModal
        session={data as ComputedActiveSession}
        onClose={onClose}
      />
    );
  }
  if (type === "cancelledSession") {
    content = (
      <CancelledSessionModal
        session={data as ComputedCancelledSessionRow}
        onClose={onClose}
      />
    );
  }
  if (type === "scheduledSession") {
    content = (
      <ScheduledSessionModal
        session={data as ComputedScheduledSessionRow}
        onClose={onClose}
      />
    );
  }
  if (type === "completedSession") {
    content = (
      <CompletedSessionModal
        session={data as ComputedCompletedSessionRow}
        onClose={onClose}
      />
    );
  }

  return (
    <ModalBase isOpen={!!type} onClose={onClose}>
      {content}
    </ModalBase>
  );
}
