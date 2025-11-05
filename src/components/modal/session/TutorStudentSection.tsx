import { Tag } from "@/components/ui/Tag";
import { GraduationCap, Lightbulb } from "lucide-react";

interface TutorStudentSectionProps {
  tutorInfo: {
    name: string;
    grade: string;
    id: string;
  };
  studentInfo: {
    name: string;
    grade: string;
    id: string;
  };
}

export function TutorStudentSection({
  tutorInfo,
  studentInfo,
}: TutorStudentSectionProps) {
  return (
    <section className="flex justify-between items-start gap-6 mb-6">
      {/* Tutor */}
      <div className="flex flex-col items-center flex-1">
        <div className="relative w-20 h-20 mb-2 rounded-full bg-blue-500/10 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-blue-400" />
        </div>
        <p className="font-semibold leading-tight mb-1 text-center">
          {tutorInfo.name}
        </p>
        <div className="flex items-center gap-1">
          <Tag value={tutorInfo.grade} color="muted" textSize="text-[12px]" />
          <Tag value={tutorInfo.id} color="muted" textSize="text-[12px]" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-20 bg-white/10" />

      {/* Student */}
      <div className="flex flex-col items-center flex-1">
        <div className="relative w-20 h-20 mb-2 rounded-full bg-yellow-500/10 flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-yellow-400" />
        </div>
        <p className="font-semibold leading-tight mb-1 text-center">
          {studentInfo.name}
        </p>
        <div className="flex items-center gap-1">
          <Tag value={studentInfo.grade} color="muted" textSize="text-[12px]" />
          <Tag value={studentInfo.id} color="muted" textSize="text-[12px]" />
        </div>
      </div>
    </section>
  );
}
