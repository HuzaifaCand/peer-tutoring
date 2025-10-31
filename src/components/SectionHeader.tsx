export default function SectionHeader({
  title,
  rightSlot,
}: {
  title: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="pb-4 border-b border-textWhite/10 flex text-textWhite flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-end mb-8">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {rightSlot && (
        <div className="text-xs md:text-sm text-textMuted">{rightSlot}</div>
      )}
    </div>
  );
}
