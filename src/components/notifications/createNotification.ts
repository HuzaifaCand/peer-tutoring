import { supabase } from "@/lib/supabase/client";

export type NotificationType =
  | "session_request"
  | "session_accepted"
  | "session_rejected"
  | "general"
  | "edit_request"
  | "session_cancellation"
  | "session_started"
  | "resources"
  | "system"
  | "session";

interface CreateNotificationInput {
  userId: string;
  title: string;
  body?: string | null;
  href?: string | null;
  type: NotificationType;
}

export async function createNotification({
  userId,
  title,
  body = null,
  href = null,
  type,
}: CreateNotificationInput) {
  const { data, error } = await supabase.from("notifications").insert({
    user_id: userId,
    title,
    body,
    href,
    type,
  });

  if (error) {
    console.error("Failed to create notification:", error);
    throw error;
  }

  return data;
}
