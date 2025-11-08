import clsx from "clsx";

interface ConfirmationModalProps {
  type: "positive" | "destructive";
  title: string;
  confirmText?: string;

  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export function ConfirmationModal({
  type,
  title,
  confirmText = "Confirm",
  description,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="space-y-4 py-1">
      <div className="space-y-2">
        <h2 className="text-textWhite font-semibold text-lg">{title}</h2>
        {description && (
          <p className="text-textMuted/80 font-medium text-xs sm:text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="flex justify-end items-center gap-2 ">
        <button
          onClick={onCancel}
          className="px-4 py-1.5 bg-elevatedBg hover:cursor-pointer text-textWhite/90 hover:bg-hoverBg transition-colors duration-200 focus:outline-none focus:bg-hoverBg focus:ring-2 focus:ring-white/10 border border-white/5 rounded-lg font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={clsx(
            "px-4 py-1.5 rounded-lg font-semibold border hover:cursor-pointer transition-colors focus:outline-none focus:ring-2 duration-200",
            type === "positive"
              ? "bg-green-300/10 border-green-100/10 hover:bg-green-400/30 text-green-400 focus:ring-green-400/40 focus:bg-green-400/30"
              : "bg-red-300/10 border-red-100/10 hover:bg-red-400/30 text-red-400 focus:ring-red-400/40 focus:bg-red-400/30"
          )}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
