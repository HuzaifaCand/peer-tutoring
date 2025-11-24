"use client";

import { useState } from "react";
import { getInputClass, getLabelClass } from "@/components/forms/classes";
import clsx from "clsx";
import { MessageField } from "../MessageField";
import { ConfirmButton } from "../ConfirmButton";

interface OnlineFormProps {
  currStudentId: string;
  sharedLoad: {
    tutorId: string;
    subjectLabel: string;
    subjectId: string;
  };
  closeModal: () => void;
}

export function OnlineForm({
  sharedLoad,
  currStudentId,
  closeModal,
}: OnlineFormProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [suggestedDate, setSuggestedDate] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");

  const handleSubmit = () => {
    // TODO submit
  };

  return (
    <div className="space-y-4 text-textWhite pb-4 pt-2 w-full px-2">
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className={getLabelClass("sm")}>Suggest a Date</label>
            <input
              type="date"
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
        <p className="text-xs text-textMuted">
          This is just a suggested time. Your tutor may accept it or propose a
          different time, and you can decide the exact time together.
        </p>
      </div>

      <MessageField msg={{ message, setMessage }} />

      <ConfirmButton handleSubmit={handleSubmit} disabled={submitting} />
    </div>
  );
}
