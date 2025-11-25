import EditRequests from "@/components/admin/edit-requests/EditRequests";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Resolve Edit Requests",
};
export default function EditRequestsPage() {
  return (
    <Suspense fallback={null}>
      <EditRequests />
    </Suspense>
  );
}
