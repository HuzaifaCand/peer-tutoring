import Chart from "@/components/Chart";

const sessionscount = [
  { day: "Week 1", total: 4 },
  { day: "Week 2", total: 7 },
  { day: "Week 3", total: 5 },
  { day: "Week 4", total: 9 },
];

export default function SessionsChart() {
  return (
    <div className="space-y-8">
      <h2 className="text-left font-semibold text-2xl">Sessions in January</h2>
      <Chart data={sessionscount} />
    </div>
  );
}
