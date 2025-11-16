import { useForm } from "react-hook-form";
import { getButtonClass, getInputClass, getLabelClass } from "../classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddResourceData, addResourceSchema } from "./AddResourceSchema";
import SubjectInput from "../fields/SubjectInput";
import { subjectOptions } from "@/lib/constants/subjects";
import clsx from "clsx";
import { User } from "@supabase/supabase-js";

interface ResourceFormProps {
  onSubmit: (data: AddResourceData) => void;
  userLoading: boolean;
  user: User | null;
}

const inputClass = getInputClass("xs");
const labelClass = getLabelClass("xs");
const buttonClass = getButtonClass("xs");
export function ResourceForm({
  onSubmit,
  user,
  userLoading,
}: ResourceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddResourceData>({
    resolver: zodResolver(addResourceSchema),
  });

  const selectedSubjectId = watch("subject");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-sm text-textWhite sm:px-4 py-3"
    >
      {/* Header */}
      <div className="space-y-1 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-textWhite">
          Add Resource
        </h2>
        <p className="text-[11px] pr-16 sm:text-xs text-textMuted/80">
          Help out by sharing resources, you will be listed as the contributor!
        </p>
      </div>
      {/* Subject Input */}
      <div className="space-y-1.5">
        <label className={labelClass}>Subject</label>
        <SubjectInput
          value={selectedSubjectId}
          setValue={(id) => setValue("subject", id, { shouldValidate: true })}
          options={subjectOptions}
          inputClass={inputClass}
        />
        {errors.subject && (
          <p className="text-[10px] text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <label className={labelClass}>Title</label>
        <input
          {...register("title")}
          placeholder="Resource title"
          className={inputClass}
        />
        {errors.title && (
          <p className="text-[10px] text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Link */}
      <div className="space-y-1.5">
        <label className={labelClass}>Link</label>
        <input
          {...register("link")}
          placeholder="https://example.com"
          className={inputClass}
        />
        {errors.link && (
          <p className="text-[10px] text-red-400">{errors.link.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className={labelClass}>Description (Optional)</label>
        <textarea
          {...register("description")}
          placeholder="Short description..."
          rows={3}
          className={clsx(inputClass, "resize-none")}
        />
        {errors.description && (
          <p className="text-[10px] text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting || userLoading || !user}
          className={buttonClass}
        >
          {isSubmitting ? "Submitting..." : "Add Resource"}
        </button>
      </div>
    </form>
  );
}
