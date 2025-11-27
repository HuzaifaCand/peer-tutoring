import { SharedPropsType } from "../../SessionsMain";
import { CancelSession } from "./CancelSession";
import { StartSession } from "./StartSession";

interface ActionProps {
  isOnline: boolean;
  sessionId: string;
  sharedProps: SharedPropsType;
  refetch: () => void;
  timeToSession: {
    mode: "grace" | "expired" | "before";
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
    graceMinutesLeft: number | null;
  };
}
export function ScheduledActions({
  isOnline,
  sessionId,
  sharedProps,
  refetch,
  timeToSession,
}: ActionProps) {
  const { hours, minutes, mode, graceMinutesLeft } = timeToSession;
  const { userId, role } = sharedProps;

  const disableCancel =
    mode === "expired" ||
    (mode === "grace" && graceMinutesLeft !== null && graceMinutesLeft <= 0);

  // ----------------------------
  // START BUTTON LOGIC (tutor only)
  // ----------------------------
  let disableStart = true;

  if (mode === "before") {
    // Start allowed only when <= 10 minutes before scheduled time
    if (hours !== null && hours === 0 && minutes !== null && minutes <= 10) {
      disableStart = false;
    }
  }

  if (mode === "grace") {
    // Session time has passed — tutor should still be able to start
    disableStart = false;
  }

  if (mode === "expired") {
    disableStart = true;
  }

  return (
    <div className="flex items-center gap-2">
      <CancelSession
        sessionId={sessionId}
        userId={userId}
        refetch={refetch}
        disableCancel={disableCancel}
      />
      {role === "tutor" && (
        <StartSession
          isOnline={isOnline}
          sessionId={sessionId}
          refetch={refetch}
          disabled={disableStart}
        />
      )}
    </div>
  );
}
