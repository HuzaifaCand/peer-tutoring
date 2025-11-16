import ModalBase from "@/components/modal/ModalBase";
import { Dispatch, SetStateAction } from "react";
import { SubjectTutorType } from "./getSubjectTutors";

export function TutorModal({
  tutor,
  showModal,
  setShowModal,
}: {
  tutor: SubjectTutorType;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ModalBase isOpen={showModal} onClose={() => setShowModal(false)}>
      {tutor.name}
    </ModalBase>
  );
}
