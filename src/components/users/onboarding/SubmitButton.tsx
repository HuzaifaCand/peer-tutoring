import { Loader2 } from "lucide-react";

export function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="w-full mt-8">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 sm:py-3.5 cursor-pointer rounded-xl bg-white/5 text-textWhite font-medium active:scale-98 transition"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting
          </span>
        ) : (
          "Complete Onboarding"
        )}
      </button>
    </div>
  );
}
