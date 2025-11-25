import CountCard from "@/components/CountCard";

export function SessionStats({ role }: { role: "tutor" | "student" }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CountCard
        count={12}
        label={`${role === "tutor" ? "Hours taught" : "Hours learnt"}`}
      />
      <CountCard count={12} label={"Sessions Completed"} />
    </div>
  );
}
