import { ComputedEditRequest } from "./getEditRequests";

interface Props {
  request: ComputedEditRequest;
  handleReject: () => void;
  handleApprove: () => void;
  onClose: () => void;
}
export function RequestModalContent({
  request,
  handleApprove,
  handleReject,
  onClose,
}: Props) {
  return (
    <div className="space-y-6 p-2">
      {/* HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-textWhite">
          Edit Request Details
        </h2>
        <p className="text-sm text-textMuted/70">
          Submitted {request.created_when}
        </p>
      </div>

      {/* GRID INFO */}
      <div className="grid grid-cols-2 gap-y-3 text-xs sm:text-sm">
        <div className="text-textMuted/70">Name</div>
        <div className="text-textWhite">{request.username}</div>

        <div className="text-textMuted/70">Student ID</div>
        <div className="text-textWhite">{request.student_id}</div>

        <div className="text-textMuted/70">Role</div>
        <div className="text-textWhite capitalize">{request.role}</div>

        <div className="text-textMuted/70">Request Type</div>
        <div className="text-textWhite">{request.type}</div>

        <div className="text-textMuted/70">Created On</div>
        <div className="text-textWhite">{request.created_on}</div>

        <div className="text-textMuted/70">Resolved</div>
        <div className="text-textWhite">
          {request.approved == null
            ? "No"
            : request.approved === true
            ? "Yes (Approved)"
            : "Yes (Rejected)"}
        </div>

        {request.resolved_by && (
          <>
            <div className="text-textMuted/70">Resolved By</div>
            <div className="text-textWhite">{request.resolved_by}</div>
          </>
        )}
      </div>

      {/* REQUEST CONTENT */}
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-textWhite">Request</h3>
          <p className="text-sm text-textMuted/80 whitespace-pre-line mt-1">
            {request.request}
          </p>
        </div>

        <div>
          <h3 className="font-medium text-textWhite">Reason</h3>
          <p className="text-sm text-textMuted/80 whitespace-pre-line mt-1">
            {request.reason}
          </p>
        </div>

        {request.approved === false && request.reason && (
          <div>
            <h3 className="font-medium text-red-300">Rejection Reason</h3>
            <p className="text-sm text-red-300/80 whitespace-pre-line mt-1">
              {request.reason}
            </p>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      {request.approved == null && (
        <div className="flex justify-end gap-2 text-sm pt-4">
          <button
            onClick={handleReject}
            className="px-4 py-2 rounded-lg bg-red-500/10 cursor-pointer text-red-300 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/20"
          >
            Reject
          </button>

          <button
            onClick={handleApprove}
            className="px-4 py-2 rounded-lg bg-green-500/10 cursor-pointer text-green-300 hover:bg-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-400/20"
          >
            Approve
          </button>
        </div>
      )}

      {/* CLOSE BUTTON */}
      {request.approved != null && (
        <div className="flex justify-end text-sm pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-elevatedBg text-textMuted hover:bg-hoverBg focus:ring-2 focus:outline-none cursor-pointer focus:ring-white/20"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
