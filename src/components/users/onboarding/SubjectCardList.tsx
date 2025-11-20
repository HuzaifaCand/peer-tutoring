"use client";

import clsx from "clsx";
import { Plus, X } from "lucide-react";
import { colors, Tag } from "@/components/ui/Tag";
import { SubjectSelect } from "./OnboardingComponent";

interface SubjectCardListProps {
  subjects: SubjectSelect[];
  onAdd: () => void;
  onClickSubject?: (subject: SubjectSelect) => void;
  role: "student" | "tutor";
  onRemove: (id: string) => void;
}

export default function SubjectCardList({
  subjects,
  onAdd,
  onClickSubject,
  role,
  onRemove,
}: SubjectCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.subject?.id}
          subject={subject}
          onClick={onClickSubject}
          role={role}
          onRemove={onRemove}
        />
      ))}

      <AddSubjectCard length={subjects.length} onAdd={onAdd} />
    </div>
  );
}

function SubjectCard({
  subject,
  onClick,
  onRemove,
  role,
}: {
  subject: SubjectSelect;
  onClick?: (subject: SubjectSelect) => void;
  onRemove: (id: string) => void;
  role: "student" | "tutor";
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={() => onClick?.(subject)}
        className={clsx(
          "rounded-xl w-full px-4 sm:px-6 py-3 sm:py-4 transition transform shadow-md border border-white/10 bg-opacity-80 hover:bg-hoverBg/80"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-0.5 md:gap-2 md:items-end md:flex-row flex-col">
            <h3 className="text-md sm:text-lg font-semibold text-textWhite">
              {subject.subject?.label?.split(" ").slice(1, 3).join(" ")}
            </h3>
            {subject.subtitle && (
              <p className="text-xs md:text-sm text-textMuted">
                {role === "tutor" ? "Credentials: " : "Note: "}
                {subject.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Tag
              value={subject.subject?.label?.split(" ")[0] || ""}
              textSize="text-[10px] sm:text-[12px]"
              color="gray"
            />
            <Tag
              value={subject.subject?.code ?? ""}
              textSize="text-[10px] sm:text-[12px]"
              color={subject.subject?.color as colors}
            />
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(subject.subject?.id ?? "");
        }}
        type="button"
        className="text-textMuted transition"
        aria-label="Remove subject"
      >
        <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" />
      </button>
    </div>
  );
}

function AddSubjectCard({
  onAdd,
  length,
}: {
  onAdd: () => void;
  length: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onAdd}
        className={clsx(
          "flex items-center w-full justify-center gap-2",
          "rounded-xl border-2 border-dashed border-white/10",
          "bg-transparent hover:bg-white/5",
          "text-textMuted hover:text-textWhite",
          "py-3 sm:py-4 transition-all cursor-pointer active:scale-[0.98]"
        )}
      >
        <Plus className="w-4 h-4" />
        <span className="text-xs sm:text-sm font-medium tracking-wide">
          Add Subject
        </span>
      </button>

      {length !== 0 && <X className="w-3.5 h-3.5 invisible" />}
    </div>
  );
}
