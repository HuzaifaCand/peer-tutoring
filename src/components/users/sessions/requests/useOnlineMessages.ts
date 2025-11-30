import { useMessages } from "../messages/useMessages";

export function useOnlineMessages(requestId: string) {
  return useMessages<{
    id: string;
    sender_id: string;
    message: string;
    created_at: string;
    request_id: string;
  }>({
    table: "online_session_messages",
    foreignKey: "request_id",
    value: requestId,
    channelPrefix: "online_msgs",
  });
}
