"use client";

import { SubjectTutorType } from "./getSubjectTutors";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { colors, Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import { OnsiteAvailablity } from "./OnsiteAvailability";
import { useState } from "react";
import { SessionRequestModal } from "./session-request/SessionRequestModal";

export function TutorModalContent({
  tutor,
}: {
  tutor: SubjectTutorType | null;
}) {
  const [reqModal, setReqModal] = useState(false);

  if (!tutor) return null;
  const {
    id: tutorId,
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
    <>
      <SessionRequestModal
        subjectLabel={subject.label}
        subjectId={subject.id}
        tutorId={tutorId}
        slots={slots}
        reqModal={reqModal}
        setReqModal={setReqModal}
        online={available_online}
      />
      <div className="space-y-8 pt-8 pl-3">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row lg:gap-8 items-start lg:items-start">
          {/* ICON / AVATAR */}
          <div className="flex items-center justify-center bg-mainBg border border-4 border-hoverBg rounded-sm w-full h-32 lg:w-50 lg:h-50 shrink-0">
            <GraduationCap className="w-12 h-12 text-blue" />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col gap-4 w-full py-4 lg:py-8 mt-4 lg:mt-0">
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
                  color="gray"
                  textSize="text-[10px] sm:text-xs"
                />
                <Tag
                  value={subject.label}
                  color={subject.color as colors}
                  textSize="text-[10px] sm:text-xs"
                />
                {available_online && (
                  <Tag
                    value="Available Online"
                    color="green"
                    textSize="text-[10px] sm:text-xs"
                  />
                )}
              </div>
            </div>

            {/* CREDENTIALS */}
            <div className="space-y-2">
              <h3 className="text-textWhite font-semibold text-md sm:text-lg">
                {subject.name} Credentials
              </h3>
              <p className="text-textMuted/80 text-xs sm:text-sm leading-relaxed max-w-prose">
                {subject_credentials || "Not added yet."}
              </p>
            </div>
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

        {/* ABOUT SECTION */}
        <div className="space-y-2">
          <h3 className="text-textWhite font-semibold text-md sm:text-lg">
            About the Tutor
          </h3>
          <p className="text-textMuted/80 text-xs sm:text-sm leading-relaxed max-w-prose">
            {about || "No description provided."}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-6 pb-2 flex justify-end">
          <button
            type="button"
            onClick={() => setReqModal(true)}
            className="cursor-pointer"
          >
            <CardCTA
              cta="Book a Session"
              textSize="text-xs sm:text-sm"
              padding="py-1.5 sm:py-2 px-3 sm:px-4"
            />
          </button>
        </div>
      </div>
    </>
  );
}
