import { RefreshCcw } from "lucide-react";
import { refetchFlagType } from "./table/types";

interface RefreshProps {
  loading: boolean;
  refetch: refetchFlagType;
}

export default function DataRefresh({ loading, refetch }: RefreshProps) {
  const handleRefresh = () => {
    if (!loading) refetch((prev: boolean) => !prev);
  };
  return (
    <button
      onClick={handleRefresh}
      title="Refresh data"
      disabled={loading}
      className={`p-2 rounded-md transition active:scale-95 flex-shrink-0 ${
        loading
          ? "bg-elevatedBg/30 cursor-not-allowed opacity-60"
          : "bg-elevatedBg/50 hover:bg-elevatedBg text-textWhite/90 hover:text-textButton"
      }`}
    >
      <RefreshCcw
        className={`w-4 h-4 ${loading ? "animate-spin text-textWhite/70" : ""}`}
      />
    </button>
  );
}
