"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { OnlineAvailabilityUI } from "../onboarding/OnlineAvailabilityUI";
import { toast } from "sonner";

export function OnlineAvailability({ tutorId }: { tutorId: string }) {
  const [online, setOnline] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setOnlineAvailability() {
      const { data, error } = await supabase
        .from("tutors")
        .select("available_online")
        .eq("id", tutorId)
        .single()
        .overrideTypes<{ available_online: boolean }>();

      if (error) {
        console.error("Error fetching online availability", error);
        setOnline(null);
      } else {
        setOnline(data.available_online);
      }
    }
    setOnlineAvailability();
  }, [setOnline, tutorId]);

  async function handleToggle() {
    if (online === null || loading) return;

    const newValue = !online;
    setOnline(newValue);

    setLoading(true);

    const { error } = await supabase
      .from("tutors")
      .update({ available_online: newValue })
      .eq("id", tutorId);

    setLoading(false);

    if (error) {
      toast.error("Failed to update online availability.");
      setOnline(!newValue);
    } else {
      toast.success("Online availability updated.");
    }
  }

  return (
    online !== null && (
      <OnlineAvailabilityUI onToggle={handleToggle} online={online} />
    )
  );
}
