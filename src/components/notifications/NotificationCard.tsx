import { Notification } from "@/lib/computedtypes";
import { CardShell } from "../card/CardShell";
import { Tag } from "../ui/Tag";
import { formatEditType } from "../admin/edit-requests/getEditRequests";

export function NotificationCard({ n }: { n: Notification }) {
  return (
    <CardShell>
      <div className="flex flex-col gap-4 p-0 sm:p-1">
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-textWhite font-semibold text-lg sm:text-xl">
            {n.title}
          </h2>
          <Tag
            value={formatEditType(n.type ?? "")}
            color="gray"
            textSize="text-[10px] sm:text-[12px]"
            className="px-1 sm:px-3 py-1"
          />
        </div>
        <div className="bg-hoverBg w-full h-[1px]" />
        <p className="text-textMuted text-xs sm:text-sm">{n.body}</p>
      </div>
    </CardShell>
  );
}
