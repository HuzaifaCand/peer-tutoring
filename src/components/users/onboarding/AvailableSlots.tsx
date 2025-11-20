"use client";

import { useFormContext } from "react-hook-form";
import clsx from "clsx";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday"] as const;
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export function AvailableSlots() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const slots = watch("slots") as Array<{
    day: string;
    hour: number;
    duration_minutes: number;
  }>;

  function toggleSlot(day: string, hour: number) {
    const exists = slots.some(
      (s) => s.day === day && s.hour === hour && s.duration_minutes === 60
    );

    if (exists) {
      setValue(
        "slots",
        slots.filter((s) => !(s.day === day && s.hour === hour)),
        { shouldValidate: true }
      );
      return;
    }

    setValue(
      "slots",
      [
        ...slots,
        {
          day,
          hour,
          duration_minutes: 60,
        },
      ],
      { shouldValidate: true }
    );
  }

  return (
    <section className="mt-10 space-y-4">
      <div className="flex md:flex-row flex-col md:items-center gap-0 md:gap-2">
        <h2 className="text-lg sm:text-xl font-medium text-textWhite">
          Available Onsite Slots
        </h2>
        {errors.slots?.message && (
          <p className="text-red-400 text-xs mt-1">
            {errors.slots.message.toString()}
          </p>
        )}
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
        {DAYS.map((day) => (
          <div key={day}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-base font-medium text-textWhite">{day}</div>
            </div>

            {/* Time chips */}
            <div className="grid grid-cols-3 gap-2">
              {HOURS.map((hour) => {
                const selected = slots.some(
                  (s) => s.day === day && s.hour === hour
                );

                return (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => toggleSlot(day, hour)}
                    className={clsx(
                      "rounded-full p-2 text-xs cursor-pointer font-medium transition border",
                      "hover:opacity-80",
                      selected
                        ? "bg-green-500 text-white border-white/5"
                        : "text-textWhite border-white/10"
                    )}
                  >
                    {formatHour(hour)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-textMuted/80">
        Each slot is 60 minutes. Selecting 8:00 AM means the 8:00 → 9:00 AM
        slot.
      </p>
    </section>
  );
}

// helper
export function formatHour(hour: number) {
  if (hour < 12) return `${hour}:00 AM`;
  if (hour === 12) return "12:00 PM";
  return `${hour - 12}:00 PM`;
}
