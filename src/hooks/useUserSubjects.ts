import { useEffect, useState } from "react";
import { useUserRole } from "./useUserRole";
import { supabase } from "@/lib/supabase/client";
import { SubjectRow } from "@/lib/computedtypes";
import { useAuthUser } from "./useAuthUser";

export function useUserSubjects() {
  const [subjects, setSubjects] = useState<
    { id: string; label: string; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const role = useUserRole();

  useEffect(() => {
    if (!role || role === "admin") return;
    setLoading(true);
    console.log("new hook running bro :D");

    async function fetchSubjects() {
      const table = role === "tutor" ? "tutor_subjects" : "student_subjects";
      const idType = role === "tutor" ? "tutor_id" : "student_id";

      const { data, error } = await supabase
        .from(table)
        .select("subjects(id, label, color)")
        .overrideTypes<{ subjects: SubjectRow }[]>();

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const formatted = data.map((row) => ({
        id: row.subjects.id,
        label: row.subjects.label,
        color: row.subjects.color,
      }));

      setSubjects(formatted);
      setLoading(false);
    }

    fetchSubjects();
  }, [role]);

  return { subjects, loading, error };
}
