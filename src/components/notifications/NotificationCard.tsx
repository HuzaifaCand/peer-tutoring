"use client";

import { Notification } from "@/lib/computedtypes";
import { CardShell } from "../card/CardShell";
import { Tag } from "../ui/Tag";
import { formatEditType } from "../admin/edit-requests/getEditRequests";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export function NotificationCard({ n }: { n: Notification }) {
  const content = (
    <CardShell
      className={clsx(
        "relative mb-4",
        n.href && "cursor-pointer hover:bg-hoverBg/60 transition duration-200"
      )}
    >
      <div className="flex flex-col gap-4 p-0 sm:p-1">
        {/* Header */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-yellow flex-shrink-0" />
            )}
            <h2 className="text-textWhite font-semibold text-lg sm:text-xl">
              {n.title}
            </h2>
          </div>

          <Tag
            value={formatEditType(n.type ?? "")}
            color="gray"
            textSize="text-[10px] sm:text-[12px]"
            className="px-1 sm:px-3 py-1"
          />
        </div>

        <div className="bg-hoverBg w-full h-[1px]" />

        {/* Body */}

        {/* Time */}
        <div className="flex justify-between items-end gap-16">
          <p className="text-textMuted text-xs sm:text-sm max-w-xl">{n.body}</p>

          <p className="text-[10px] sm:text-xs text-textMuted whitespace-nowrap">
            {formatDistanceToNow(new Date(n.created_at), {})} ago
          </p>
        </div>
      </div>
    </CardShell>
  );

  if (n.href) {
    return <Link href={n.href}>{content}</Link>;
  }

  return <div>{content}</div>;
}
