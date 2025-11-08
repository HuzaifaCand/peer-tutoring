"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import SubjectInput from "./fields/SubjectInput";
import { subjectOptions } from "@/lib/constants/subjects";

const inputClass =
  "w-full rounded-md bg-elevatedBg px-2.5 py-1.5 text-xs text-textWhite focus:outline-none focus:ring-1 focus:ring-white/10";

const addResourceSchema = z.object({
  subject_id: z
    .string()
    .refine(
      (val) => subjectOptions.some((s) => s.id === val),
      "Please select a valid subject."
    ),
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z
    .string()
    .max(300, "Description must be under 300 characters.")
    .optional()
    .or(z.literal("")),
  link: z
    .string()
    .min(1, "Link is required.")
    .refine(
      (val) => {
        const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/?#].*)?$/i;
        return pattern.test(val);
      },
      { message: "Please enter a valid URL." }
    ),
});

type AddResourceData = z.infer<typeof addResourceSchema>;

export function AddResourceForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddResourceData>({
    resolver: zodResolver(addResourceSchema),
  });

  const selectedSubjectId = watch("subject_id");

  async function onSubmit(data: AddResourceData) {
    if (!data.link.startsWith("http")) data.link = `https://${data.link}`;
    console.log("Submitted:", data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 text-sm text-textWhite px-3 py-2"
    >
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-textWhite">Add Resource</h2>
        <p className="text-[11px] sm:text-xs text-textMuted/80">
          Help out your peers by sharing a useful resource, your name will be
          listed as the contributor!
        </p>
      </div>
      {/* Subject Input */}
      <div className="space-y-1.5">
        <label className="block text-textMuted text-xs font-medium">
          Subject
        </label>
        <SubjectInput
          value={selectedSubjectId}
          setValue={(id) =>
            setValue("subject_id", id, { shouldValidate: true })
          }
          options={subjectOptions}
          inputClass={inputClass}
        />
        {errors.subject_id && (
          <p className="text-[10px] text-red-400">
            {errors.subject_id.message}
          </p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <label className="block text-textMuted text-xs font-medium">
          Title
        </label>
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
        <label className="block text-textMuted text-xs font-medium">Link</label>
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
        <label className="block text-textMuted text-xs font-medium">
          Description (Optional)
        </label>
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
          disabled={isSubmitting}
          className="px-4 py-1.5 bg-hoverBg hover:bg-white/10 hover:cursor-pointer text-textWhite/90 border border-white/10 text-sm rounded-md font-medium transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Add Resource"}
        </button>
      </div>
    </form>
  );
}
