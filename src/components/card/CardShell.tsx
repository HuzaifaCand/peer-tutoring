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
        "rounded-xl bg-elevatedBg border border-white/5 transition-all duration-150 shadow-sm",
        clickable === true
          ? "hover:border-white/10 hover:bg-hoverBg/70 cursor-pointer active:scale-[0.98] active:bg-hoverBg"
          : "hover:bg-hoverBg/60",
        "p-5 text-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
