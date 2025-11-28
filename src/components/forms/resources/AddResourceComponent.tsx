"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { refetchFlagType } from "@/components/table/types";
import { AddResourceData } from "./AddResourceSchema";
import { ResourceForm } from "./ResourceForm";

export function AddResourceForm({
  closeModal,
  setRefetchFlag,
}: {
  closeModal: () => void;
  setRefetchFlag: refetchFlagType;
}) {
  const { user, userLoading } = useAuthUser();

  async function onSubmit(data: AddResourceData) {
    if (!user) {
      toast.error("Couldnt authenticate");
      return;
    }

    if (!data.link.startsWith("http")) {
      data.link = "https://" + data.link;
    }

    const { error } = await supabase.from("resources").insert({
      added_by: user.id,
      subject: data.subject,
      title: data.title,
      description: data.description || null,
      link: data.link,
    });

    if (error?.code === "23505") {
      toast.error("Resource already exists. No need to add it again!");
      return;
    }

    if (error) {
      console.error(error);
      toast.error("Submission failed.");
      return;
    }

    closeModal();
    setRefetchFlag(true);
    toast.success("Resource added!");
  }

  return (
    <ResourceForm onSubmit={onSubmit} userLoading={userLoading} user={user} />
  );
}
