import { ListX } from "lucide-react";

export function EmptyTableBody({
  colSpan,
  text = "No results found",
}: {
  colSpan: number;
  text?: string;
}) {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="h-60">
          <div className="flex flex-col items-center justify-center gap-2 text-textMuted bg-mainBg border border-elevatedBg/70 rounded-md h-full">
            <ListX className="w-10 h-10 sm:w-12 sm:h-12 opacity-70" />
            <p className="text-xs sm:text-sm font-medium text-textMuted">
              {text}
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
