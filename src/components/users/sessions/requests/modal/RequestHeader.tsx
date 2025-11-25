import { UnifiedRequest } from "../getSessionRequests";
import { colors, Tag } from "@/components/ui/Tag";

export function RequestHeader({
  req,
  role,
}: {
  req: UnifiedRequest;
  role: "tutor" | "student";
}) {
  // if tutor is viewing → show student
  // if student is viewing → show tutor
  const name = role === "tutor" ? req.studentName : req.tutorName;
  const about = role === "tutor" ? req.studentAbout : req.tutorAbout;

  return (
    <div className="space-y-4 pb-3 border-b border-white/10">
      {/* SUBJECT + TYPE TAGS */}
      <div className="flex items-center gap-2">
        <Tag value={req.subjects.label} color={req.subjects.color as colors} />
        <Tag
          value={req.type}
          color={req.type === "online" ? "blue" : "yellow"}
        />
      </div>

      {/* FULL NAME */}
      <div className="flex flex-col">
        <p className="text-textWhite text-base font-semibold">
          <span className="text-textMuted">
            {role === "tutor" ? "Student: " : "Tutor: "}
          </span>
          {name.split(" ").slice(0, -1).join(" ")}
        </p>
      </div>

      {/* ABOUT (SHORTENED) */}
      {about && (
        <p className="text-sm text-textMuted/90 line-clamp-3">{about}</p>
      )}
    </div>
  );
}
