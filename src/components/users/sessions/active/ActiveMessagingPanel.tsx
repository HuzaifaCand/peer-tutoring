"use client";

import { supabase } from "@/lib/supabase/client";
import { useActiveMessages } from "./useActiveMessages";
import { MessagingUI } from "../messages/MessagingUI";

export function ActiveSessionMessagingPanel({
  sessionId,
  userId,
  disable,
}: {
  sessionId: string;
  userId: string;
  disable: boolean;
}) {
  const { messages, loading } = useActiveMessages(sessionId);

  async function sendMessage(text: string) {
    await supabase.from("active_session_messages").insert({
      session_id: sessionId,
      sender_id: userId,
      message: text,
    });
  }

  const mapped = messages.map((m) => ({
    id: m.id,
    text: m.message,
    createdAt: m.created_at,
    mine: m.sender_id === userId,
  }));

  return (
    <MessagingUI
      messages={mapped}
      loading={loading}
      disabled={disable}
      onSend={sendMessage}
    />
  );
}
