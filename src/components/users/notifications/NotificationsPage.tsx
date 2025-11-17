"use client";

import { useNotifications } from "./NotificationsProvider";
import { useNotificationsStore } from "./notificationsStore";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import SectionHeader from "@/components/ui/SectionHeader";

export default function NotificationsPage() {
  const notifications = useNotifications();
  const { markAllRead } = useNotificationsStore();
  const { user } = useAuthUser();

  useEffect(() => {
    if (!user || !notifications || notifications.length === 0) return;

    // update server
    supabase
      .from("notifications")
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("read", false);

    // update local state
    markAllRead();
  }, [user, notifications]);

  return (
    <>
      <SectionHeader title="Notifications" />
      <div className="space-y-3">
        {notifications?.map((n) => (
          <h1 key={n.id} className="text-2xl font-semibold text-textWhite">
            {n.title}
          </h1>
        ))}
      </div>
    </>
  );
}
