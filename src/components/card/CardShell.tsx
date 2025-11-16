import clsx from "clsx";

export function CardShell({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const clickable = onClick !== undefined;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl bg-elevatedBg border border-white/5 transition-all duration-200 shadow-sm",
        clickable === true
          ? "hover:bg-hoverBg cursor-pointer active:scale-[0.99] active:bg-hoverBg"
          : "hover:bg-hoverBg/60",
        "p-5 text-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
