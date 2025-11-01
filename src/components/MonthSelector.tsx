import {
  academicMonths,
  getAcademicYears,
  getTermFromMonth,
  getYearFromTerm,
} from "@/utils/months";
import { ChevronDown } from "lucide-react"; // for dropdown arrow
import Selector from "./Selector";

interface Props {
  monthIndex: number;
  setMonthIndex: (m: number) => void;
  setYear: (y: number) => void;
}

export default function MonthSelector({
  monthIndex,
  setMonthIndex,
  setYear,
}: Props) {
  const { startYear, endYear } = getAcademicYears();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value);
    setMonthIndex(newMonth);

    const newTerm = getTermFromMonth(newMonth);
    setYear(getYearFromTerm(newTerm, startYear, endYear));
  };

  return (
    <Selector
      value={monthIndex}
      handleChange={handleChange}
      values={academicMonths}
    />
  );
}
