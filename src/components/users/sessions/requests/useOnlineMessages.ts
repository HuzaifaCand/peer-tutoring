"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";

type OnlineMessage = {
  id: string;
  request_id: string;
  sender_id: string;
  message: string;
  created_at: string;
};

export function useOnlineMessages(requestId: string) {
  const [messages, setMessages] = useState<OnlineMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from("online_session_messages")
      .select("*")
      .eq("request_id", requestId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data as OnlineMessage[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`messages_${requestId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "online_session_messages",
          filter: `request_id=eq.${requestId}`,
        },
        (payload) => {
          const newMessage = payload.new as OnlineMessage;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, loading, bottomRef };
}
