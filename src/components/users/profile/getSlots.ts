import { SlotsRow } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export async function getOnsiteSlots(tutorId: string) {
  const { data, error } = await supabase
    .from("available_slots")
    .select("*")
    .eq("tutor_id", tutorId)
    .overrideTypes<SlotsRow[]>();

  if (error) console.error("Slots getting error", error);

  return data ?? [];
}
