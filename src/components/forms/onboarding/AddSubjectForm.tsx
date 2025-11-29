"use client";

import { useState } from "react";
import SubjectInput, {
  SubjectOption,
} from "@/components/forms/fields/SubjectInput";
import { SUBJECTS } from "@/lib/constants/subjects"; // adjust import path
import clsx from "clsx";
import { getAddSubjectSchema } from "./OnboardingSchema";
import { SubjectRow } from "@/lib/computedtypes";
import { SubjectSelect } from "@/components/users/onboarding/OnboardingComponent";
import { getInputClass, getLabelClass } from "../classes";
import { FormButton } from "../FormButton";

interface AddSubjectFormProps {
  role: "student" | "tutor";
  onAdd: (subject: SubjectSelect) => void;
  onClose: () => void;
  availableSubjects: SubjectOption[];
}

const inputClass = getInputClass("sm");
const labelClass = getLabelClass("sm");

export default function AddSubjectForm({
  role,
  onAdd,
  onClose,
  availableSubjects,
}: AddSubjectFormProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectRow | null>(
    null
  ); // subject_id
  const [subtitle, setSubtitle] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; subtitle?: string }>(
    {}
  );

  const handleSelect = (id: string) => {
    const found = SUBJECTS.find((s) => s.id === id) || null;
    setSelectedSubject(found);
  };

  const handleAdd = () => {
    const schema = getAddSubjectSchema(role);
    const result = schema.safeParse({
      subject: selectedSubject,
      subtitle,
    });

    if (!result.success) {
      // Extract errors and map them by field name
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        subject: fieldErrors.subject?.[0],
        subtitle: fieldErrors.subtitle?.[0],
      });
      return;
    }

    setErrors({}); // clear errors on success
    const { subject, subtitle: cleanSubtitle } = result.data;

    onAdd({
      subject,
      subtitle: cleanSubtitle ?? null,
    });

    onClose();
  };

  return (
    <div className="space-y-5 py-4 px-2 sm:px-6 text-textWhite">
      <header className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold">Add a Subject</h2>
      </header>

      {/* Subject Picker */}
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <label className={clsx(labelClass)}>Subject</label>
          {errors.subject && (
            <span className="text-xs text-red-400">{errors.subject}</span>
          )}
        </div>

        <SubjectInput
          value={selectedSubject?.id}
          setValue={handleSelect}
          options={availableSubjects}
          inputClass={clsx(inputClass)}
        />
      </div>

      {/* Credential / Note Area */}
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <label className={clsx(labelClass)}>
            {role === "tutor" ? "Credentials" : "Notes"}{" "}
            <span className="text-textMuted/70">
              {role === "tutor" ? "(Recommended)" : "(Optional)"}
            </span>
          </label>
          {errors.subtitle && (
            <span className="text-xs text-red-400">{errors.subtitle}</span>
          )}
        </div>

        <textarea
          rows={3}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder={
            role === "tutor"
              ? "e.g. Achieved A in AS Physics."
              : "e.g. Need help understanding organic chemistry."
          }
          className={clsx(
            inputClass,
            "placeholder-textMuted/40",
            errors.subtitle && "border-red-500 focus:ring-red-500/50"
          )}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        <FormButton text="Add" size="sm" handleClick={handleAdd} />
      </div>
    </div>
  );
}
