"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { subject, useUserSubjects } from "@/hooks/useUserSubjects";
import { useState, useEffect } from "react";
import SubjectTabs from "./SubjectTabs";
import { TutorCards } from "./TutorCards";
import TextLoader from "@/components/ui/TextLoader";

export default function BrowseTutors() {
  const { subjects, loading: subjectLoading, error } = useUserSubjects();
  const [selectedSubject, setSelectedSubject] = useState<subject | null>(null);

  useEffect(() => {
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects, selectedSubject]);

  if (error) console.error(error);

  return (
    <main>
      <SectionHeader title="Browse Tutors" />
      {!subjectLoading && (
        <SubjectTabs
          subjectTab={selectedSubject}
          subjects={subjects}
          setSubjectTab={setSelectedSubject}
        />
      )}

      {selectedSubject?.id && !subjectLoading && (
        <TutorCards sid={selectedSubject.id} />
      )}
    </main>
  );
}
