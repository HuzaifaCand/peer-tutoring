import { Loader2 } from "lucide-react";
import { SlotWithTimestamp } from "./computeSlotTimestamps";
import clsx from "clsx";
import { formatHour } from "../../../onboarding/AvailableSlots";
import { MessageField } from "../MessageField";
import { ConfirmButton } from "../ConfirmButton";

interface FormUIProps {
  loading: boolean;
  submit: {
    handleSubmit: () => void;
    submitting: boolean;
  };
  slots: {
    computedSlots: SlotWithTimestamp[];
    selectedSlotId: string | null;
    setSelectedSlotId: (s: string | null) => void;
  };
  errors: {
    slotError: string | null;
    setSlotError: (e: string | null) => void;
  };
  msg: {
    message: string;
    setMessage: (m: string) => void;
  };
}
export function OnsiteFormUI({
  loading,
  slots,
  errors,
  msg,
  submit,
}: FormUIProps) {
  const { computedSlots, selectedSlotId, setSelectedSlotId } = slots;
  const { slotError, setSlotError } = errors;

  return (
    <div className="space-y-4 text-textWhite pb-4 pt-2 w-full px-2">
      <div className="space-y-1">
        <h2 className="text-md sm:text-lg font-semibold">Available Slots</h2>
        <p className="text-textMuted text-xs">Click on a slot to select it.</p>
      </div>

      {loading && (
        <div className="flex justify-center h-20 items-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}

      {!loading && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {computedSlots.map((slot) => {
            const isSelected = slot.id === selectedSlotId;
            return (
              <li
                key={slot.id}
                onClick={() => {
                  setSelectedSlotId(slot.id);
                  setSlotError(null);
                }}
                className={clsx(
                  "border rounded-lg p-3 cursor-pointer transition flex justify-between items-center border-white/10",
                  isSelected
                    ? "bg-elevatedBg"
                    : "bg-mainBg text-textMuted/70 hover:text-textWhite hover:bg-hoverBg"
                )}
              >
                <span className="font-medium">
                  {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}
                </span>
                <span>
                  {formatHour(slot.hour)} •{" "}
                  {slot.next_time
                    ? new Date(slot.next_time).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {slotError && <p className="text-red-400 text-xs">{slotError}</p>}

      {/* MESSAGE FIELD */}
      <MessageField msg={msg} />

      <ConfirmButton
        disabled={loading || submit.submitting}
        handleSubmit={submit.handleSubmit}
      />
    </div>
  );
}
