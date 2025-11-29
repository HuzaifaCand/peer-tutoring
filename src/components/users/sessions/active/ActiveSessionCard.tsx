"use client";

import { CardShell } from "@/components/card/CardShell";
import { ActiveSessionType } from "./getActiveSessions";
import { HeaderLeft, tagTextSize } from "../sharedUI";
import { Tag } from "@/components/ui/Tag";
import { useElapsedTimer } from "./useElapsedTimer";
import { CardCTA } from "@/components/ui/CardCTA";
import { MeetingLinkEditable } from "./MeetingLinkInput";
import { CompleteSessionButton } from "./CompleteSessionButton";

export function ActiveSessionCard({
  as,
  userId,
  role,
  refetch,
}: {
  as: ActiveSessionType;
  userId: string;
  role: "tutor" | "student";
  refetch: () => void;
}) {
  const name = role === "tutor" ? as.sName : as.tName;

  // elapsed minutes since session started
  const elapsed = useElapsedTimer(as.startTime);

  // color logic for the timer tag
  const timerColor =
    elapsed.minutes <= 40
      ? "yellow"
      : elapsed.minutes >= 60
      ? "orange"
      : "green";
  return (
    <CardShell>
      <div className="space-y-4">
        {/* Header row */}
        <div className="flex justify-between gap-2 items-center">
          <HeaderLeft sub={as.subjectLabel} isOnline={as.isOnline} />

          <Tag
            value={`${elapsed.minutes}m ${elapsed.seconds
              .toString()
              .padStart(2, "0")}s`}
            color={timerColor}
            textSize={tagTextSize}
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <p className="text-textWhite text-sm sm:text-base font-medium">
            {role === "tutor" ? "Student: " : "Tutor: "} {name}
          </p>

          <div className="flex justify-between items-center gap-3">
            {/* Start Time */}
            <p className="text-[10px] sm:text-[11px] mt-1.5 text-textMuted">
              Started at:{" "}
              <span className="text-textWhite/80 whitespace-nowrap">
                {new Date(as.startTime ?? "").toLocaleString("en-GB", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            {role === "tutor" && as.isOnline && (
              <MeetingLinkEditable
                initialLink={as.meetingLink}
                sessionId={as.id}
                refetch={refetch}
              />
            )}
          </div>
        </div>

        {(role === "tutor" || as.isOnline) && (
          <hr className="h-[1px] text-textMuted/10 w-full my-4" />
        )}

        <div className="flex justify-between items-center">
          {role === "tutor" ? (
            <CompleteSessionButton
              sessionId={as.id}
              refetch={refetch}
              tutorId={userId}
            />
          ) : (
            <div></div>
          )}

          {as.isOnline && (
            <div className="flex justify-end">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={as.meetingLink ?? "#"}
              >
                <CardCTA cta="Join Meeting" />
              </a>
            </div>
          )}
        </div>
      </div>
    </CardShell>
  );
}
