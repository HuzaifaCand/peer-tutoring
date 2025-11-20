import { formatEditType } from "@/components/admin/edit-requests/getEditRequests";
import {
  getButtonClass,
  getInputClass,
  getLabelClass,
} from "@/components/forms/classes";
import clsx from "clsx";
import { Check } from "lucide-react";

const inputClass = getInputClass("xs");
const labelClass = getLabelClass("xs");
const buttonClass = getButtonClass("xs");

export function EditRequestForm({
  type,
}: {
  type: "subject_change" | "availability_change";
}) {
  return (
    <div className="space-y-3 py-4 px-2 sm:px-6 text-textWhite">
      <div className="space-y-1 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Request an Edit</h2>
      </div>

      <div className="space-y-2 ">
        <div className="flex gap-2 items-center">
          <label className={clsx(labelClass)}>Request Type</label>
        </div>

        <input
          disabled
          value={formatEditType(type)}
          className={clsx(inputClass)}
        />
      </div>

      {/* Subject Picker */}
      <div className="space-y-2 ">
        <div className="flex gap-2 items-center">
          <label className={clsx(labelClass)}>Detailed Changes</label>
        </div>

        <textarea
          rows={2}
          className={clsx(inputClass, "placeholder-textMuted/40")}
        />
      </div>

      {/* Credential / Note Area */}
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <label className={clsx(labelClass)}>Reasons</label>
        </div>

        <textarea
          rows={3}
          className={clsx(inputClass, "placeholder-textMuted/40")}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className={clsx(
            buttonClass,
            "flex items-center gap-1 bg-green-600 hover:bg-green-700"
          )}
        >
          <Check className="w-4 h-4" />
          Submit
        </button>
      </div>
    </div>
  );
}
