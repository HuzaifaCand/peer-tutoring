import { colors, Tag } from "@/components/ui/Tag";

export function SubjectHeader({
  name,
  color,
  code,
  grade,
  profile = false,
}: {
  name: string;
  color: string;
  code: string;
  grade: string;
  profile?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <h3
        className={`${
          profile ? "text-lg" : "text-xl"
        } text-white leading-tight font-semibold`}
      >
        {name}
      </h3>

      <div className="flex items-center gap-1">
        <Tag
          value={grade}
          color="muted"
          textSize="text-[10px] sm:text-[12px]"
        />
        <Tag
          value={code}
          color={color as colors}
          textSize="text-[10px] sm:text-[12px]"
        />
      </div>
    </div>
  );
}
