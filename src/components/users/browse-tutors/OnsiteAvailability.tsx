import { SlotsRow } from "@/lib/computedtypes";
import clsx from "clsx";
import { formatHour } from "../onboarding/AvailableSlots";

type dayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday";

const dayOrder: Record<dayOfWeek, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
};

export function OnsiteAvailablity({ slots }: { slots: SlotsRow[] }) {
  // Group slots by day
  const grouped = slots.reduce((acc, slot) => {
    const day = slot.day as dayOfWeek;
    (acc[day] ||= []).push(slot);
    return acc;
  }, {} as Partial<Record<dayOfWeek, SlotsRow[]>>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(grouped)
        .sort(([a], [b]) => dayOrder[a as dayOfWeek] - dayOrder[b as dayOfWeek])
        .map(([day, daySlots]) => (
          <div key={day} className="space-y-2">
            <p className="text-textWhite/90 text-[13px] sm:text-sm font-medium">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {daySlots!
                .sort((a, b) => a.hour - b.hour)
                .map((slot) => {
                  return (
                    <div
                      key={`${slot.day}-${slot.hour}`}
                      title={!slot.available ? "Booked" : "Available"}
                      className={clsx(
                        "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl text-[11px] sm:text-xs shadow-sm whitespace-nowrap shrink-0 transition-colors duration-200 border",
                        slot.available
                          ? "bg-green-500/15 text-green-300  border-white/5 hover:bg-green-500/25"
                          : "bg-elevatedBg border-white/10 text-textMuted/40 line-through"
                      )}
                    >
                      {formatHour(slot.hour)}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </div>
  );
}
