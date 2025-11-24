"use client";

import { createContext, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useNotificationsStore } from "./notificationsStore";
import { useAuthUser } from "@/hooks/useAuthUser";
import { toast } from "sonner";
import { Notification } from "@/lib/computedtypes";

interface NotificationsProviderProps {
  children: React.ReactNode;
}

const NotificationsContext = createContext<Notification[] | null>(null);

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const { user } = useAuthUser();

  const { notifications, setNotifications, addNotification } =
    useNotificationsStore();

  // Initial fetch
  useEffect(() => {
    if (!user) return;

    async function load() {
      if (!user) return;
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setNotifications(data as Notification[]);
      }
    }

    load();
  }, [user, setNotifications]);

  // Realtime subscription for inserts
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`user-notifications-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          addNotification(payload.new as Notification);
          toast(payload.new.title);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
