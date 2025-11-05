import { useEffect, useState } from "react";

export function useDataFetch<T>(
  fetchFn: () => Promise<T[]>,
  options?: {
    sortFn?: (a: T, b: T) => number;
    autoRefresh?: boolean;
    refreshIntervalMs?: number;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const result = await fetchFn();
      const sorted = options?.sortFn
        ? [...result].sort(options.sortFn)
        : result;
      setData(sorted);
      setLastUpdated(new Date());
      setLoading(false);
    }

    load();

    if (options?.autoRefresh) {
      const interval = setInterval(
        load,
        options.refreshIntervalMs ?? 5 * 60 * 1000
      );
      return () => clearInterval(interval);
    }
  }, [refetchFlag]);

  return { data, loading, refetchFlag, setRefetchFlag, lastUpdated };
}
