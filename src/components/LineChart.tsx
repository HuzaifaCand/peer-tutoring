import { Loader2 } from "lucide-react";
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
  data: { week: string; count: number }[];
  dataLoading: boolean;
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

export default function LChart({ data, dataLoading }: WeeklyLineChartProps) {
  if (dataLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-textMuted w-7 h-7" />
      </div>
    );
  return (
    <div className="w-full h-64 focus:outline-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="week"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 12 }}
            width={25}
          />

          {/* Custom Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#ebff10",
              strokeWidth: 0.5,
              strokeDasharray: "3 3",
            }}
          />

          <Line
            type="linear"
            dataKey="count"
            stroke="#ebff10"
            strokeWidth={1.5}
            dot={{ r: 2.5, fill: "#ebff10" }}
            activeDot={{ r: 4.5, fill: "#ebff10", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
