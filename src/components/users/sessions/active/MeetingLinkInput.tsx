"use client";

import { useState } from "react";
import { InlineEditable } from "@/components/ui/InlineEditable";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export function MeetingLinkEditable({
  sessionId,
  initialLink,
  refetch,
}: {
  sessionId: string;
  initialLink: string | null;
  refetch: () => void;
}) {
  const [link, setLink] = useState(initialLink ?? "");

  async function updateMeetingLink(newLink: string) {
    if (!sessionId) return;

    const previous = link; // for rollback
    const trimmed = newLink.trim();

    // Optimistic update
    setLink(trimmed);

    const { error } = await supabase
      .from("sessions")
      .update({ meeting_link: trimmed || null })
      .eq("id", sessionId);

    if (error) {
      // Rollback
      setLink(previous);
      console.error(error);
      toast.error("Failed to update meeting link.");
      return;
    }

    toast.success("Meeting link updated successfully.");

    refetch();
  }

  return (
    <div className="flex items-center gap-2 w-2/3 sm:w-1/2">
      <p className="text-[10px] sm:text-[11px] whitespace-nowrap mt-1.5 text-textWhite/70">
        Meeting Link
      </p>
      <InlineEditable
        type="input"
        value={link}
        onSave={(newValue) => updateMeetingLink(newValue)}
      />
    </div>
  );
}
