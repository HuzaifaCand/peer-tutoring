import { CURRENT_ACADEMIC_YEAR } from "@/lib/constants/academicYear";

export const academicMonths = [
  { name: "August", index: 7, term: 1 },
  { name: "September", index: 8, term: 1 },
  { name: "October", index: 9, term: 1 },
  { name: "November", index: 10, term: 1 },
  { name: "December", index: 11, term: 1 },
  { name: "January", index: 0, term: 2 },
  { name: "February", index: 1, term: 2 },
  { name: "March", index: 2, term: 2 },
  { name: "April", index: 3, term: 2 },
];

export function getMonthLabel(m: number) {
  const month = academicMonths.find(({ index }) => index === m);
  return month ? month.name : "Unknown";
}

export function getDefaultAcademicMonth() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const validMonth = academicMonths.find((m) => m.index === currentMonth);
  return validMonth ? currentMonth : 3; // April fallback
}

export function getTermFromMonth(m: number) {
  const month = academicMonths.find(({ index }) => index === m);
  return month ? month.term : 1; // default
}

export function getYearFromTerm(term: number, s: number, e: number) {
  return term === 1 ? s : e;
}

export function getAcademicYears() {
  const [startYear, endYear] = CURRENT_ACADEMIC_YEAR.split("-").map(Number);
  return { startYear, endYear };
}
