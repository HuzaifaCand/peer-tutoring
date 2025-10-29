interface BadgeProps {
  value: string;
  styles?: string;
  title?: string;
}

export default function Badge({ value, styles, title }: BadgeProps) {
  return (
    <span
      title={title}
      className={`inline-flex items-center justify-center px-2 py-[2px] mt-0.5 rounded-md 
                  text-[10px] font-medium leading-none ${styles}`}
    >
      {value}
    </span>
  );
}
