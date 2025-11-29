import { supabase } from "@/lib/supabase/client";
import { SharedPropsType } from "../../SessionsMain";
import { CancelSession } from "./CancelSession";
import { StartSession } from "./StartSession";
import { useEffect, useRef } from "react";
import { TimeToSessionType } from "../formatSessionCountdown";

interface ActionProps {
  isOnline: boolean;
  sessionId: string;
  sharedProps: SharedPropsType;
  refetch: () => void;
  timeToSession: TimeToSessionType;
}
export function ScheduledActions({
  isOnline,
  sessionId,
  sharedProps,
  refetch,
  timeToSession,
}: ActionProps) {
  const { userId, role } = sharedProps;

  // Prevent double auto-cancel calls
  const autoCancelled = useRef(false);

  useEffect(() => {
    if (timeToSession.mode !== "expired") return;
    if (autoCancelled.current) return;

    autoCancelled.current = true;

    const cancel = async () => {
      const { error } = await supabase
        .from("sessions")
        .update({
          cancelled_at: new Date().toISOString(),
          cancelled_by: userId,
          cancellation_source: "timeout",
          cancel_reason: "Session timed out as tutor did not start.",
        })
        .eq("id", sessionId);

      if (!error) {
        refetch();
      }
    };

    cancel();
  }, [timeToSession.mode, sessionId, userId, refetch]);

  return (
    <div className="flex items-center gap-2">
      <CancelSession
        sessionId={sessionId}
        userId={userId}
        refetch={refetch}
        timeToSession={timeToSession}
      />
      {role === "tutor" && (
        <StartSession
          isOnline={isOnline}
          sessionId={sessionId}
          refetch={refetch}
          timeToSession={timeToSession}
        />
      )}
    </div>
  );
}
