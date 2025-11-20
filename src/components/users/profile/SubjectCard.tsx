import { InlineEditable } from "@/components/ui/InlineEditable";
import { SubjectHeader } from "../user-subjects/SubjectHeader";
import { CardShell } from "@/components/card/CardShell";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

type subject = {
  subject_id: string;
  subtitle: string | null;
  label: string;
  name: string;
  code: string;
  color: string;
  grade: string;
}[];

export function SubjectCard({
  subjects,
  role,
  userId,
}: {
  subjects: subject;
  role: "tutor" | "student";
  userId: string;
}) {
  async function updateSubtitle(
    newSubtitle: string,
    subjectId: string,
    label: string
  ) {
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
  return subjects.map((s) => (
    <CardShell key={s.subject_id}>
      <div className="flex flex-col gap-2">
        <SubjectHeader
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
            onSave={async (newCred) =>
              updateSubtitle(newCred, s.subject_id, s.label)
            }
          />
        ) : (
          <InlineEditable
            type="input"
            label="Note"
            value={s.subtitle}
            onSave={async (newNote) =>
              updateSubtitle(newNote, s.subject_id, s.label)
            }
          />
        )}
      </div>
    </CardShell>
  ));
}
