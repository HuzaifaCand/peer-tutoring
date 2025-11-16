"use client";

import { subject } from "@/hooks/useUserSubjects";
import clsx from "clsx";
import { subjectColorMap, subjectColors } from "../SubjectFilter";
import TextLoader from "@/components/ui/TextLoader";

interface SubjectTabsProps {
  subjectTab: subject | null;
  subjects: subject[];
  setSubjectTab: (s: subject) => void;
}

export default function SubjectTabs({
  subjectTab,
  subjects,
  setSubjectTab,
}: SubjectTabsProps) {
  return (
    <div className={clsx("mb-6 space-x-2")}>
      {subjects.map((s) => {
        return (
          <button
            key={s.id}
            onClick={() => setSubjectTab(s)}
            className={`px-3 py-1 text-xs hover:cursor-pointer whitespace-nowrap sm:text-sm rounded-md border transition
                ${
                  subjectTab === s
                    ? `${subjectColorMap[subjectTab.color as subjectColors]}`
                    : "bg-elevatedBg/50 text-textWhite/70 border-white/10 hover:bg-hoverBg"
                }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
