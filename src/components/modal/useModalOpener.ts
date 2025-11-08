import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useModalOpener<T>(
  setSelected: Dispatch<SetStateAction<T | null>>,
  paramKey: string = "id"
) {
  const router = useRouter();

  const handleOpen = useCallback(
    (item: T & { id: string | number }) => {
      setSelected(item);
      router.replace(`?${paramKey}=${item.id}`);
    },
    [router, setSelected, paramKey]
  );

  return { handleOpen };
}
