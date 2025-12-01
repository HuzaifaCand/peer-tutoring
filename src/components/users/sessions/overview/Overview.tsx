import SectionDivider from "@/components/ui/SectionDivider";
import { SessionStats } from "./SessionStats";
import OperationalStats from "@/components/OperationalStats";
import { BarChart2 } from "lucide-react";

const TUTOR_CONFIG = {
  tutorScheduledSessions: true,
  tutorSessionRequests: true,
};

const STUDENT_CONFIG = {
  studentScheduledSessions: true,
  studentSessionRequests: true,
};
export function SessionsOverview({
  userId,
  role,
}: {
  userId: string;
  role: "student" | "tutor";
}) {
  return (
    <section className="space-y-4">
      <OperationalStats
        userId={userId}
        config={role === "tutor" ? TUTOR_CONFIG : STUDENT_CONFIG}
      />
      <SectionDivider />
      <SessionStats role={role} userId={userId} />
      <SectionDivider />
      <div className="border-1 border-white/10 bg-mainBg text-textMuted flex items-center  justify-center ">
        <div className="py-12 px-4 flex flex-col gap-4 items-center">
          <BarChart2 className="w-8 h-8 text-textMuted" />
          <p className="text-xs sm:text-sm">Detailed Analytics Coming Soon</p>
        </div>
      </div>
    </section>
  );
}
