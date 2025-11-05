import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useModalOpener<T>(
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setSelected: Dispatch<SetStateAction<T | null>>,
  paramKey: string = "id"
) {
  const router = useRouter();

  const handleOpen = useCallback(
    (item: T & { id: string | number }) => {
      setSelected(item);
      setShowModal(true);
      router.replace(`?${paramKey}=${item.id}`);
    },
    [router, setSelected, setShowModal, paramKey]
  );

  return { handleOpen };
}
