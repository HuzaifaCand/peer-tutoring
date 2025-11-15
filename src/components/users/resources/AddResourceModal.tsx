import { AddResourceForm } from "@/components/forms/resources/AddResourceComponent";
import ModalBase from "@/components/modal/ModalBase";
import { refetchFlagType } from "@/components/table/types";

export function AddResourceModal({
  open,
  closeModal,
  setRefetchFlag,
}: {
  open: boolean;
  closeModal: () => void;
  setRefetchFlag: refetchFlagType;
}) {
  return (
    <ModalBase onClose={closeModal} isOpen={open}>
      <AddResourceForm
        setRefetchFlag={setRefetchFlag}
        closeModal={closeModal}
      />
    </ModalBase>
  );
}
