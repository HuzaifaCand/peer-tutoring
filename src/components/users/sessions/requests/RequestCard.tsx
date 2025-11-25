import { CardShell } from "@/components/card/CardShell";
import { UnifiedRequest } from "./getSessionRequests";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";

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
      ? `Requested by ${req.studentName.split(" ").slice(0, -1).join(" ")}`
      : `Tutor -- ${req.tutorName.split(" ").slice(0, -1).join(" ")}`;

  let subtitle = "";
  if (isOnsite) {
    const date = formatDate(req.scheduled_for!);
    const time = formatTime(
      new Date(req.scheduled_for!).toISOString().split("T")[1]?.slice(0, 5)
    );
    subtitle = `Requested for ${date}${time ? " at " + time : ""}`;
  } else {
    const date = formatDate(req.suggested_date!);
    const time = formatTime(req.suggested_time);
    subtitle = `Requested for ${date}${time ? ", around " + time : ""}`;
  }

  return (
    <CardShell onClick={() => handleOpen(req)} className="space-y-2 mb-3">
      <div className="flex justify-between items-center">
        {/* Subject */}
        <h3 className="text-textWhite font-semibold text-sm sm:text-base">
          {req.subjects.label}
        </h3>

        {/* Tag */}
        <div className="flex items-center gap-1">
          <Tag
            value={req.status}
            color={
              req.status === "pending"
                ? "gray"
                : req.status === "rejected"
                ? "red"
                : "green"
            }
            textSize="text-[11px]"
            className="shrink-0"
          />
          <Tag
            value={isOnsite ? "onsite" : "online"}
            color={isOnsite ? "yellow" : "blue"}
            textSize="text-[11px]"
            className="shrink-0"
          />
        </div>
      </div>

      <p className="text-textMuted text-xs">{name}</p>

      <div className="bg-textMuted/10 w-full h-[1px] my-4" />

      <div className="flex justify-between items-center gap-2">
        <p className="text-textMuted text-xs">{subtitle}</p>

        <CardCTA cta="View Details" textSize="text-xs" />
      </div>
    </CardShell>
  );
}
