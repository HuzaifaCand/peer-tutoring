"use client";

import { supabase } from "@/lib/supabase/client";
import { useOnlineMessages } from "./useOnlineMessages";
import { MessagingUI } from "../messages/MessagingUI";

export function MessagingPanel({
  disable,
  requestId,
  userId,
}: {
  requestId: string;
  disable: boolean;
  userId: string;
}) {
  const { messages, loading } = useOnlineMessages(requestId);

  async function sendMessage(text: string) {
    await supabase.from("online_session_messages").insert({
      request_id: requestId,
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
      onSend={sendMessage}
      loading={loading}
      disabled={disable}
      messages={mapped}
    />
  );
}
