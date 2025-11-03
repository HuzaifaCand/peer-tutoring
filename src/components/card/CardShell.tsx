export function CardShell({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl bg-elevatedBg/80 border border-white/5 shadow-sm
                 hover:shadow-md hover:border-white/10 hover:bg-hoverBg/70
                 transition-all duration-150 cursor-pointer active:scale-[0.98] active:bg-hoverBg p-5 text-sm"
    >
      {children}
    </div>
  );
}
