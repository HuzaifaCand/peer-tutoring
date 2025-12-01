"use client";

import { getInputClass, getLabelClass } from "@/components/forms/classes";
import clsx from "clsx";
import { MessageField } from "../MessageField";
import { ConfirmButton } from "../ConfirmButton";

interface OnlineFormUIProps {
  fields: {
    suggestedDate: string;
    setSuggestedDate: (v: string) => void;

    suggestedTime: string;
    setSuggestedTime: (v: string) => void;

    message: string;
    setMessage: (v: string) => void;
  };
  handleSubmit: () => void;
  submitting: boolean;
}

export function OnlineFormUI({
  fields,
  handleSubmit,
  submitting,
}: OnlineFormUIProps) {
  const {
    suggestedDate,
    setSuggestedDate,
    suggestedTime,
    setSuggestedTime,
    message,
    setMessage,
  } = fields;

  return (
    <div className="space-y-4 text-textWhite pb-4 pt-2 w-full px-2">
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className={getLabelClass("sm")}>Select a Date</label>
            <input
              type="date"
              placeholder="Select a date..."
              value={suggestedDate}
              onChange={(e) => setSuggestedDate(e.target.value)}
              className={clsx(
                getInputClass("sm"),
                "mt-2",
                "[color-scheme:dark]"
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className={getLabelClass("sm")}>
              Suggest a Time (Optional)
            </label>
            <input
              type="time"
              placeholder="Enter a time..."
              value={suggestedTime}
              onChange={(e) => setSuggestedTime(e.target.value)}
              className={clsx(
                getInputClass("sm"),
                "mt-2",
                "[color-scheme:dark]"
              )}
            />
          </div>
        </div>

        <p className="text-[10px] sm:text-xs text-textMuted">
          This is just a suggested time. The tutor may accept it or propose a
          different time, and you can decide a time that works for both in the
          messaging panel.
        </p>
      </div>

      <MessageField msg={{ message, setMessage }} />
      <div className="flex justify-between items-center gap-2">
        <p className="text-[10px] sm:text-xs text-textMuted flex-1 pt-2">
          {suggestedDate
            ? (() => {
                const d = new Date(suggestedDate);
                const formattedDate = d.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                });

                if (!suggestedTime) {
                  return `Requesting a session for ${formattedDate}.`;
                }

                // format time → 4:00 PM
                const [h, m] = suggestedTime.split(":");
                const hour = Number(h);
                const ampm = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                const formattedTime = `${displayHour}:${m} ${ampm}`;

                return `Requesting a session for ${formattedDate}, around ${formattedTime}.`;
              })()
            : ""}
        </p>
        <ConfirmButton handleSubmit={handleSubmit} disabled={submitting} />
      </div>
    </div>
  );
}
