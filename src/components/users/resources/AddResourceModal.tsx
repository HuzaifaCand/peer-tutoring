import { AddResourceForm } from "@/components/forms/AddResourceForm";
import ModalBase from "@/components/modal/ModalBase";

export function AddResourceModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  return (
    <ModalBase width="tight" onClose={closeModal} isOpen={open}>
      <AddResourceForm />
    </ModalBase>
  );
}
