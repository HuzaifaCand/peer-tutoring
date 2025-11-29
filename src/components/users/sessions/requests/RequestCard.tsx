import { CardShell } from "@/components/card/CardShell";
import { UnifiedRequest } from "./getSessionRequests";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import { HeaderLeft, tagTextSize } from "../sharedUI";
import { formatUnderscored } from "@/components/admin/edit-requests/getEditRequests";
import { parseISO } from "date-fns";
import { format } from "date-fns";

// For onsite request
function formatDateTime(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  const d = parseISO(dateStr);
  const date = format(d, "EEE, d MMM");
  const time = format(d, "h:mm a");
  return `${date} at ${time}`;
}

// For suggested online time (HH:mm)
function formatPlainTime(time: string | null | undefined) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const hours12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hours12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

// For suggested date (online)
function formatSimpleDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  const d = parseISO(dateStr);
  return format(d, "EEE, d MMM");
}

export function RequestCard({
  role,
  req,
  handleOpen,
}: {
  role: "tutor" | "student";
  req: UnifiedRequest;
  handleOpen: (r: UnifiedRequest) => void;
}) {
  const isOnsite = req.type === "onsite";

  const name =
    role === "tutor"
      ? `Student: ${req.studentName.split(" ").slice(0, -1).join(" ")}`
      : `Tutor: ${req.tutorName.split(" ").slice(0, -1).join(" ")}`;

  let requestTime = "";
  if (isOnsite) {
    const dateTime = formatDateTime(req.scheduled_for);
    requestTime = dateTime;
  } else {
    const date = formatSimpleDate(req.suggested_date);
    const time = formatPlainTime(req.suggested_time);
    requestTime = `${date}${time ? ", around " + time : ""}`;
  }

  return (
    <CardShell onClick={() => handleOpen(req)} className="space-y-5 mb-3">
      <div className="flex justify-between items-center">
        <HeaderLeft sub={req.subjects.label} isOnline={!isOnsite} />

        {/* Tag */}
        <Tag
          value={formatUnderscored(req.status)}
          color={
            req.status === "pending"
              ? "gray"
              : req.status === "accepted"
              ? "green"
              : "red"
          }
          textSize={tagTextSize}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-textWhite font-semibold text-sm sm:text-base">
          {name}
        </h3>
        {req.rejectionReason && (
          <p className="text-textMuted text-[10px] sm:text-[11px]">
            Rejection reason: {req.rejectionReason}
          </p>
        )}
        {req.rejectionReason === null && (
          <p className="text-textMuted text-[10px] sm:text-[11px]">
            {role === "tutor" ? "Student message" : "Your message"}:{" "}
            {req.message ?? "No message"}
          </p>
        )}
      </div>
      <div className="bg-textMuted/10 w-full h-[1px] my-4" />

      <div className="flex justify-between items-center gap-2">
        <span className="flex flex-col [@media(min-width:400px)]:flex-row [@media(min-width:400px)]:gap-1 text-textMuted text-[10px] sm:text-[11px]">
          Requested for <span className="text-textWhite/80">{requestTime}</span>
        </span>

        <CardCTA
          cta="View Details"
          textSize="text-[10px] sm:text-xs"
          padding="px-2 sm:px-3 py-0.5 sm:py-1"
        />
      </div>
    </CardShell>
  );
}
