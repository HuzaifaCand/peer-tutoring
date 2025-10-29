import { getMonthlySessionData } from "@/utils/monthlySessionData";
import {
  getAcademicYears,
  getDefaultAcademicMonth,
  getTermFromMonth,
  getYearFromTerm,
} from "@/utils/months";
import { useEffect, useState } from "react";

export function useMonthlySessionData() {
  const { startYear, endYear } = getAcademicYears();

  const [monthIndex, setMonthIndex] = useState<number>(
    getDefaultAcademicMonth()
  );
  const [year, setYear] = useState<number>(
    getYearFromTerm(getTermFromMonth(monthIndex), startYear, endYear)
  );

  const [data, setData] = useState<{ week: string; count: number }[]>([]);
  const [totalSessions, setTotalSessions] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const formattedWeeks = await getMonthlySessionData(year, monthIndex);
      setData(formattedWeeks);

      // Calculate total sessions
      const total = formattedWeeks.reduce((sum, week) => sum + week.count, 0);
      setTotalSessions(total);

      setLoading(false);
    };

    loadData();
  }, [monthIndex, year]);

  return {
    monthIndex,
    year,
    setMonthIndex,
    setYear,
    data,
    totalSessions,
    loading,
  };
}
