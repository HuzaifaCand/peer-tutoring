interface InfoCardProps {
  item: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: React.ReactNode;
    label: string;
  };
}

export function InfoCard({ item }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center bg-white/5 rounded-lg py-3 px-2 border border-white/5">
      <item.icon className="w-4 h-4 text-textMuted mb-1.5" />
      <span className="text-[13px] font-semibold text-textWhite">
        {item.value}
      </span>
      <span className="text-[11px] text-textMuted mt-0.5">{item.label}</span>
    </div>
  );
}
