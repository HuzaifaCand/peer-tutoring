import { BadgeCheck, GraduationCap } from "lucide-react";
import { ComputedTutorRow } from "../../../lib/users/getTutors";
import { colors, Tag } from "../../ui/Tag";
import { OnsiteAvailablity } from "@/components/users/browse-tutors/OnsiteAvailability";
import { VerifyTutor } from "./VerifyTutor";

export function TutorModal({
  tutor,
  onClose,
  refetch,
}: {
  tutor: ComputedTutorRow;
  onClose: () => void;
  refetch: () => void;
}) {
  const {
    id: tutorId,
    name,
    verified,
    grade,
    subjects,
    availableOnline,
    slots,
    about,
  } = tutor;
  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col lg:flex-row lg:gap-8 items-start lg:items-start pr-8 lg:pr-0">
        {/* ICON / AVATAR */}
        <div className="flex items-center justify-center bg-mainBg border border-4 border-hoverBg rounded-sm w-full h-32 lg:w-50 lg:h-50 shrink-0">
          <GraduationCap className="w-12 h-12 text-blue" />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-4 w-full py-4 lg:py-8 mt-4 lg:mt-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-textWhite">
                  {name}
                </h2>
                {verified && (
                  <BadgeCheck className="text-green-400" size={22} />
                )}
              </div>

              {/* TAGS */}
              <div className="flex items-center gap-2 flex-wrap">
                <Tag
                  value={`${grade} Student`}
                  color={grade === "AS" ? "blue" : "yellow"}
                  textSize="text-[10px] sm:text-xs"
                />

                {availableOnline && (
                  <Tag
                    value="Available Online"
                    color="green"
                    textSize="text-[10px] sm:text-xs"
                  />
                )}
                {!verified && (
                  <Tag
                    value={"Unverified"}
                    color="gray"
                    textSize="text-[10px] sm:text-xs"
                  />
                )}
              </div>
            </div>

            <div className="space-y-0">
              <h3 className="text-textWhite font-semibold text-md sm:text-lg">
                About
              </h3>
              <p className="text-textMuted/80 text-xs sm:text-sm leading-relaxed max-w-prose">
                {about || "Not added yet."}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-white/5" />
      {/* SUBJECTS */}
      <div className="space-y-3">
        <h3 className="text-textWhite font-semibold text-md sm:text-lg">
          Subjects
        </h3>

        <div className="flex flex-col gap-3">
          {subjects.map((s) => (
            <div
              key={s.subject_id}
              className="p-3 rounded-md bg-elevatedBg/50 border border-white/5"
            >
              {/* Top row: Label + Code */}
              <div className="flex items-center justify-between">
                <p className="text-sm sm:text-base text-textWhite font-medium">
                  {s.subjects.label}
                </p>
                <Tag
                  value={s.subjects.code}
                  color={s.subjects.color as colors}
                  textSize="text-[10px] sm:text-xs"
                />
              </div>

              {/* Credential */}
              {s.credentials && (
                <p className="text-[10px] sm:text-xs text-textMuted mt-1">
                  {s.credentials}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-white/5" />

      {/* AVAILABILITY */}
      <div className="space-y-3">
        <h3 className="text-textWhite font-semibold text-md sm:text-lg">
          Onsite Availability
        </h3>
        <OnsiteAvailablity slots={slots} />
      </div>
      <div className="h-px bg-white/5" />

      {!verified && (
        <div className="flex justify-end gap-2 pt-4">
          <VerifyTutor
            tutorId={tutorId}
            closeModal={onClose}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  );
}
