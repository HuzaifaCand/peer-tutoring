interface BadgeProps {
  value: string;
  styles?: string;
  title?: string;
}

function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1);
}

export function Badge({ value, styles, title }: BadgeProps) {
  const capitalizedValue = capitalize(value);
  const formattedValue = value.includes("-")
    ? capitalizedValue.split("-")[0] +
      " " +
      capitalize(capitalizedValue.split("-")[1])
    : capitalizedValue;
  return (
    <span
      title={title}
      className={`inline-flex items-center justify-center px-2 py-[2px] mt-0.5 rounded-md 
                  text-[10px] font-medium leading-none ${styles}`}
    >
      {formattedValue}
    </span>
  );
}
