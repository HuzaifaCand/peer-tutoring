import { User } from "@supabase/supabase-js";

export function getUserMetadata(user: User) {
  const googleName = user.user_metadata.full_name;
  const displayName = googleName.split(" ").slice(0, -1).join(" ");
  const studentId =
    user.email?.split("@")[0] || googleName.split(" ").slice(-1);

  return { displayName, studentId };
}
