import { useEffect, useState } from "react";

export function useElapsedTimer(start: string | null) {
  const [elapsed, setElapsed] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!start) return;

    const startMs = new Date(start).getTime();

    const update = () => {
      const now = Date.now();
      const diffSec = Math.floor((now - startMs) / 1000);

      const minutes = Math.floor(diffSec / 60);
      const seconds = diffSec % 60;

      setElapsed({ minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return elapsed;
}
