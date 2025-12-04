import { ResourceRow, SubjectRow, UserRow } from "@/lib/computedtypes";
import { supabase } from "@/lib/supabase/client";

export type Resource = ResourceRow & {
  subjects: SubjectRow;
  users: Pick<UserRow, "full_name" | "role">;
  verified_by_tutor?: {
    users: Pick<UserRow, "full_name">;
  } | null;
};

async function getResources() {
  const { data: resources, error } = await supabase
    .from("resources")
    .select(
      `
        *,
        users:users(full_name, role),
        subjects(id, label, code, color),
        verified_by_tutor:verified_by(users(full_name))
    `
    )
    .order("view_count", { ascending: false })

    .overrideTypes<Resource[]>();

  if (error) {
    console.error("Error fetching resources", error);
    throw error;
  }

  const formatted = resources.map((r) => ({
    id: r.id,
    title: r.title,
    link: r.link,
    desc: r.description,
    views: r.view_count,
    created_at: r.created_at,

    verified: r.verified,
    verified_by:
      r.verified_by_tutor?.users.full_name.split(" ").slice(0, -1).join(" ") ??
      null,

    added_by: r.users.full_name.split(" ").slice(0, -1).join(" "),
    added_by_role: r.users.role,

    subject_id: r.subjects.id,
    subject_code: r.subjects.code,
    subject: r.subjects.label,
    subject_color: r.subjects.color,
    is_curated: false,
  }));

  return formatted;
}

export type ComputedResourceType = Awaited<
  ReturnType<typeof getResources>
>[number];

async function getCuratedResources(): Promise<ComputedResourceType[]> {
  const { data, error } = await supabase
    .from("curated_resources")
    .select(
      `
      *,
      subjects:subjects(id, label, code, color)
    `
    )
    .order("view_count", { ascending: false });

  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    title: r.title,
    link: r.link,
    desc: r.description,
    views: r.view_count,
    created_at: r.created_at,

    verified: true,
    verified_by: "PeerLink",

    added_by: "PeerLink",
    added_by_role: "system",

    subject_id: r.subjects.id,
    subject_code: r.subjects.code,
    subject: r.subjects.label,
    subject_color: r.subjects.color,

    is_curated: true,
  }));
}

export async function getAllResources() {
  const [userResources, curated] = await Promise.all([
    getResources(),
    getCuratedResources(),
  ]);

  return [...curated, ...userResources];
}
