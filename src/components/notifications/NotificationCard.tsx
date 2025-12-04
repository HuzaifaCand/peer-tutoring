import { Notification } from "@/lib/computedtypes";
import { CardShell } from "../card/CardShell";
import { Tag } from "../ui/Tag";
import { formatUnderscored } from "../admin/edit-requests/getEditRequests";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { CardCTA } from "../ui/CardCTA";

export function NotificationCard({ n }: { n: Notification }) {
  const content = (
    <CardShell
      className={clsx(
        "relative mb-4",
        n.read && "bg-elevatedBg/40 hover:bg-hoverBg",
        n.href && "cursor-pointer hover:bg-hoverBg/60 transition duration-200"
      )}
    >
      <div className="flex flex-col gap-3 p-0 sm:p-1">
        {/* Header */}
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className={clsx(
                "text-textWhite text-sm sm:text-lg font-semibold"
              )}
            >
              {n.title}
            </h2>
            <p className="text-textMuted text-[10px] sm:text-xs max-w-xl">
              {n.body}
            </p>
          </div>
          {!n.read && (
            <div className="absolute top-8 right-8 w-2 h-2 bg-yellow rounded-full" />
          )}
        </div>

        <div className="bg-white/5 my-1 w-full h-[1px]" />

        <div className="flex justify-between items-center gap-8">
          <p className="text-[10px] sm:text-xs text-textMuted whitespace-nowrap">
            {formatDistanceToNow(new Date(n.created_at), {})} ago
          </p>
          {n.href && <CardCTA cta={"View"} textSize="text-xs sm:text-sm" />}
        </div>
      </div>
    </CardShell>
  );

  if (n.href) {
    return <Link href={n.href}>{content}</Link>;
  }

  return <div>{content}</div>;
}
