// components/Messaging/MessagingPanel.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { FormButton } from "@/components/forms/FormButton";
import { useOnlineMessages } from "./useOnlineMessages";
import { MessageBubble } from "./MessageBubble";
import { Loader, Loader2 } from "lucide-react";

export function MessagingPanel({
  requestId,
  userId,
}: {
  requestId: string;
  userId: string;
}) {
  const { messages, loading, bottomRef } = useOnlineMessages(requestId);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    setSending(true);

    const { error } = await supabase.from("online_session_messages").insert({
      request_id: requestId,
      sender_id: userId,
      message: input.trim(),
    });

    if (!error) setInput("");
    setSending(false);
  }

  return (
    <div className="flex flex-col h-[70vh] bg-mainBg rounded-xl border border-textMuted/10 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-textMuted/10">
        <h2 className="text-textWhite font-semibold text-sm">Messages</h2>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {loading ? (
          <Loader2 className="text-textWhite w-3 h-3 animate-spin" />
        ) : messages.length === 0 ? (
          <p className="text-textMuted text-sm">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.message}
              createdAt={msg.created_at}
              mine={msg.sender_id === userId}
            />
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-textMuted/10 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-elevatedBg text-textWhite p-2 rounded-lg text-sm outline-none"
          placeholder="Write a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <FormButton
          size="xs"
          text="Send"
          disabled={sending || !input.trim()}
          handleClick={sendMessage}
        />
      </div>
    </div>
  );
}
