import { UnifiedRequest } from "../getSessionRequests";
import { colors, Tag } from "@/components/ui/Tag";

export function RequestHeader({
  req,
  role,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
}) {
  const name = role === "tutor" ? req.studentName : req.tutorName;
  const about = role === "tutor" ? req.studentAbout : req.tutorAbout;

  return (
    <div className="space-y-4">
      {/* SUBJECT + TYPE TAGS */}
      <div className="flex items-center gap-1">
        <Tag value={req.subjects.label} color={req.subjects.color as colors} />
        <Tag value={`${req.studentGrade} Student`} color="gray" />
      </div>

      {/* FULL NAME */}
      <div className="space-y-1.5">
        <p className="text-textWhite text-base font-semibold">
          Requested by: {name.split(" ").slice(0, -1).join(" ")}
        </p>

        <p className="text-[11px] sm:text-xs font-light text-textMuted line-clamp-3">
          <span className="text-textWhite">About:</span> {about ?? "Not added"}
        </p>
      </div>
    </div>
  );
}
