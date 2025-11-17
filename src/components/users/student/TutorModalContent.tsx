import { SubjectTutorType } from "./getSubjectTutors";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { colors, Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import { OnsiteAvailablity } from "./OnsiteAvailability";

export function TutorModalContent({
  tutor,
}: {
  tutor: SubjectTutorType | null;
}) {
  if (!tutor) return null;

  const {
    name,
    grade,
    subject_credentials,
    about,
    verified,
    available_online,
    slots,
    subject,
  } = tutor;

  return (
    <div className="space-y-8 p-4">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row lg:gap-8 items-start lg:items-start">
        {/* ICON / AVATAR */}
        <div
          className="flex items-center justify-center 
          w-32 h-32 lg:w-36 lg:h-36 shrink-0 
          rounded-xl bg-gradient-to-br from-[#111] via-[#16161a] to-[#1c1c21]
          border border-white/5 shadow-sm"
        >
          <GraduationCap className="w-14 h-14 text-blue" />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 w-full py-4 mt-4 lg:mt-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-textWhite">{name}</h2>
              {verified && <BadgeCheck className="text-green-400" size={22} />}
            </div>

            {/* TAGS */}
            <div className="flex items-center gap-2 flex-wrap">
              <Tag value={`${grade} Student`} color="gray" textSize="text-xs" />
              <Tag
                value={subject.label}
                color={subject.color as colors}
                textSize="text-xs"
              />
              {available_online && (
                <Tag value="Online" color="green" textSize="text-xs" />
              )}
            </div>
          </div>

          {/* CREDENTIALS */}
          <div className="space-y-2">
            <h3 className="text-textWhite font-semibold text-lg">
              Subject Credentials
            </h3>
            <p className="text-textMuted/80 text-sm leading-relaxed max-w-prose">
              {subject_credentials || "Not added yet."}
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* ABOUT SECTION */}
      <div className="space-y-3">
        <h3 className="text-textWhite font-semibold text-lg">
          About the Tutor
        </h3>
        <p className="text-textMuted/80 text-sm leading-relaxed max-w-prose">
          {about || "No description provided."}
        </p>
      </div>

      <div className="h-px bg-white/5" />

      {/* AVAILABILITY */}
      <OnsiteAvailablity slots={slots} />

      {/* CTA */}
      <div className="pt-4 flex justify-end">
        <button className="cursor-pointer">
          <CardCTA
            cta="Book a Session"
            textSize="text-sm"
            padding="py-2 px-4"
          />
        </button>
      </div>
    </div>
  );
}
