"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SubjectInput, {
  SubjectOption,
} from "@/components/forms/fields/SubjectInput";
import { SUBJECTS } from "@/lib/constants/subjects"; // adjust import path
import clsx from "clsx";
import { toast } from "sonner";
import { getAddSubjectSchema } from "./OnboardingSchema";
import { SubjectRow } from "@/lib/computedtypes";
import { SubjectSelect } from "@/components/users/onboarding/OnboardingComponent";
import { getButtonClass, getInputClass, getLabelClass } from "../classes";

interface AddSubjectFormProps {
  role: "student" | "tutor";
  onAdd: (subject: SubjectSelect) => void;
  onClose: () => void;
  availableSubjects: SubjectOption[];
}

const inputClass = getInputClass("sm");
const labelClass = getLabelClass("sm");
const buttonClass = getButtonClass("sm");

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

    toast.success(`${subject?.label} added`);
    onClose();
  };

  return (
    <div className="space-y-5 py-4 px-6 text-textWhite">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold">
          {role === "tutor"
            ? "Add a Subject to Teach"
            : "Add a Subject to Learn"}
        </h2>
        <p className="text-sm text-textMuted">
          {role === "tutor"
            ? "Add your subject and credentials below. You can change these later."
            : "Add your subject and mention anything . You can change these later."}
        </p>
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
            <span className="text-textMuted/70">(Optional)</span>
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
        <button
          type="button"
          onClick={handleAdd}
          className={clsx(
            buttonClass,
            "flex items-center gap-1 bg-green-600 hover:bg-green-700"
          )}
        >
          <Check className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
}
