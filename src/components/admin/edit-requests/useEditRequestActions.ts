import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabase/client";

export function useEditRequestActions(requestId: string) {
  const { user, userLoading } = useAuthUser();

  async function approve() {
    if (!user || userLoading) return;
    return supabase
      .from("edit_requests")
      .update({
        approved: true,
        admin_id: user.id,
        rejection_reason: null,
      })
      .eq("id", requestId);
  }

  async function reject(reason: string) {
    if (!user || userLoading) return;
    return supabase
      .from("edit_requests")
      .update({
        approved: false,
        admin_id: user.id,
        rejection_reason: reason.trim(),
      })
      .eq("id", requestId);
  }

  return { approve, reject };
}
