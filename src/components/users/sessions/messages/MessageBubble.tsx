import clsx from "clsx";

export function MessageBubble({
  text,
  mine,
  createdAt,
}: {
  text: string;
  mine: boolean;
  createdAt: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-[75%] px-3 py-2 rounded-xl text-[11px] sm:text-xs mb-2",
        mine
          ? "bg-blue-600 text-white self-end"
          : "bg-elevatedBg text-textWhite self-start"
      )}
    >
      <p>{text}</p>
      <p className="text-[10px] text-textMuted mt-1 text-right">
        {new Date(createdAt).toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
}
