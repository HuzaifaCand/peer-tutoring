import { getInputClass, getLabelClass } from "@/components/forms/classes";
import clsx from "clsx";

export function MessageField({
  msg,
}: {
  msg: { message: string; setMessage: (m: string) => void };
}) {
  return (
    <div className="pt-3">
      <label className={getLabelClass("sm")}>Message</label>
      <textarea
        value={msg.message}
        onChange={(e) => msg.setMessage(e.target.value)}
        placeholder="Optional: Tell the tutor what you need help with"
        className={clsx(getInputClass("sm"), "mt-2")}
        rows={4}
      />
    </div>
  );
}
