import { SharedPropsType } from "../SessionsMain";
import { SessionStats } from "./SessionStats";

export function SessionsOverview({
  sharedProps,
}: {
  sharedProps: SharedPropsType;
}) {
  const { userId, role } = sharedProps;
  return (
    <section className="space-y-6">
      <SessionStats role={role} userId={userId} />
    </section>
  );
}
