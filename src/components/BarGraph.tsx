import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ComputedSubjectPopularityView } from "./admin/sessions/overview/SubjectsPopularityGraph";

export default function BarGraph({
  data,
  loading,
}: {
  data: ComputedSubjectPopularityView[];
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-textMuted w-7 h-7" />
      </div>
    );
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="min-w-[500px]">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart margin={{ top: 20 }} data={data}>
            <XAxis
              dataKey="subject"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
              interval={0}
            />

            <Bar
              dataKey="session_count"
              fill="#50d6ffff"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            >
              <LabelList
                dataKey="session_count"
                position="top"
                fill="#fff"
                fontSize={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
