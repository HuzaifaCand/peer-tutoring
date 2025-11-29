"use client";

import { CardShell } from "@/components/card/CardShell";
import { CardCTA } from "@/components/ui/CardCTA";
import { ComputedUserSubjectCard } from "./getUserSubjects";
import { Tag } from "@/components/ui/Tag";
import { toast } from "sonner";
import Link from "next/link";
import { SubjectHeader } from "./SubjectHeader";

interface UserSubjectCardProps {
  subject: ComputedUserSubjectCard;
  role: "tutor" | "student";
}

export function UserSubjectCard({ subject, role }: UserSubjectCardProps) {
  if (!subject) return null;
  const { name, grade, color, code, count, resource_count } = subject;

  const bottomText =
    role === "tutor"
      ? `${count} student${count !== 1 ? "s" : ""} looking for help`
      : `${count} tutor${count !== 1 ? "s" : ""} available`;

  return (
    <CardShell>
      <div className="flex flex-col gap-4 p-0 sm:p-1">
        {/* Header */}
        <SubjectHeader name={name} code={code} grade={grade} color={color} />
        <div className="bg-hoverBg w-full h-[1px]" />
        {/* Footer */}
        <div className="flex items-end justify-between pt-1 gap-2">
          <div className="flex flex-col items-start  sm:flex-row sm:items-center gap-2">
            <Tag
              value={bottomText}
              color={count === 0 ? "red" : "green"}
              textSize="text-[10px] sm:text-[12px]"
              className="px-1 sm:px-3 py-1"
            />
            <Tag
              value={
                resource_count !== 1
                  ? resource_count + " Resources"
                  : "1 Resource"
              }
              color={resource_count === 0 ? "gray" : "green"}
              textSize="text-[10px] sm:text-[12px]"
              className="px-1 sm:px-3 py-1"
            />
          </div>
          <div className="flex flex-col items-end sm:flex-row sm:items-center gap-2">
            <Link className="hidden sm:inline" href={`/${role}/resources`}>
              <CardCTA
                cta={resource_count === 0 ? "Add Resource" : "Browse Resources"}
                padding="py-1 px-2 sm:px-3"
                textSize="text-[10px] sm:text-xs"
              />
            </Link>
            {count !== 0 && role === "student" && (
              <Link href={`/student/tutors?sub=${subject.subject_id}`}>
                <CardCTA
                  cta="Browse tutors"
                  padding="py-1 px-2 sm:px-3"
                  textSize="text-[10px] sm:text-xs"
                />
              </Link>
            )}
            {count === 0 && (
              <button
                className="cursor-pointer"
                onClick={() => toast.warning("Admins have been notified!")}
              >
                <CardCTA
                  cta="Notify Admins"
                  padding="py-1 px-2 sm:px-3"
                  textSize="text-[10px] sm:text-xs"
                />
              </button>
            )}

            <Link className="sm:hidden" href={`/${role}/resources`}>
              <CardCTA
                cta={resource_count === 0 ? "Add Resource" : "View Resources"}
                padding="py-1 px-2 sm:px-3"
                textSize="text-[10px] sm:text-xs"
              />
            </Link>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
