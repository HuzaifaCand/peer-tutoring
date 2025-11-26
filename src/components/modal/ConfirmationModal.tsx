import clsx from "clsx";
import ModalBase from "./ModalBase";
import { useState } from "react";
import { toast } from "sonner";
import { getInputClass, getLabelClass } from "../forms/classes";

interface ConfirmationModalProps {
  type: "positive" | "destructive";
  title: string;
  confirmText?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isOpen: boolean;
  successMessage?: string;

  inputConfig?: {
    inputLabel: string;
    inputValue: string;
    onInputChange: (v: string) => void;
    inputRequired: boolean;
    placeholder?: string;
    maxLength?: number;
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
  successMessage,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  const maxLength = inputConfig?.maxLength ?? 125;
  const valueLength = inputConfig?.inputValue.length ?? 0;
  const exceedsLimit = valueLength > maxLength;

  async function handleConfirm() {
    if (
      (inputConfig?.inputRequired && !inputConfig.inputValue.trim()) ||
      exceedsLimit
    ) {
      return;
    }

    try {
      setLoading(true);
      await onConfirm();
      if (successMessage) toast.success(successMessage);
    } catch (err) {
      console.error(err, "confirmation modal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onCancel}
      autoFocus={true}
      noX={true}
      width="tight"
    >
      <div className="space-y-4 py-2 px-0 sm:px-2 py-1">
        {/* Title + Description */}
        <div className="space-y-1">
          <h2 className="text-textWhite font-semibold text-lg sm:text-xl">
            {title}
          </h2>

          {description && (
            <p className="text-textMuted/80 font-medium text-xs sm:text-sm">
              {description}
            </p>
          )}
        </div>

        {/* Input Area */}
        {inputConfig && (
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <label className={getLabelClass("sm")}>
                {inputConfig.inputLabel}
              </label>

              {inputConfig.inputRequired && !inputConfig.inputValue && (
                <p className="text-[10px] text-red-400">
                  This field is required.
                </p>
              )}
            </div>

            <div className="relative">
              <textarea
                value={inputConfig.inputValue}
                onChange={(e) => inputConfig.onInputChange(e.target.value)}
                placeholder={inputConfig.placeholder}
                className={clsx(getInputClass("sm"), "pr-10")}
                rows={2}
                maxLength={undefined} // We enforce logic ourselves
              />

              {/* CHARACTER COUNTER */}
              <div
                className={clsx(
                  "absolute bottom-1 right-2 text-[10px] font-medium",
                  exceedsLimit ? "text-red-400" : "text-textMuted/70"
                )}
              >
                {valueLength} / {maxLength}
              </div>
            </div>

            {exceedsLimit && (
              <p className="text-[11px] text-red-400">
                Maximum {maxLength} characters allowed.
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end text-sm pt-2 items-center gap-2">
          <button
            disabled={loading}
            onClick={onCancel}
            className="w-full px-4 py-2 bg-elevatedBg text-textWhite/90 hover:bg-hoverBg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-white/5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/10"
          >
            Cancel
          </button>

          <button
            disabled={
              loading ||
              (inputConfig?.inputRequired && !inputConfig.inputValue.trim()) ||
              exceedsLimit
            }
            onClick={handleConfirm}
            className={clsx(
              "w-full px-4 py-2 rounded-lg cursor-pointer font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2",

              type === "positive"
                ? "bg-green-500/10 text-textWhite hover:bg-green-500/20 focus:ring-green-400/20 border border-green-800/30"
                : "bg-red-700/20 text-textWhite hover:bg-red-900/40 focus:ring-red-400/20 border border-red-800/30"
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
