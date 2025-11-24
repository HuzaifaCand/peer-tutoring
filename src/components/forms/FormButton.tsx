import { CheckCircle, Trash2 } from "lucide-react";
import { getButtonClass } from "./classes";
import clsx from "clsx";

export function FormButton({
  size,
  handleClick,
  disabled,
  text,
  del = false,
  type = "button",
}: {
  size: "sm" | "xs";
  handleClick?: () => void;
  disabled?: boolean;
  text: string;
  type?: "button" | "submit";
  del?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={clsx(
        getButtonClass(size),
        "flex items-center gap-1",
        disabled && "disabled:opacity-50"
      )}
    >
      {del ? (
        <Trash2 className="w-3 h-3" />
      ) : (
        <CheckCircle className="w-3 h-3" />
      )}
      {text}
    </button>
  );
}
