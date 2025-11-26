"use client";

import { getSubjectTutor, SubjectTutorType } from "./getSubjectTutors";
import { CardShell } from "@/components/card/CardShell";
import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { CardCTA } from "@/components/ui/CardCTA";
import ModalBase from "@/components/modal/ModalBase";
import { TutorModalContent } from "./TutorModalContent";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useSearchParams } from "next/navigation";

export function TutorCard({ tutor }: { tutor: SubjectTutorType }) {
  const [selectedTutor, setSelectedTutor] = useState<SubjectTutorType | null>(
    null
  );

  const {
    name,
    grade,
    subject_credentials,
    verified,
    available_slots,
    available_online,
    subject,
  } = tutor;

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");

    if (!id) return;

    const getTutor = async () => {
      const data = await getSubjectTutor(id, subject.id);
      setSelectedTutor(data);
    };

    getTutor();
  }, [searchParams, subject.id]);

  const closeModal = useCloseModal(setSelectedTutor);
  const { handleOpen } = useModalOpener<SubjectTutorType>(
    setSelectedTutor,
    "id"
  );

  return (
    <>
      <ModalBase isOpen={!!selectedTutor} onClose={closeModal}>
        <TutorModalContent tutor={selectedTutor} />
      </ModalBase>

      <CardShell
        onClick={() => handleOpen(tutor)}
        className="cursor-pointer hover:bg-cardHover transition-colors"
      >
        <div className="flex flex-col gap-4 sm:p-1">
          {/* HEADER SECTION */}
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-textWhite">{name}</h3>
              <Tag color="muted" value={grade} textSize="text-[11px]" />
            </div>
            {verified && <BadgeCheck className="text-green-400" size={16} />}
          </div>

          {/* CREDENTIALS */}

          <div className="block flex flex-col sm:flex-row gap-1 sm:items-center text-xs sm:text-[13px] pb-1 text-textMuted/80">
            Subject Credentials:{" "}
            <span className="text-textWhite/80">
              {subject_credentials === "" || subject_credentials === null
                ? "Not added yet"
                : subject_credentials}
            </span>
          </div>

          {/* AVAILABILITY */}
          <div className="flex flex-col [@media(min-width:420px)]:flex-row [@media(min-width:420px)]:items-center [@media(min-width:420px)]:justify-between gap-2 pt-4 border-t border-textMuted/20">
            <div className="flex items-center gap-1 self-start">
              {available_slots > 0 ? (
                <Tag
                  value={`${available_slots} onsite slot${
                    available_slots !== 1 ? "s" : ""
                  } available`}
                  color="green"
                  textSize="text-[10px] sm:text-[12px]"
                  className="px-1 sm:px-3 py-1"
                />
              ) : (
                <Tag
                  value={"No onsite slots available"}
                  color="gray"
                  textSize="text-[10px] sm:text-[12px]"
                  className="px-1 sm:px-3 py-1"
                />
              )}
              {available_online === true && (
                <Tag
                  value="Available Online"
                  color="green"
                  className="px-1 sm:px-3 py-1 hidden [@media(min-width:420px)]:block"
                  textSize="text-[10px] sm:text-[12px]"
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              {available_online === true && (
                <Tag
                  value="Available Online"
                  color="green"
                  className="px-1 sm:px-3 py-1 [@media(min-width:420px)]:hidden "
                  textSize="text-[10px] sm:text-[12px]"
                />
              )}

              <CardCTA
                cta="View Details"
                textSize="text-[10px] sm:text-[12px]"
                padding="py-1 sm:py-1.5 px-2 sm:px-4"
              />
            </div>
          </div>
        </div>
      </CardShell>
    </>
  );
}
