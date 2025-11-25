"use client";

import { UnifiedRequest } from "../getSessionRequests";
import { Tag } from "@/components/ui/Tag";

export function RequestMeta({ req }: { req: UnifiedRequest }) {
  const createdAt = new Date(req.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusColor =
    req.status === "pending"
      ? "yellow"
      : req.status === "accepted"
      ? "green"
      : "red";

  return (
    <div className="space-y-3 py-3">
      {/* STATUS */}
      <div className="flex items-center gap-2">
        <Tag value={req.status} color={statusColor} />
      </div>

      {/* TIME INFO BASED ON TYPE */}
      {req.type === "onsite" ? (
        <OnsiteMeta req={req} />
      ) : (
        <OnlineMeta req={req} />
      )}

      {/* CREATED AT */}
      <p className="text-xs text-textMuted">Requested on {createdAt}</p>
    </div>
  );
}

function OnsiteMeta({ req }: { req: UnifiedRequest }) {
  if (!req.scheduled_for) return null;

  const d = new Date(req.scheduled_for);
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="text-sm">
      <p className="text-textWhite font-medium">Requested Slot</p>
      <p className="text-textMuted">
        {date} at {time}
      </p>
    </div>
  );
}

function OnlineMeta({ req }: { req: UnifiedRequest }) {
  const d = req.suggested_date ? new Date(req.suggested_date) : null;

  const date = d
    ? d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      })
    : "—";

  let formattedTime = "Not specified";

  if (req.suggested_time) {
    const [h, m] = req.suggested_time.split(":");
    const hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    formattedTime = `${displayHour}:${m} ${ampm}`;
  }

  return (
    <div className="text-sm">
      <p className="text-textWhite font-medium">Suggested Time</p>
      <p className="text-textMuted">
        {date}, {formattedTime}
      </p>
    </div>
  );
}
