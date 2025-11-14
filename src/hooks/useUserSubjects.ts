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
  const { user, userLoading } = useAuthUser();

  useEffect(() => {
    if (userLoading || !role || role === "admin" || !user) return;
    setLoading(true);

    async function fetchSubjects() {
      const table = role === "tutor" ? "tutor_subjects" : "student_subjects";
      const idType = role === "tutor" ? "tutor_id" : "student_id";

      const { data, error } = await supabase
        .from(table)
        .select("subjects(id, label, color)")
        .eq(idType, user?.id)
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
  }, [role, userLoading, user]);

  return { subjects, loading, error };
}
