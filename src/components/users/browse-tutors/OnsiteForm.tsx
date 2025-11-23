"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { SlotsRow } from "@/lib/computedtypes";
import { formatHour } from "../onboarding/AvailableSlots";

interface OnsiteFormProps {
  slots: SlotsRow[];
}

type SlotWithTimestamp = SlotsRow & {
  next_time: string | null;
};

export function OnsiteForm({ slots }: OnsiteFormProps) {
  const [computedSlots, setComputedSlots] = useState<SlotWithTimestamp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function computeTimes() {
      setLoading(true);

      const results: SlotWithTimestamp[] = [];

      for (const slot of slots) {
        const { data, error } = await supabase.rpc("next_slot_timestamp", {
          _day: slot.day.toLowerCase(),
          _hour: slot.hour,
        });

        if (error) {
          console.error("Error computing slot:", error);
        }

        results.push({
          ...slot,
          next_time: data ?? null,
        });
      }

      // sort by next_time ascending
      results.sort(
        (a, b) =>
          new Date(a.next_time!).getTime() - new Date(b.next_time!).getTime()
      );

      setComputedSlots(results);
      setLoading(false);
    }

    computeTimes();
  }, [slots]);

  if (loading) return <p>Loading slot times...</p>;

  return (
    <div className="space-y-2 text-textWhite pb-4 w-full">
      <h2 className="text-md font-semibold">Available Slots</h2>

      <ul className="space-y-2 text-xs">
        {computedSlots.map((slot) => (
          <li
            key={slot.id}
            className="border border-white/10 rounded-lg p-3 flex justify-between bg-mainBg/40"
          >
            <span className="font-medium">
              {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
            </span>

            <span>
              {formatHour(slot.hour)} •{" "}
              <span className="text-white/70">
                {new Date(slot.next_time!).toLocaleDateString("en-GB")}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
