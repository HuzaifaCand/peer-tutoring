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
    <ModalBase onClose={closeModal} isOpen={open}>
      <AddResourceForm />
    </ModalBase>
  );
}
