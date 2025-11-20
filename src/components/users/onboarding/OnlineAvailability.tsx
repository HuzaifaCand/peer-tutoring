import { useFormContext } from "react-hook-form";

export function OnlineAvailability() {
  const { watch, setValue } = useFormContext();
  const online = watch("available_online", true);

  return (
    <section className="mt-6 space-y-4">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-elevatedBg">
        <div className="flex flex-col gap-1">
          <span className="text-textWhite font-medium text-sm">
            Online availability
          </span>
          <span className="text-textMuted text-xs">
            Students {online ? "will" : "won't"} be able to request online
            sessions with you.
          </span>
        </div>

        {/* Toggle */}
        <button
          type="button"
          aria-pressed={online}
          onClick={() => setValue("available_online", !online)}
          className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
            online ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <span
            className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
              online ? "translate-x-1" : "-translate-x-5"
            }`}
          />
        </button>
      </div>

      <p className="text-xs text-textMuted/70 px-1">
        You can change this anytime later
      </p>
    </section>
  );
}
