"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CardUI = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  cta: string;
  href: string;
};

interface Props {
  info: CardUI;
  count: number;
  loading: boolean;
}

export default function StatCard({ info, count, loading }: Props) {
  return (
    <Link
      href={info.href}
      className="group relative flex flex-col justify-between bg-elevatedBg rounded-lg p-6 hover:bg-hoverBg/80 transition-colors duration-200"
    >
      {/* Accent bar */}

      <div className="absolute top-0.25  left-0 w-full h-2 bg-hoverBg rounded-t-xl" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-textMuted tracking-wide">
          {info.label}
        </span>

        <div className="p-2 rounded-full  border border-white/5">
          <info.icon className="w-6 h-6 text-textWhite" />
        </div>
      </div>

      {/* Count */}
      <div className="mt-2 mb-6 text-3xl font-semibold text-textWhite tracking-tight leading-none">
        {loading ? (
          <div className="w-16 h-9 rounded-md bg-white/10 animate-pulse" />
        ) : (
          count.toLocaleString()
        )}
      </div>

      {/* Footer (CTA) */}
      <div className="flex justify-end">
        <span className="text-xs flex items-center gap-1 text-textButton border border-white/10 rounded-md px-3 py-1.5 group-hover:bg-hoverBg transition-all">
          {info.cta}{" "}
          <span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </span>
      </div>
    </Link>
  );
}
