"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { bg } from "@/components/LoginComponent";
import Loading from "@/components/Loading";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = session?.user;

        if (!user?.email?.endsWith("@cedar.edu.pk")) {
          await supabase.auth.signOut();
          toast.error("Please login with your Cedar email");
          router.replace("/login");
          return;
        }

        router.replace("/");
      } catch (err) {
        console.error("Error during auth callback:", err);
        router.replace("/login");
      }
    };

    handleAuthRedirect();
  }, [router]);

  return <Loading bg={bg} />;
}
