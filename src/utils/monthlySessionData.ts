import {
  startOfMonth,
  endOfMonth,
  addWeeks,
  addDays,
  format,
  isAfter,
} from "date-fns";
import { supabase } from "@/lib/supabase/client";

function addOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return `${day}th`; // 4–20 always 'th'
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export async function getMonthlySessionData(year: number, month: number) {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(new Date(year, month));

  const { data, error } = await supabase
    .from("sessions")
    .select("scheduled_at")
    .eq("status", "completed")
    .gte("scheduled_at", monthStart.toISOString())
    .lt("scheduled_at", monthEnd.toISOString());

  if (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }

  // --- Build week ranges with actual dates ---
  const weekRanges: { start: Date; end: Date }[] = [];
  let weekStart = monthStart;

  while (weekStart <= monthEnd) {
    const weekEnd = addDays(weekStart, 6);
    weekRanges.push({
      start: weekStart,
      end: isAfter(weekEnd, monthEnd) ? monthEnd : weekEnd,
    });
    weekStart = addWeeks(weekStart, 1);
  }

  // --- Count sessions per week range ---
  const weekCounts = weekRanges.map(({ start, end }) => {
    const count = data.filter((session) => {
      const date = new Date(session.scheduled_at);
      return date >= start && date <= end;
    }).length;

    // format the label and add suffix
    const startLabel = addOrdinalSuffix(Number(format(start, "d")));
    const endLabel = addOrdinalSuffix(Number(format(end, "d")));

    return {
      week: `${startLabel} – ${endLabel}`,
      count,
    };
  });

  return weekCounts;
}
