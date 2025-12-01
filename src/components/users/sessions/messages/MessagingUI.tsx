"use client";

import { useState, useEffect, useRef } from "react";
import { FormButton } from "@/components/forms/FormButton";
import { MessageBubble } from "./MessageBubble";
import { Loader2 } from "lucide-react";

export interface MessagingUIMessage {
  id: string;
  text: string;
  createdAt: string;
  mine: boolean;
}

export function MessagingUI({
  messages,
  loading,
  disabled,
  onSend,
}: {
  messages: MessagingUIMessage[];
  loading: boolean;
  disabled: boolean;
  onSend: (text: string) => Promise<void>;
}) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || disabled) return;

    setSending(true);
    await onSend(input.trim());
    setSending(false);
    setInput("");

    // Make sure we scroll after sending
    scrollToBottom();
  }

  return (
    <div className="flex flex-col max-h-[70vh] bg-mainBg rounded-xl border border-textMuted/10 overflow-hidden modal-scroll shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-textMuted/10">
        <h2 className="text-textWhite font-semibold text-sm">Messages</h2>
      </div>

      {/* Message list */}
      <div ref={listRef} className="flex-1 overflow-y-auto p-4 flex flex-col">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="text-textWhite w-3 h-3 animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-textMuted text-xs">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              createdAt={msg.createdAt}
              mine={msg.mine}
            />
          ))
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-textMuted/10 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-elevatedBg text-textWhite p-2 rounded-lg text-[11px] sm:text-xs outline-none
            disabled:bg-hoverBg disabled:text-textMuted disabled:cursor-not-allowed"
          placeholder={disabled ? "Chat disabled" : "Write a message…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !disabled && !sending) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <FormButton
          size="xs"
          text="Send"
          disabled={disabled || sending || !input.trim()}
          handleClick={handleSend}
        />
      </div>
    </div>
  );
}
