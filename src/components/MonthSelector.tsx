import {
  academicMonths,
  getAcademicYears,
  getTermFromMonth,
  getYearFromTerm,
} from "@/utils/months";
import { ChevronDown } from "lucide-react"; // for dropdown arrow

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
    <div className="relative inline-block w-full max-w-[220px]">
      <select
        value={monthIndex}
        onChange={handleChange}
        className="
          w-full appearance-none
          bg-elevatedBg text-textButton text-sm font-medium
          border border-white/10
          rounded-xl px-4 py-2 pr-10
          cursor-pointer transition-all duration-200
          focus:outline-none focus:ring-1 focus:ring-white/30
          hover:border-white/30 hover:bg-hoverBg
        "
      >
        {academicMonths.map(({ name, index }) => (
          <option
            key={index}
            value={index}
            className="bg-elevatedBg text-textButton"
          >
            {name}
          </option>
        ))}
      </select>

      {/* Custom dropdown icon */}
      <ChevronDown
        size={18}
        className="
          pointer-events-none absolute right-3 top-1/2
          -translate-y-1/2 text-textWhite/70 transition-transform duration-200
          group-hover:text-textWhite/90
        "
      />
    </div>
  );
}
