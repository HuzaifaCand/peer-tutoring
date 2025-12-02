import { Tag } from "@/components/ui/Tag";

export function HeaderTags({
  subject,
  mode,
  is_online,
}: {
  subject: string;
  mode: string;
  is_online: boolean;
}) {
  return (
    <header className="flex items-center gap-2 mb-5 pt-3.5 sm:pt-0 pb-1">
      <Tag value={subject} color="gray" font="font-medium" />
      <Tag
        value={mode}
        color={is_online ? "blue" : "yellow"}
        font="font-medium"
      />
    </header>
  );
}
