import FilledField from "@/components/forms/fields/FilledField";
import GradeRadioField from "@/components/users/onboarding/GradeRadio";
import { User } from "@supabase/supabase-js";
import { GraduationCap, Lightbulb } from "lucide-react";

export function TopSection({
  role,
  user,
}: {
  role: "tutor" | "student";
  user: User;
}) {
  const googleName = user.user_metadata.full_name;
  const displayName = googleName.split(" ").slice(0, -1).join(" ");
  const studentId =
    user.email?.split("@")[0] || googleName.split(" ").slice(-1);
  return (
    <div className="flex flex-col lg:flex-row lg:gap-6 items-center lg:items-start">
      <div className="flex items-center justify-center bg-gradient-to-l from-[#0f0f12] via-[#16161a] to-[#1b1b1f] border border-6 border-hoverBg rounded-sm w-full h-32 lg:w-50 lg:h-50 shrink-0">
        {role === "tutor" ? (
          <GraduationCap className="w-12 h-12 text-blue" />
        ) : (
          <Lightbulb className="w-12 h-12 text-blue" />
        )}
      </div>

      <div className="flex flex-col w-full mt-6 sm:gap-1 lg:mt-0">
        <div className="sm:flex sm:items-center sm:gap-2">
          <FilledField label="Name" value={displayName} />
          <FilledField label="ID" value={studentId} />
        </div>
        <FilledField label="Role" value={role} />
        <GradeRadioField />
      </div>
    </div>
  );
}
