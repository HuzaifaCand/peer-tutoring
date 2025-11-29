type modes = "grace" | "expired" | "before";

export type TimeToSessionType = {
  mode: modes;
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  graceMinutesLeft: number | null;
};

export function formatSessionCountdown(
  countdown: ReturnType<
    typeof import("./useSessionCountdown").useSessionCountdown
  >
) {
  let color: "gray" | "yellow" | "green" | "red" = "gray";
  let label: string | null = null;

  let timeToSession: TimeToSessionType = {
    mode: countdown.mode,
    hours: null as number | null,
    minutes: null as number | null,
    seconds: null as number | null,
    graceMinutesLeft: null as number | null,
  };

  if (countdown.mode === "before") {
    const hours = Math.floor(countdown.totalSeconds / 3600);
    const minutes = Math.floor((countdown.totalSeconds % 3600) / 60);
    const seconds = countdown.totalSeconds % 60;

    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes <= 10) color = "green";
    else if (totalMinutes <= 60) color = "yellow";
    else color = "gray";

    label =
      hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m ${seconds.toString().padStart(2, "0")}s`;

    timeToSession = {
      mode: "before",
      hours,
      minutes,
      seconds,
      graceMinutesLeft: null,
    };
  }

  if (countdown.mode === "grace") {
    const mins = Math.floor(countdown.totalSeconds / 60);

    label = `Auto-cancels in ${mins}m`;
    color = "red";

    timeToSession = {
      mode: "grace",
      hours: null,
      minutes: null,
      seconds: null,
      graceMinutesLeft: mins,
    };
  }

  if (countdown.mode === "expired") {
    label = "Cancelling…";
    color = "red";

    timeToSession = {
      mode: "expired",
      hours: null,
      minutes: null,
      seconds: null,
      graceMinutesLeft: 0,
    };
  }

  return { label, color, timeToSession };
}
