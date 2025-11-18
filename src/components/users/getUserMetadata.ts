import { User } from "@supabase/supabase-js";

export function getUserMetadata(user: User) {
  const googleName = user.user_metadata.full_name;
  const displayName = googleName.split(" ").slice(0, -1).join(" ");
  const email = user.user_metadata.email;
  const studentId = email.split("@")[0];

  return { displayName, studentId, email };
}
