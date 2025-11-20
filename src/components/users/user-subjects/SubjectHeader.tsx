import { colors, Tag } from "@/components/ui/Tag";

export function SubjectHeader({
  name,
  color,
  code,
  grade,
}: {
  name: string;
  color: string;
  code: string;
  grade: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3 className={`text-xl  font-semibold text-white leading-tight`}>
        {name}
      </h3>

      <div className="flex items-center gap-1">
        <Tag value={grade} color="muted" textSize="text-[12px]" />
        <Tag value={code} color={color as colors} textSize="text-[12px]" />
      </div>
    </div>
  );
}
