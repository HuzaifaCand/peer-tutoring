"use client";

import Chart from "@/components/Chart";
import MonthSelector from "@/components/MonthSelector";
import { useMonthlySessionData } from "@/hooks/useMonthlySessionData";
import { getMonthLabel } from "@/utils/months";

export default function SessionsChart() {
  const {
    monthIndex,
    year,
    setYear,
    data,
    loading,
    setMonthIndex,
    totalSessions,
  } = useMonthlySessionData();

  return (
    <section className="space-y-12">
      <div className="flex sm:items-center sm:flex-row  flex-col gap-3 sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl text-textWhite">
            Sessions in {getMonthLabel(monthIndex)} {year}
          </h2>
          <p className="text-textMuted  text-xs">
            Total Sessions: {totalSessions}
          </p>
        </div>
        <MonthSelector
          monthIndex={monthIndex}
          setYear={setYear}
          setMonthIndex={setMonthIndex}
        />
      </div>

      <Chart data={data} dataLoading={loading} />
    </section>
  );
}
