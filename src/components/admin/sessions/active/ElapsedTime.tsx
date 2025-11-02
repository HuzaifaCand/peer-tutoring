"use client";

import { useEffect, useState } from "react";
import { differenceInSeconds, parseISO } from "date-fns";

// You can later move this helper to a shared utils file if needed.
function getElapsedColor(elapsed: number, expectedMinutes: number): string {
  const expectedSeconds = expectedMinutes * 60;

  // Significantly over (≥10 min)
  if (elapsed >= expectedSeconds + 10 * 60) return "text-red-600";

  // slightly over
  if (elapsed >= expectedSeconds && elapsed < expectedSeconds + 10 * 60)
    return "text-yellow-400";

  // approaching end
  if (elapsed >= expectedSeconds - 15 * 60) return "text-green-400";

  // Normal ongoing
  return "text-gray-300";
}

export function ElapsedTime({
  start,
  expectedMinutes,
}: {
  start: string | null;
  expectedMinutes: number;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startDate = parseISO(start);
    const update = () => setElapsed(differenceInSeconds(new Date(), startDate));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [start]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const color = getElapsedColor(elapsed, expectedMinutes);

  return (
    <span className={`font-medium ${color}`}>
      {minutes}:{seconds.toString().padStart(2, "0")}{" "}
    </span>
  );
}
