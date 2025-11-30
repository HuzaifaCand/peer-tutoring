"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";

export function useMessages<
  T extends { id: string; created_at: string }
>(options: {
  table: string; // e.g. "online_session_messages"
  foreignKey: string; // e.g. "request_id" or "session_id"
  value: string; // the actual requestId or sessionId
  channelPrefix?: string; // optional ("messages" default)
}) {
  const { table, foreignKey, value, channelPrefix = "messages" } = options;

  const [messages, setMessages] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMessages() {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(foreignKey, value)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data as T[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`${channelPrefix}_${value}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table,
          filter: `${foreignKey}=eq.${value}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as T]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [value, table, foreignKey]);

  return { messages, loading };
}
