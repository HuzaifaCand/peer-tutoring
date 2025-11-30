import { Filter } from "@/components/Filter";
import { VerificationStatus } from "@/utils/sortUtils";

export type status = "all" | VerificationStatus;

export function VerificationFilter({
  verificationFilter,
}: {
  verificationFilter: { value: status; setValue: (v: status) => void };
}) {
  const options = [
    {
      key: "unverified",
      label: "Unverified",
      color: "bg-gray-500/20 text-gray-300 border-gray-400/20",
    },
    {
      key: "verified",
      label: "Verified",
      color: "bg-green-500/20 text-green-300 border-green-400/20",
    },
    {
      key: "rejected",
      label: "Rejected",
      color: "bg-red-500/20 text-red-300 border-red-400/20",
    },
  ] as const;

  return (
    <Filter
      options={options}
      value={verificationFilter.value}
      setValue={verificationFilter.setValue}
    />
  );
}
