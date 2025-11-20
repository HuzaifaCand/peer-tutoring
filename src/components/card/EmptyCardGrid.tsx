import { ListX } from "lucide-react";

export function EmptyGrid({ text = "No results found" }: { text?: string }) {
  return (
    <div className="h-60 w-full">
      <div className="flex flex-col items-center justify-center gap-2 text-textMuted bg-mainBg border border-elevatedBg/70 rounded-md h-full">
        <ListX className="w-10 h-10 sm:w-12 sm:h-12 opacity-70" />
        <p className="text-xs sm:text-sm font-medium text-textMuted">{text}</p>
      </div>
    </div>
  );
}
