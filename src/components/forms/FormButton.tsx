import {
  Check,
  CheckCircle,
  CheckCircle2,
  Trash2,
  XCircle,
} from "lucide-react";
import { getButtonClass } from "./classes";
import clsx from "clsx";

export function FormButton({
  size,
  handleClick,
  disabled,
  text,
  type = "button",
  style = "accept",
}: {
  size: "sm" | "xs";
  handleClick?: () => void;
  disabled?: boolean;
  text: string;
  type?: "button" | "submit";
  style?: "accept" | "reject" | "delete";
}) {
  let icon: React.ReactNode = null;
  switch (style) {
    case "accept":
      icon = <CheckCircle2 className="w-3 h-3" />;
      break;
    case "reject":
      icon = <XCircle className="w-3 h-3" />;
      break;
    case "delete":
      icon = <Trash2 className="w-3 h-3" />;
      break;
  }
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
      {icon}
      {text}
    </button>
  );
}
