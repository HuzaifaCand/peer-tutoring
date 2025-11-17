import clsx from "clsx";
import ModalBase from "./ModalBase";

interface ConfirmationModalProps {
  type: "positive" | "destructive";
  title: string;
  confirmText?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
}

export function ConfirmationModal({
  isOpen,
  type,
  title,
  confirmText = "Confirm",
  description,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <ModalBase isOpen={isOpen} onClose={onCancel} autoFocus={true} noX={true}>
      <div className="space-y-4 py-1">
        <div className="space-y-2">
          <h2 className="text-textWhite font-semibold text-lg sm:text-xl">
            {title}
          </h2>
          {description && (
            <p className="text-textMuted/80 font-medium text-xs sm:text-sm">
              {description}
            </p>
          )}
        </div>
        <div className="flex justify-end text-xs items-center gap-2 ">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 bg-elevatedBg hover:cursor-pointer text-textWhite/90 hover:bg-hoverBg transition-colors duration-200 focus:outline-none focus:bg-hoverBg focus:ring-2 focus:ring-white/10 border border-white/5 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={clsx(
              "px-4 py-1.5 rounded-lg cursor-pointer font-medium transition-colors focus:outline-none focus:ring-2 duration-200",
              type === "positive"
                ? "bg-green-500/10 text-green-300 hover:bg-green-500/20 focus:ring-green-400/20"
                : "bg-red-500/10 text-red-300 hover:bg-red-500/20 focus:ring-red-400/20"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalBase>
  );
}
