"use client";

import { createContext, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useNotificationsStore } from "./notificationsStore";
import { useAuthUser } from "@/hooks/useAuthUser";
import { toast } from "sonner";
import { Notification } from "@/lib/computedtypes";
import { BellRingIcon } from "lucide-react";
import Link from "next/link";

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
          toast(
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Icon bubble */}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">
                  <BellRingIcon className="w-4 h-4 text-[#e6e9ec]/90" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#e6e9ec] leading-tight">
                    {payload.new.title}
                  </p>

                  {payload.new.subtitle && (
                    <p className="text-xs text-[#e6e9ec]/70 mt-0.5">
                      {payload.new.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* View button */}
              {payload.new.href && (
                <Link
                  href={payload.new.href}
                  className="
                    text-xs font-medium 
                    px-3 py-1.5 
                    rounded-md 
                    bg-white/10 
                    hover:bg-white/15 
                    text-[#e6e9ec] 
                    border border-white/10
                    transition-colors
                    whitespace-nowrap
                  "
                >
                  View
                </Link>
              )}
            </div>
          );
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
