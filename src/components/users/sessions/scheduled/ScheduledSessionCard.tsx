"use client";

import { CardShell } from "@/components/card/CardShell";
import { Tag } from "@/components/ui/Tag";
import { ScheduledSessionsType } from "./getScheduledSessions";
import { ScheduledActions } from "./actions/ScheduledActions";
import { SharedPropsType } from "../SessionsMain";
import { useSessionCountdown } from "./useSessionCountdown";
import { formatSessionCountdown } from "./formatSessionCountdown";
import { HeaderLeft, tagTextSize } from "../sharedUI";
import clsx from "clsx";

export const formatted = (ts: string | null) =>
  ts &&
  new Date(ts).toLocaleString("en-GB", {
    day: "numeric",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export function ScheduledSessionCard({
  index,
  ss,
  refetch,
  sharedProps,
}: {
  index: number;
  ss: ScheduledSessionsType;
  refetch: () => void;
  sharedProps: SharedPropsType;
}) {
  const { role } = sharedProps;
  const name = role === "tutor" ? ss.sName : ss.tName;

  const countdown = useSessionCountdown(ss.scheduledFor);
  const {
    label: countdownLabel,
    color: countdownColor,
    timeToSession,
  } = formatSessionCountdown(countdown);

  return (
    <CardShell>
      <div className="space-y-5">
        {/* TAGS */}
        <div
          className={clsx(
            "flex items-start flex-col gap-2",
            timeToSession.mode !== "before"
              ? "[@media(min-width:430px)]:flex-row [@media(min-width:430px)]:justify-between [@media(min-width:430px)]:items-center"
              : "[@media(min-width:370px)]:flex-row [@media(min-width:370px)]:justify-between [@media(min-width:370px)]:items-center"
          )}
        >
          <HeaderLeft sub={ss.subjectLabel} isOnline={ss.isOnline} />
          <div className="flex items-center gap-2">
            {countdownLabel && (
              <Tag
                textSize={tagTextSize}
                color={index === 0 ? countdownColor : "gray"}
                value={countdownLabel}
              />
            )}
            <p className="text-[10px] sm:text-[11px] text-left text-textWhite/80">
              {formatted(ss.scheduledFor)}
            </p>
          </div>
        </div>

        {/* WHO + MESSAGE */}
        <div className="space-y-3">
          <p className="text-textWhite text-sm sm:text-lg font-medium">
            {role === "tutor" ? "Student: " : "Tutor: "} {name}
          </p>

          {ss.message && (
            <p className="text-[11px] sm:text-xs text-textMuted border-l-1 border-textMuted/30 pl-2">
              {role === "student" ? "Your message: " : "Student message: "}{" "}
              {ss.message}
            </p>
          )}

          <hr className="h-[1px] text-textMuted/10 w-full my-4" />

          <div className="flex justify-end">
            <ScheduledActions
              isOnline={ss.isOnline}
              sessionId={ss.id}
              timeToSession={timeToSession}
              sharedProps={sharedProps}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}
