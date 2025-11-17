import EditRequests from "@/components/admin/edit-requests/EditRequests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resolve Edit Requests",
};
export default function EditRequestsPage() {
  return <EditRequests />;
}
