export default function CountCard({
  label,
  count,
  loading,
}: {
  label: string;
  count: number;
  loading: boolean;
}) {
  return (
    <div className="bg-elevatedBg rounded-xl p-6 flex flex-col items-start justify-between">
      <p className="text-sm text-textMuted">{label}</p>
      <div className="mt-2 h-[32px] flex items-center">
        {loading ? (
          <div className="w-16 h-7 rounded-md bg-white/10 animate-pulse" />
        ) : (
          <h2 className="text-3xl font-semibold">{count.toLocaleString()}</h2>
        )}
      </div>
    </div>
  );
}
