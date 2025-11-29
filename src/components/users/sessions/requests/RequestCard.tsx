import { CardShell } from "@/components/card/CardShell";
import { UnifiedRequest } from "./getSessionRequests";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import { HeaderTags } from "@/components/modal/session/SessionHeaderTags";
import { HeaderLeft, tagTextSize } from "../sharedUI";
import { formatUnderscored } from "@/components/admin/edit-requests/getEditRequests";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatTime(time: string | null | undefined) {
  if (!time) return null;
  const [h, m] = time.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m} ${ampm}`;
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
    const date = formatDate(req.scheduled_for!);
    const time = formatTime(
      new Date(req.scheduled_for!).toISOString().split("T")[1]?.slice(0, 5)
    );
    requestTime = `Requested for ${date}${time ? " at " + time : ""}`;
  } else {
    const date = formatDate(req.suggested_date!);
    const time = formatTime(req.suggested_time);
    requestTime = `Requested for ${date}${time ? ", around " + time : ""}`;
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
        {req.message && (
          <p className="text-textMuted text-[10px] sm:text-[11px]">
            {role === "tutor" ? "Student message" : "Your message"}:{" "}
            {req.message}
          </p>
        )}
      </div>
      <div className="bg-textMuted/10 w-full h-[1px] my-4" />

      <div className="flex justify-between items-center gap-2">
        <p className="text-textMuted text-[10px] sm:text-[11px]">
          {requestTime}
        </p>

        <CardCTA
          cta="View Details"
          textSize="text-[10px] sm:text-xs"
          padding="px-2 sm:px-3 py-0.5 sm:py-1"
        />
      </div>
    </CardShell>
  );
}
