export default function SectionHeader({
  title,
  otherText,
}: {
  title: string;
  otherText: string;
}) {
  return (
    <div className="pb-4 border-b border-textWhite/10 flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-end">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-xs text-textMuted">{otherText}</p>
    </div>
  );
}
