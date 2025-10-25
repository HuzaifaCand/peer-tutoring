import { Loader2 } from "lucide-react";

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
    <div className="bg-elevatedBg border border-white/10 rounded-xl p-6 flex flex-col items-start justify-between">
      <p className="text-sm text-textWhite/60">{label}</p>
      <h2 className="text-3xl font-semibold mt-2">
        {" "}
        {loading ? (
          <Loader2 className="animate-spin w-6 h-6 text-textSecondary" />
        ) : (
          count.toLocaleString()
        )}
      </h2>
    </div>
  );
}
