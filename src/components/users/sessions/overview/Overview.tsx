import { SessionStats } from "./SessionStats";

export function SessionsOverview({ role }: { role: "tutor" | "student" }) {
  return (
    <section className="space-y-6">
      <SessionStats role={role} />
    </section>
  );
}
