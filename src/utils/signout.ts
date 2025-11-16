import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function useSignOut() {
  const router = useRouter();

  return async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };
}
