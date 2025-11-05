import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useCloseModal(setShowModal: Dispatch<SetStateAction<boolean>>) {
  const router = useRouter();

  return useCallback(() => {
    setShowModal(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    router.replace(url.toString());
  }, [router, setShowModal]);
}
