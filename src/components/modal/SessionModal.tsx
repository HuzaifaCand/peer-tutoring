import { ComputedActiveSession } from "../admin/sessions/active/getActiveSessions";

export function SessionModal({
  session,
  type,
  onClose,
}: {
  session: ComputedActiveSession;
  type: string;
  onClose: () => void;
}) {
  return (
    <div>
      <header className="flex justify-between text-textWhite items-center mb-4">
        <h2 className="text-lg font-semibold">{session.subject}</h2>
        <span
          className={`px-2 py-1 rounded ${
            session.is_online ? "bg-blue-500/20" : "bg-yellow-500/20"
          }`}
        >
          {session.mode}
        </span>
      </header>

      <footer className="mt-6 flex justify-end text-textWhite">
        <button onClick={onClose}>Close</button>
      </footer>
    </div>
  );
}
