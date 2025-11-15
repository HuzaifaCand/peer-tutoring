"use client";

import { CardShell } from "@/components/card/CardShell";
import { CardCTA } from "@/components/ui/CardCTA";
import { ComputedSubjectUserCard } from "./getSubjectUsers";
import { colors, Tag } from "@/components/ui/Tag";
import { toast } from "sonner";
import Link from "next/link";

interface SubjectUserCardProps {
  subject: ComputedSubjectUserCard | null;
  role: "tutor" | "student";
}

export function SubjectUserCard({ subject, role }: SubjectUserCardProps) {
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
        <div className="flex items-center justify-between">
          <h3
            className={`text-xl sm:text-2xl font-semibold text-white leading-tight`}
          >
            {name}
          </h3>

          <div className="flex items-center gap-1">
            <Tag value={grade} color="muted" textSize="text-[12px]" />
            <Tag value={code} color={color as colors} textSize="text-[12px]" />
          </div>
        </div>
        <div className="bg-hoverBg w-full h-[1px]" />
        {/* Footer */}
        <div className="flex items-end justify-between pt-1 gap-2">
          <div className="flex flex-col items-start  sm:flex-row sm:items-center gap-2">
            <Tag
              value={bottomText}
              color={count === 0 ? "red" : "gray"}
              textSize="text-[10px] sm:text-[12px]"
              className="px-1 sm:px-3 py-1"
            />
            <Tag
              value={
                resource_count !== 1
                  ? resource_count + " Resources"
                  : 1 + " Resource"
              }
              color={resource_count === 0 ? "orange" : "muted"}
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
            {count !== 0 && role === "student" ? (
              <Link href={`/student/tutors?sub=${subject.subject_id}`}>
                <CardCTA
                  cta="Browse tutors"
                  padding="py-1 px-2 sm:px-3"
                  textSize="text-[10px] sm:text-xs"
                />
              </Link>
            ) : (
              <button
                className="cursor-pointer text-left"
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
