import { SlotsRow } from "@/lib/computedtypes";
import clsx from "clsx";
import { formatHour } from "../onboarding/AvailableSlots";

type dayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday";

const dayOrder: Record<dayOfWeek, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
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
            <p className="text-textWhite/90 text-sm font-medium">{day}</p>

            <div className="grid grid-cols-2 gap-2">
              {daySlots!
                .sort((a, b) => a.hour - b.hour)
                .map((slot) => {
                  return (
                    <div
                      key={`${slot.day}-${slot.hour}`}
                      title={!slot.available ? "Booked" : "Available"}
                      className={clsx(
                        "px-3 py-1.5 rounded-md text-xs shadow-sm whitespace-nowrap shrink-0 transition-colors duration-200 border",
                        slot.available
                          ? "bg-green-500/15 border-green-600/40 text-green-300 hover:bg-green-500/25"
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
