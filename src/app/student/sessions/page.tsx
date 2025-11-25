import SessionsMain from "@/components/users/sessions/SessionsMain";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Sessions",
};

export default function SessionsPage() {
  return (
    <Suspense fallback={null}>
      <SessionsMain role="student" />
    </Suspense>
  );
}
