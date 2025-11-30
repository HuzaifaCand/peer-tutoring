"use client";

import { getInputClass, getLabelClass } from "@/components/forms/classes";
import { FormButton } from "@/components/forms/FormButton";
import ModalBase from "@/components/modal/ModalBase";
import clsx from "clsx";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export function localDateTimeToUTC(date: string, time: string): string {
  const dt = new Date(`${date}T${time}:00`);

  if (isNaN(dt.getTime())) {
    throw new Error("Invalid date or time.");
  }

  return dt.toISOString();
}
export function AcceptOnlineModal({
  isOpen,
  onClose,
  req,
  refetch,
  closeModal,
}: {
  isOpen: boolean;
  onClose: () => void;
  req: {
    id: string;
    student_id: string;
    tutor_id: string;
    subject_id: string;
    message?: string | null;
  };
  refetch: () => void;
  closeModal: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSchedule() {
    setErr("");

    if (!date || !time) {
      setErr("Both date and time are required.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    // If selected date is BEFORE today → invalid
    if (selected < today) {
      return toast.error(
        "Please select a valid date. You cannot select a past day."
      );
    }

    const [h, m] = time.split(":").map(Number);

    const now = new Date();

    const isToday = selected.getTime() === today.getTime();

    if (isToday) {
      const selectedMinutes = h * 60 + m;
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      if (selectedMinutes < nowMinutes) {
        return toast.error("The selected time has already passed.");
      }
    }

    const scheduledForUTC = localDateTimeToUTC(date, time);

    setLoading(true);

    const { error: sessErr } = await supabase.from("sessions").insert({
      tutor_id: req.tutor_id,
      student_id: req.student_id,
      subject_id: req.subject_id,
      scheduled_for: scheduledForUTC,
      is_online: true,
      status: "scheduled",
      message: req.message ?? null,
    });

    if (sessErr) {
      console.error(sessErr);
      toast.error("Failed to create session.");
      setLoading(false);
      return;
    }

    const { error: reqErr } = await supabase
      .from("online_session_requests")
      .update({ status: "accepted" })
      .eq("id", req.id)
      .eq("status", "pending");

    if (reqErr) {
      console.error(reqErr);
      toast.error("Failed to update req.");
      setLoading(false);
      return;
    }

    await supabase.from("notifications").insert({
      user_id: req.student_id,
      title: "Session Accepted",
      body: "Your online session request has been accepted and scheduled.",
      type: "session",
      href: "/student/sessions?tab=requests",
    });

    toast.success("Session scheduled successfully.");

    setLoading(false);
    onClose();
    closeModal();
    refetch();
  }

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} width="tight">
      <div className="space-y-4 pt-4">
        <h2 className="text-lg sm:text-xl font-semibold text-textWhite">
          Schedule Online Session
        </h2>

        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div className="flex flex-col">
              <label className={getLabelClass("sm")}>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={clsx(
                  getInputClass("sm"),
                  "mt-2",
                  "[color-scheme:dark]"
                )}
              />
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className={getLabelClass("sm")}>Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={clsx(
                  getInputClass("sm"),
                  "mt-2",
                  "[color-scheme:dark]"
                )}
              />
            </div>
          </div>

          {err && <p className="text-red-400 text-[10px] mt-1">{err}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <FormButton
            size="xs"
            text="Schedule"
            handleClick={handleSchedule}
            disabled={loading}
          />
        </div>
      </div>
    </ModalBase>
  );
}
