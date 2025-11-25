import SessionsMain from "@/components/users/sessions/SessionsMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Sessions",
};

export default function SessionsPage() {
  return <SessionsMain role="student" />;
}
