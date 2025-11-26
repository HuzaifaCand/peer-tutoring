import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";

export function useCloseModal<T>(
  setSelected: Dispatch<SetStateAction<T | null>>
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useCallback(() => {
    setSelected(null);

    // clonse current params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");

    // Build the new URL with the same pathname but modified params
    const newUrl = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    router.replace(newUrl);
  }, [router, setSelected, searchParams]);
}
