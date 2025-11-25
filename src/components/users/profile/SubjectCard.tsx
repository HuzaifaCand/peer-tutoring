"use client";

import { useState } from "react";
import { InlineEditable } from "@/components/ui/InlineEditable";
import { SubjectHeader } from "../user-subjects/SubjectHeader";
import { CardShell } from "@/components/card/CardShell";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

type Subject = {
  subject_id: string;
  subtitle: string | null;
  label: string;
  name: string;
  code: string;
  color: string;
  grade: string;
};

export function SubjectCard({
  subjects,
  role,
  userId,
}: {
  subjects: Subject[];
  role: "tutor" | "student";
  userId: string;
}) {
  const [localSubjects, setLocalSubjects] = useState(subjects);

  async function updateSubtitle(
    newSubtitle: string,
    subjectId: string,
    label: string
  ) {
    // previous state for rollbacks
    const previous = [...localSubjects];

    // --- OPTIMISTIC UPDATE ---
    setLocalSubjects((curr) =>
      curr.map((s) =>
        s.subject_id === subjectId ? { ...s, subtitle: newSubtitle } : s
      )
    );

    const table = role === "tutor" ? "tutor_subjects" : "student_subjects";
    const updateColumn =
      role === "tutor" ? { credentials: newSubtitle } : { note: newSubtitle };
    const idColumn = role === "tutor" ? "tutor_id" : "student_id";

    const { error } = await supabase
      .from(table)
      .update(updateColumn)
      .eq(idColumn, userId)
      .eq("subject_id", subjectId);

    if (error) {
      // --- ROLLBACK ---
      setLocalSubjects(previous);

      console.error(error);
      toast.error(
        `Failed to update ${role === "tutor" ? "credentials" : "note"}.`
      );
    } else {
      toast.success(
        `${
          role === "tutor" ? "Credentials" : "Note"
        } for ${label} updated successfully`
      );
    }
  }

  return localSubjects.map((s) => (
    <CardShell key={s.subject_id}>
      <div className="flex flex-col gap-2">
        <SubjectHeader
          profile
          name={s.name}
          code={s.code}
          grade={s.grade}
          color={s.color}
        />

        {role === "tutor" ? (
          <InlineEditable
            type="input"
            label="Credentials"
            value={s.subtitle}
            onSave={(newCred) => updateSubtitle(newCred, s.subject_id, s.label)}
          />
        ) : (
          <InlineEditable
            type="input"
            label="Note"
            value={s.subtitle}
            onSave={(newNote) => updateSubtitle(newNote, s.subject_id, s.label)}
          />
        )}
      </div>
    </CardShell>
  ));
}
