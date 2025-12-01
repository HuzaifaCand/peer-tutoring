import { RequestModal } from "../admin/edit-requests/RequestModal";
import { CardByType } from "../card/types";
import { refetchFlagType, TableRowByType } from "../table/types";
import ModalBase from "./ModalBase";
import { ActiveSessionModal } from "./session/ActiveSessionModal";
import { CancelledSessionModal } from "./session/CancelledSessionModal";
import { ScheduledSessionModal } from "./session/ScheduledSessionModal";
import { StudentModal } from "../admin/students/StudentModal";
import { TutorModal } from "../admin/tutors/TutorModal";
import { CompletedSessionModal } from "../admin/sessions/completed/CompletedSessionModal";

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
  setRefetchFlag?: refetchFlagType;
}

export function Modal({ type, data, onClose, setRefetchFlag }: ModalProps) {
  if (!type) return null;
  const refetch = () => setRefetchFlag && setRefetchFlag((prev) => !prev);

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
          cs={data as TableRowByType["completedSession"]}
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
        <TutorModal
          tutor={data as TableRowByType["tutor"]}
          onClose={onClose}
          refetch={refetch}
        />
      );
      break;
    case "editRequest":
      content = (
        <RequestModal
          request={data as TableRowByType["editRequest"]}
          onClose={onClose}
          refetchTable={refetch}
        />
      );
  }

  return (
    <ModalBase isOpen={!!data} onClose={onClose} autoFocus={false}>
      {content}
    </ModalBase>
  );
}
