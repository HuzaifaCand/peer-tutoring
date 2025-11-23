import { formatEditType } from "@/components/admin/edit-requests/getEditRequests";
import {
  getButtonClass,
  getInputClass,
  getLabelClass,
} from "@/components/forms/classes";
import { CheckCircle, Trash2 } from "lucide-react";
import { editReqType } from "./EditRequestForm";
import clsx from "clsx";

const inputClass = getInputClass("xs");
const labelClass = getLabelClass("xs");
const buttonClass = getButtonClass("xs");

interface FormProps {
  type: "subject_change" | "availability_change";
  editReq: editReqType;
  payload: {
    what: string;
    why: string;
  };
  setWhat: (s: string) => void;
  setWhy: (s: string) => void;
  loading: boolean;
  handleSubmit: () => void;
  handleDelete: () => void;
}
export function RequestFormUI({
  type,
  editReq,
  payload,
  setWhat,
  setWhy,
  loading,
  handleSubmit,
  handleDelete,
}: FormProps) {
  const { what, why } = payload;
  return (
    <div className="space-y-3 py-4 px-2 sm:px-6 text-textWhite">
      <div className="space-y-2 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Request an Edit</h2>
        {editReq && (
          <p className="text-yellow text-xs">
            You already have a pending edit request.
          </p>
        )}
      </div>

      {/* STATUS NOTICE */}

      <div className="space-y-2 ">
        <label className={labelClass}>Request Type</label>
        <input disabled value={formatEditType(type)} className={inputClass} />
      </div>

      {/* Detailed Changes */}
      <div className="space-y-2">
        <label className={labelClass}>Changes</label>
        <textarea
          rows={2}
          disabled={!!editReq}
          value={what}
          onChange={(e) => setWhat(e.target.value)}
          className={clsx(inputClass)}
        />
      </div>

      {/* Reasons */}
      <div className="space-y-2">
        <label className={labelClass}>Reasons</label>
        <textarea
          rows={2}
          disabled={!!editReq}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          className={clsx(inputClass)}
        />
      </div>

      {/* Action Buttons */}

      <div className="flex justify-end items-center gap-2 mt-6">
        {!editReq ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className={clsx(
              buttonClass,
              "flex items-center gap-1 disabled:opacity-50"
            )}
          >
            <CheckCircle className="w-3 h-3" />
            Submit
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className={clsx(buttonClass, "flex items-center gap-1")}
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
