export function FormHeader({ role }: { role: "student" | "tutor" }) {
  return (
    <header>
      <h1 className="text-xl sm:text-2xl font-semibold text-textWhite">
        <span className="capitalize">{role}</span> Onboarding
      </h1>
      <hr className="text-textMuted/10 mt-4 mb-6 w-full" />
    </header>
  );
}
