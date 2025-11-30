"use client";

import { UnifiedRequest } from "../getSessionRequests";
import { Tag } from "@/components/ui/Tag";
import { format, parseISO } from "date-fns";

// Format "requested_on" → simple + 12-hour time
function formatRequestedOn(dateStr: string) {
  const d = parseISO(dateStr);
  return format(d, "d MMM, h:mm a");
}

// Full date for booked/suggested slot
function formatFullDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const d = parseISO(dateStr);
  return format(d, "EEEE, d MMMM"); // Friday, 15 December 2025
}

// Time for booked/suggested slot
function formatTimeLocal(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  const d = parseISO(dateStr);
  return format(d, "h:mm a"); // 3:00 PM
}

// For HH:mm strings (online suggested time)
function formatPlainTime(time: string | null | undefined) {
  if (!time) return "Not specified";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour12}:${m} ${ampm}`;
}

export function RequestMeta({
  req,
  role,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
}) {
  const createdAt = formatRequestedOn(req.created_at);

  const statusColor =
    req.status === "pending"
      ? "gray"
      : req.status === "accepted"
      ? "green"
      : "red";

  return (
    <div className="space-y-4">
      {/* STATUS */}
      <div className="flex items-center gap-1 ">
        <Tag value={req.status} color={statusColor} />
        <Tag
          value={req.type}
          color={req.type === "online" ? "blue" : "yellow"}
        />
      </div>

      {/* TIME INFO BASED ON TYPE */}
      <div className="space-y-2">
        {req.type === "onsite" ? (
          <OnsiteMeta req={req} />
        ) : (
          <OnlineMeta req={req} role={role} />
        )}

        {req.rejectionReason && (
          <p className="text-textMuted text-xs sm:text-sm">
            Rejection reason: {req.rejectionReason}
          </p>
        )}

        {req.message && req.rejectionReason === null && (
          <p className="text-textMuted text-xs sm:text-sm">
            {role === "tutor" ? "Student message" : "Your message"}:{" "}
            {req.message}
          </p>
        )}
      </div>

      {/* CREATED AT */}
      <div className="flex justify-end">
        <p className="text-xs text-textMuted ">
          Requested on <span className="text-textWhite">{createdAt}</span>
        </p>
      </div>
    </div>
  );
}

function OnsiteMeta({ req }: { req: UnifiedRequest }) {
  if (!req.scheduled_for) return null;

  const fullDate = formatFullDate(req.scheduled_for);
  const time = formatTimeLocal(req.scheduled_for);

  return (
    <p className="text-textWhite font-medium">
      {req.status === "accepted" ? "Scheduled For" : "Requested Time:"}{" "}
      {fullDate} at {time}{" "}
    </p>
  );
}

function OnlineMeta({
  req,
  role,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
}) {
  const fullDate = req.suggested_date
    ? formatFullDate(req.suggested_date)
    : "—";

  const time = formatPlainTime(req.suggested_time);

  return (
    <div className=" space-y-1">
      <p className="text-textWhite text-sm font-medium">
        {req.status === "accepted" ? "Scheduled For" : "Requested Time:"}{" "}
        {fullDate}
        {req.status === "pending" ? ", around" : " at"} {time}
      </p>
      {req.status === "pending" && (
        <p className="text-textMuted text-[10px] sm:text-[11px] italic">
          This time is tentative, you can discuss to finalize a mutual time in
          the messaging panel below and {role === "tutor" ? "you" : "the tutor"}{" "}
          can schedule the final agreed time.
        </p>
      )}
    </div>
  );
}
