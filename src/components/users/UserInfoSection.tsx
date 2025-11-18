import { GraduationCap, Lightbulb } from "lucide-react";
import FilledField from "../forms/fields/FilledField";
import GradeRadioField from "./onboarding/GradeRadio";

interface Props {
  name: string;
  email: string;
  studentId: string;
  grade?: string;
  role: "tutor" | "student";
  isOnboarding: boolean;
}
export function UserInfoSection({
  name,
  email,
  studentId,
  role,
  grade,
  isOnboarding,
}: Props) {
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
          <FilledField label="Name" value={name} />
          <FilledField label="ID" value={studentId} />
        </div>
        <FilledField label="Email" value={email} capitalize={false} />
        {isOnboarding ? (
          <GradeRadioField />
        ) : (
          <div className="flex items-center gap-2">
            <FilledField label="Role" value={role} />
            {grade && <FilledField label="Grade" value={grade} />}
          </div>
        )}
      </div>
    </div>
  );
}
