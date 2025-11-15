import clsx from "clsx";
import { Loader2 } from "lucide-react";

export default function Loading({ bg }: { bg: string }) {
  return (
    <div className={clsx("flex h-screen items-center justify-center", bg)}>
      <Loader2 className="w-6 h-6 text-textWhite/90 animate-spin" />
    </div>
  );
}
