"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { subject, useUserSubjects } from "@/hooks/useUserSubjects";
import { useState, useEffect } from "react";
import SubjectTabs from "./SubjectTabs";
import { TutorCards } from "./TutorCards";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";

export default function BrowseTutors() {
  const [tutorCount, setTutorCount] = useState(0);
  const { subjects, loading: subjectLoading, error } = useUserSubjects();
  const [selectedSubject, setSelectedSubject] = useState<subject | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (subjects.length === 0) return;

    const subParam = searchParams.get("sub");

    // 1) If we have ?sub=... → sync it
    if (subParam) {
      const match = subjects.find((s) => s.id === subParam);
      if (match) {
        setSelectedSubject(match);
      }
      return;
    }

    // 2) If there is NO ?sub but user already has a selection → do nothing
    if (selectedSubject) return;

    // 3) FIRST LOAD: Default to first subject
    setSelectedSubject(subjects[0]);
  }, [subjects, searchParams.get("sub")]);

  if (error) console.error(error);

  function handleSetTab(s: subject) {
    setSelectedSubject(s);

    const params = new URLSearchParams(searchParams.toString());
    params.set("sub", s.id);

    router.replace(`${window.location.pathname}?${params.toString()}`);
  }

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
          setSubjectTab={handleSetTab}
        />
      )}

      {selectedSubject?.id && !subjectLoading && (
        <TutorCards setTutorCount={setTutorCount} sid={selectedSubject.id} />
      )}
    </main>
  );
}
