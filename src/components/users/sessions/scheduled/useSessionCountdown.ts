"use client";

import { useEffect, useState } from "react";

export function useSessionCountdown(targetTs: string) {
  const getDiff = () => {
    const now = Date.now();
    const target = new Date(targetTs).getTime();
    const diffMs = target - now;

    if (diffMs > 0) {
      return {
        mode: "before" as const,
        totalSeconds: Math.floor(diffMs / 1000),
      };
    }

    const elapsedSeconds = Math.floor((now - target) / 1000);
    const graceSeconds = 30 * 60 - elapsedSeconds;

    if (graceSeconds <= 0) {
      return { mode: "expired" as const, totalSeconds: 0 };
    }

    return {
      mode: "grace" as const,
      totalSeconds: graceSeconds,
    };
  };

  const [state, setState] = useState(getDiff());

  useEffect(() => {
    const interval = setInterval(() => setState(getDiff()), 1000);
    return () => clearInterval(interval);
  }, [targetTs]);

  return state;
}
