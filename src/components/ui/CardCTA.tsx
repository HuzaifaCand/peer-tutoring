import clsx from "clsx";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  cta: string;
  padding?: string;
}
export function CardCTA({ cta, padding = "py-1 px-3" }: CTAProps) {
  return (
    <span
      className={clsx(
        "text-xs flex items-center gap-1 text-textButton border border-white/10 rounded-md  group-hover:bg-hoverBg transition-all",
        padding
      )}
    >
      {cta}{" "}
      <span>
        <ArrowRight className="w-3 h-3" />
      </span>
    </span>
  );
}
