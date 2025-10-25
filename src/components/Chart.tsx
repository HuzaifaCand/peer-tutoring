import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface WeeklyLineChartProps {
  data: { day: string; total: number }[];
}

interface CustomTooltipPayload {
  value: number;
  name: string;
  color: string;
}

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string> & {
  payload?: CustomTooltipPayload[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="backdrop-blur-md bg-[rgba(20,20,20,0.7)] border border-white/10 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs text-gray-300">{label}</p>
        <p className="text-sm font-semibold text-yellow-200">
          {value} sessions
        </p>
      </div>
    );
  }
  return null;
}

export default function Chart({ data }: WeeklyLineChartProps) {
  return (
    <div className="w-full h-64 focus:outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          {/* X Axis (days of week) */}
          <XAxis
            dataKey="day"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis (hidden gridlines, subtle labels) */}
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          {/* Custom Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#f2ff62ff",
              strokeWidth: 0.5,
              strokeDasharray: "3 3",
            }}
          />

          {/* The line itself */}
          <Line
            type="linear"
            dataKey="total"
            stroke="#f2ff62ff"
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: "#f2ff62ff" }}
            activeDot={{ r: 4.5, fill: "#f2ff62ff", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
