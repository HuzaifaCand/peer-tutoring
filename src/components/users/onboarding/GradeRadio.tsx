"use client";

import clsx from "clsx";
import { useFormContext } from "react-hook-form";

const radioClass =
  "flex items-center gap-1 sm:gap-2 w-1/2 bg-hoverBg text-textWhite/90 border border-elevatedBg/20 rounded px-3 py-1 text-xs sm:text-sm cursor-pointer relative";

const buttonClass =
  "w-2 h-2 sm:w-2.5 sm:h-2.5 border-2 border-white/10 rounded-full flex-shrink-0 peer-checked:border-blue peer-checked:border-2.5 transition-colors";

export default function GradeRadioField() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col mb-2 w-full">
      <div className="flex items-center gap-2 mb-1">
        <label className="text-textWhite text-xs sm:text-sm tracking-wide">
          Grade
        </label>

        {errors.grade && (
          <p className="text-red-400 text-[10px] mt-0.5">
            {errors.grade.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        {["AS", "A2"].map((grade) => (
          <label key={grade} className={clsx(radioClass)}>
            <input
              type="radio"
              value={grade}
              {...register("grade")}
              className="absolute opacity-0 w-0 h-0 peer"
            />
            <span className={clsx(buttonClass)}></span>
            {grade}
          </label>
        ))}
      </div>
    </div>
  );
}
