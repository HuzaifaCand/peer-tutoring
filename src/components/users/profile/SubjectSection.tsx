"use client";

import { useDataFetch } from "@/hooks/useDataFetch";
import { User } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { getStudentSubjects, getTutorSubjects } from "./getSubjects";
import { CardsLoading } from "@/components/card/CardsLoading";
import { SubjectCard } from "./SubejctCard";
import ModalBase from "@/components/modal/ModalBase";
import { EditRequestForm } from "./EditRequestForm";
import { EditRequestButton } from "./EditRequestButton";

export function SubjectSection({
  user,
  role,
}: {
  user: User;
  role: "tutor" | "student";
}) {
  const [modal, setModal] = useState(false);

  const fetchFn = useCallback(
    () =>
      role === "tutor"
        ? getTutorSubjects(user.id)
        : getStudentSubjects(user.id),
    [role, user.id]
  );

  const { data, loading } = useDataFetch(fetchFn);

  if (loading)
    return <CardsLoading layoutClassName="grid grid-cols-1 gap-3" count={2} />;

  return (
    <>
      <ModalBase isOpen={modal} onClose={() => setModal(false)}>
        <EditRequestForm type="subject_change" />
      </ModalBase>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-textWhite">
            Your Subjects
          </h2>
          <EditRequestButton handleOpen={() => setModal(true)} />
        </div>
        <SubjectCard userId={user.id} subjects={data} role={role} />
      </div>
    </>
  );
}
