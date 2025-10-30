import TextLoader from "../TextLoader";

export default function CountCard({
  label,
  count,
  loading,
}: {
  label: string;
  count: number;
  loading?: boolean;
}) {
  return (
    <div className="bg-elevatedBg rounded-xl p-4 sm:p-6 flex flex-col items-start justify-between">
      <p className="text-sm text-textMuted">{label}</p>
      <div className="mt-1 sm:mt-2 h-[32px] flex items-center">
        {loading ? (
          <TextLoader width="w-16" height="h-7" />
        ) : (
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {count.toLocaleString()}
          </h2>
        )}
      </div>
    </div>
  );
}
