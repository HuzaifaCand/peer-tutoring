"use client";

import { useNotifications } from "./NotificationsProvider";
import { useNotificationsStore } from "./notificationsStore";
import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import SectionHeader from "@/components/ui/SectionHeader";
import { NotificationCard } from "./NotificationCard";

export default function NotificationsPage() {
  const notifications = useNotifications();
  const { markAllRead } = useNotificationsStore();
  const { user } = useAuthUser();

  const hasMarked = useRef(false);

  useEffect(() => {
    if (hasMarked.current) return; // prevent infinite loops
    if (!notifications || !user || notifications.length === 0) return;

    hasMarked.current = true; // lock execution

    supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("user_id", user.id)
      .eq("read", false)
      .then(() => {
        markAllRead(); // sync local store
      });
  }, [user, notifications]); // we WANT notif dependency
  // ref prevents reruns

  return (
    <>
      <SectionHeader title="Notifications" />
      {notifications?.map((n) => (
        <NotificationCard key={n.id} n={n} />
      ))}
    </>
  );
}
