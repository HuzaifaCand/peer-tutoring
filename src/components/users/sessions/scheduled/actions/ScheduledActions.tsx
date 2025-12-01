"use client";

import { SharedPropsType } from "../../SessionsMain";
import { CancelSession } from "./CancelSession";
import { StartSession } from "./StartSession";
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
