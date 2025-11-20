import { useFormContext } from "react-hook-form";
import { OnlineAvailabilityUI } from "./OnlineAvailabilityUI";

export function OnlineAvailability() {
  const { watch, setValue } = useFormContext();
  const online = watch("available_online", true);

  return (
    <section className="mt-6 space-y-4">
      <OnlineAvailabilityUI
        online={online}
        onToggle={() => setValue("available_online", !online)}
      />

      <p className="text-xs text-textMuted/70 px-1">
        You can change this anytime later
      </p>
    </section>
  );
}
