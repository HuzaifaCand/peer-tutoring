import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useCloseModal<T>(
  setSelected: Dispatch<SetStateAction<T | null>>
) {
  const router = useRouter();

  return useCallback(() => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    router.replace(url.toString());
  }, [router, setSelected]);
}
