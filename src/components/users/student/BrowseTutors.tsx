"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { subject, useUserSubjects } from "@/hooks/useUserSubjects";
import { useState, useEffect } from "react";
import SubjectTabs from "./SubjectTabs";
import { TutorCards } from "./TutorCards";
import Loading from "@/components/Loading";

export default function BrowseTutors() {
  const [tutorCount, setTutorCount] = useState(0);
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
      <SectionHeader
        title="Browse Tutors"
        rightSlot={`${tutorCount} tutor${tutorCount !== 1 ? "s" : ""} found`}
      />
      {subjectLoading && <Loading bg="bg-mainBg" />}
      {!subjectLoading && (
        <SubjectTabs
          subjectTab={selectedSubject}
          subjects={subjects}
          setSubjectTab={setSelectedSubject}
        />
      )}

      {selectedSubject?.id && !subjectLoading && (
        <TutorCards setTutorCount={setTutorCount} sid={selectedSubject.id} />
      )}
    </main>
  );
}
