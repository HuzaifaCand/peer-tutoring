import { useMessages } from "../messages/useMessages";

export function useActiveMessages(sessionId: string) {
  return useMessages<{
    id: string;
    sender_id: string;
    message: string;
    created_at: string;
    session_id: string;
  }>({
    table: "active_session_messages",
    foreignKey: "session_id",
    value: sessionId,
    channelPrefix: "active_msgs",
  });
}
