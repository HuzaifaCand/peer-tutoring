import { ComputedActiveSession } from "../admin/sessions/active/getActiveSessions";
import ModalBase from "./ModalBase";
import { SessionModal } from "./SessionModal";

type ModalType = "activeSession";

interface ModalProps {
  type: ModalType;
  data: ComputedActiveSession;
  onClose: () => void;
}

export function Modal({ type, data, onClose }: ModalProps) {
  if (!type) return null;

  let content: React.ReactNode = null;
  if (type.includes("Session")) {
    content = <SessionModal type={type} session={data} onClose={onClose} />;
  }

  return (
    <ModalBase isOpen={!!type} onClose={onClose}>
      {content}
    </ModalBase>
  );
}
