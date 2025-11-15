"use client";

import { useState } from "react";
import SubjectCardList from "./SubjectCardList";
import { SubjectSelect } from "./OnboardingComponent";
import { toast } from "sonner";
import ModalBase from "@/components/modal/ModalBase";
import AddSubjectForm from "@/components/forms/onboarding/AddSubjectForm";
import { subjectOptions } from "@/lib/constants/subjects";
import { useFormContext } from "react-hook-form";

interface SubjectsSelectionProps {
  role: "tutor" | "student";
}

export function SubjectsSelection({ role }: SubjectsSelectionProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const subjects: SubjectSelect[] = watch("subjects");

  const [showModal, setShowModal] = useState(false);

  const availableSubjectOptions = subjectOptions.filter(
    (opt) => !subjects.some((added) => added.subject?.id === opt.id)
  );

  const handleAdd = (subject: SubjectSelect) => {
    setValue("subjects", [...subjects, subject], { shouldValidate: true });
    toast.success(`${subject.subject?.label} added`);
  };

  const handleRemove = (id: string) => {
    setValue(
      "subjects",
      subjects.filter((s) => s.subject?.id !== id),
      { shouldValidate: true }
    );
    toast.success("Subject removed");
  };

  return (
    <section className="mt-6 space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg sm:text-xl font-medium text-textWhite">
          {role === "student"
            ? "Subjects You Want To Learn"
            : "Subjects You Want To Teach"}
        </h2>
        {errors.subjects?.message && (
          <p className="text-red-400 text-xs mt-1">
            {errors.subjects.message.toString()}
          </p>
        )}
      </div>

      <SubjectCardList
        role={role}
        subjects={subjects}
        onAdd={() => setShowModal(true)}
        onRemove={handleRemove}
      />

      <ModalBase isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddSubjectForm
          role={role}
          availableSubjects={availableSubjectOptions}
          onAdd={(subj) => {
            handleAdd(subj);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      </ModalBase>
    </section>
  );
}
