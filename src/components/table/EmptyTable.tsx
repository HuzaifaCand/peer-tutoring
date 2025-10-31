import { ListX } from "lucide-react";

export function EmptyTableBody({ colSpan }: { colSpan: number }) {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} className="h-60">
          <div className="flex flex-col items-center justify-center gap-2 text-textMuted bg-mainBg border border-elevatedBg/70 rounded-md h-full">
            <ListX className="w-12 h-12 opacity-70" />
            <p className="text-sm font-medium text-textMuted">
              No results found
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
