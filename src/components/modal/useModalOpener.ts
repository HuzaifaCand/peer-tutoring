import { useSearchParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useModalOpener<T>(
  setSelected: Dispatch<SetStateAction<T | null>>,
  paramKey: string = "id"
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = useCallback(
    (item: T & { id: string | number }) => {
      setSelected(item);

      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, String(item.id));

      router.push(`?${params.toString()}`);
    },
    [router, searchParams, setSelected, paramKey]
  );

  return { handleOpen };
}
