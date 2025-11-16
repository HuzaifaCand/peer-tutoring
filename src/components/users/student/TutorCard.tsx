"use client";

import { SubjectTutorType } from "./getSubjectTutors";
import { CardShell } from "@/components/card/CardShell";
import { useState } from "react";
import { TutorModal } from "./TutorModal";
import { Badge, BadgeCheck, CheckCircle2, Info } from "lucide-react"; // if lucide-react is installed
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";

export function TutorCard({ tutor }: { tutor: SubjectTutorType }) {
  const [showModal, setShowModal] = useState(false);

  const {
    name,
    grade,
    subject_credentials,
    verified,
    available_slots,
    available_online,
  } = tutor;

  return (
    <>
      <TutorModal
        showModal={showModal}
        setShowModal={setShowModal}
        tutor={tutor}
      />

      <CardShell
        onClick={() => setShowModal(true)}
        className="cursor-pointer hover:bg-cardHover transition-colors"
      >
        <div className="flex flex-col gap-3 sm:p-1">
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-textWhite">{name}</h3>
              <Tag color="muted" value={grade} textSize="text-[11px]" />
            </div>
            {verified && (
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <BadgeCheck size={14} />
                Verified
              </span>
            )}
          </div>

          {/* GRADE & CREDENTIALS */}

          <div className="block text-xs sm:text-[13px] pb-1 text-textMuted">
            Subject Credentials:{" "}
            <span className="text-textWhite/80">
              {subject_credentials === "" || subject_credentials === null
                ? "None currently"
                : subject_credentials}
            </span>
          </div>

          {/* AVAILABILITY */}
          <div className="flex items-center justify-between pt-4 border-t border-textMuted/20">
            <div className="flex items-center gap-2">
              {available_slots > 0 ? (
                <Tag
                  value={`${available_slots} slot${
                    available_slots !== 1 ? "s" : ""
                  } available`}
                  color="green"
                  textSize="text-[12px]"
                  className="px-3 py-1"
                />
              ) : (
                <Tag
                  value={"No onsite slots available"}
                  color="gray"
                  textSize="text-[12px]"
                  className="px-3 py-1"
                />
              )}
              {available_online === true && (
                <Tag
                  value="Available Online"
                  color="green"
                  className="px-3 py-1"
                  textSize="text-[12px]"
                />
              )}
            </div>

            <CardCTA
              cta="View Details"
              textSize="text-[12px]"
              padding="py-1.5 px-4"
            />
          </div>
        </div>
      </CardShell>
    </>
  );
}
