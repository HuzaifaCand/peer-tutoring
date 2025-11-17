import { RequestModal } from "../admin/edit-requests/RequestModal";
import { CardByType } from "../card/types";
import { TableRowByType } from "../table/types";
import ModalBase from "./ModalBase";
import { ActiveSessionModal } from "./session/ActiveSessionModal";
import { CancelledSessionModal } from "./session/CancelledSessionModal";
import { CompletedSessionModal } from "./session/CompletedSessionModal";
import { ScheduledSessionModal } from "./session/ScheduledSessionModal";
import { StudentModal } from "./StudentModal";
import { TutorModal } from "./TutorModal";

type ModalType =
  | "activeSession"
  | "cancelledSession"
  | "scheduledSession"
  | "completedSession"
  | "student"
  | "tutor"
  | "editRequest";

interface ModalProps {
  type: ModalType;
  data: unknown;
  onClose: () => void;
}

export function Modal({ type, data, onClose }: ModalProps) {
  if (!type) return null;

  let content: React.ReactNode = null;
  switch (type) {
    case "activeSession":
      content = (
        <ActiveSessionModal
          session={data as CardByType["activeSession"]}
          onClose={onClose}
        />
      );
      break;
    case "cancelledSession":
      content = (
        <CancelledSessionModal
          session={data as TableRowByType["cancelledSession"]}
          onClose={onClose}
        />
      );
      break;
    case "scheduledSession":
      content = (
        <ScheduledSessionModal
          session={data as TableRowByType["scheduledSession"]}
          onClose={onClose}
        />
      );
      break;
    case "completedSession":
      content = (
        <CompletedSessionModal
          session={data as TableRowByType["completedSession"]}
          onClose={onClose}
        />
      );
      break;
    case "student":
      content = (
        <StudentModal
          student={data as TableRowByType["student"]}
          onClose={onClose}
        />
      );
      break;
    case "tutor":
      content = (
        <TutorModal tutor={data as TableRowByType["tutor"]} onClose={onClose} />
      );
      break;
    case "editRequest":
      content = (
        <RequestModal
          request={data as TableRowByType["editRequest"]}
          onClose={onClose}
        />
      );
  }

  return (
    <ModalBase isOpen={!!data} onClose={onClose} autoFocus={false}>
      {content}
    </ModalBase>
  );
}
