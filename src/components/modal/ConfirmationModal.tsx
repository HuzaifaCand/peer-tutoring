import clsx from "clsx";
import ModalBase from "./ModalBase";
import { useState } from "react";

interface ConfirmationModalProps {
  type: "positive" | "destructive";
  title: string;
  confirmText?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isOpen: boolean;

  inputConfig?: {
    inputLabel: string;
    inputValue: string;
    onInputChange: (v: string) => void;
    inputRequired: boolean;
  };
}

export function ConfirmationModal({
  isOpen,
  type,
  title,
  confirmText = "Confirm",
  description,
  onConfirm,
  onCancel,
  inputConfig,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

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

        {inputConfig && (
          <div className="space-y-1">
            <label className="text-textWhite/90 text-sm font-medium">
              {inputConfig.inputLabel}
            </label>

            <textarea
              value={inputConfig.inputValue}
              onChange={(e) => inputConfig.onInputChange(e.target.value)}
              className="w-full bg-elevatedBg border border-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm text-textWhite resize-none"
              rows={4}
            />

            {inputConfig.inputRequired && !inputConfig.inputValue && (
              <p className="text-xs text-red-300 mt-1">
                This field is required.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end text-sm items-center gap-2">
          <button
            disabled={loading}
            onClick={onCancel}
            className="px-4 py-1.5 bg-elevatedBg text-textWhite/90 hover:bg-hoverBg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-white/5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/10"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleConfirm}
            className={clsx(
              "px-4 py-1.5 rounded-lg cursor-pointer font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2",

              type === "positive"
                ? "bg-green-500/10 text-green-300 hover:bg-green-500/20 focus:ring-green-400/20"
                : "bg-red-500/10 text-red-300 hover:bg-red-500/20 focus:ring-red-400/20"
            )}
          >
            {loading && (
              <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </ModalBase>
  );
}
