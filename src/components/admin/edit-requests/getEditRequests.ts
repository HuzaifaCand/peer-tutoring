import { EditRequestWithUserWithAdmin } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";
import { format, formatDistanceToNow, parseISO } from "date-fns";

type payload = {
  what: string;
  why: string;
};

export const formatEditType = (type: string) => {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};
const select = `  
      *, users:users!edit_requests_user_id_fkey(full_name, role, email), admin:users!edit_requests_admin_id_fkey(full_name)
    `;

const formatEditRequest = (e: EditRequestWithUserWithAdmin) => {
  return {
    id: e.id,
    approved: e.approved,
    resolved_by: e.admin?.full_name,
    request: (e.payload as payload)?.what,
    reason: (e.payload as payload)?.why,
    type: formatEditType(e.type),
    username: e.users.full_name.split(" ").slice(0, -1).join(" "),
    student_id: e.users.email.split("@")[0],
    role: e.users.role,
    created_when: formatDistanceToNow(parseISO(e.created_at), {
      addSuffix: true,
    }),
    created_on: format(parseISO(e.created_at), "EEE, MMM d, p"),
    created_at: e.created_at,
  };
};
export async function getEditRequests() {
  const { data, error } = await supabase
    .from("edit_requests")
    .select(select)
    .overrideTypes<EditRequestWithUserWithAdmin[]>();

  if (error) console.error("Error fetching requests", error);

  const formatted = data?.map(formatEditRequest) || [];
  return formatted;
}

export type ComputedEditRequest = Awaited<
  ReturnType<typeof getEditRequests>
>[number];

export async function getEditRequest(request_id: string) {
  const { data, error } = await supabase
    .from("edit_requests")
    .select(select)
    .eq("id", request_id)
    .single();

  if (error) console.error("Error fetching requests", error);

  if (!data) return null;
  return formatEditRequest(data as EditRequestWithUserWithAdmin);
}
