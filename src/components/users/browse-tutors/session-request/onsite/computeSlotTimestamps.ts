import { supabase } from "@/lib/supabase/client";
import { SlotsRow } from "@/lib/computedtypes";

export type SlotWithTimestamp = SlotsRow & {
  next_time: string | null;
};

/**
 * Computes the next upcoming timestamp for each available slot.
 * Returns sorted results (soonest first).
 */
export async function computeSlotTimestamps(
  slots: SlotsRow[]
): Promise<SlotWithTimestamp[]> {
  const available = slots.filter((s) => s.available);

  if (available.length === 0) return [];

  // Run all RPC calls in parallel
  const rpcCalls = available.map((slot) =>
    supabase.rpc("next_slot_timestamp", {
      _day: slot.day.toLowerCase(),
      _hour: slot.hour,
    })
  );

  const results = await Promise.all(rpcCalls);

  const mapped: SlotWithTimestamp[] = available.map((slot, i) => ({
    ...slot,
    next_time: results[i].data ?? null,
  }));

  // Sort by soonest timestamp
  mapped.sort((a, b) => {
    if (!a.next_time) return 1;
    if (!b.next_time) return -1;
    return new Date(a.next_time).getTime() - new Date(b.next_time).getTime();
  });

  return mapped;
}
