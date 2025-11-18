import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export function AboutInput({ role }: { role: "student" | "tutor" }) {
  const { register } = useFormContext();

  return (
    <section className="mt-6 space-y-3">
      <label className="text-lg sm:text-xl font-medium text-textWhite">
        About <span className="text-textMuted/70">(Optional)</span>
      </label>
      <textarea
        {...register("about")}
        placeholder={`Enter some information about yourself that will help other ${role}s discover you`}
        className={clsx(
          "w-full rounded-lg placeholder-textMuted/40 border-2 border-hoverBg p-2.5 text-xs sm:text-sm text-textWhite focus:outline-none focus:ring-1 focus:ring-white/10",
          "min-h-30 py-2 px-3 mt-4"
        )}
      />
    </section>
  );
}
