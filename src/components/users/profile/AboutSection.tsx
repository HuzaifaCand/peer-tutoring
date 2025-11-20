"use client";

import { InlineEditable } from "@/components/ui/InlineEditable";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AboutSection({
  role,
  uid,
}: {
  role: "tutor" | "student";
  uid: string;
}) {
  const [about, setAbout] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getAbout() {
      const { data, error } = await supabase
        .from(`${role}s`)
        .select("about")
        .eq("id", uid)
        .single();

      if (error) {
        console.error("couldnt fetch about", error);
        toast.error("Failed to load profile info.");
      } else {
        setAbout(data.about ?? "");
      }

      setLoaded(true);
    }

    getAbout();
  }, [uid, role]);

  async function updateAbout(newAbout: string) {
    const { error } = await supabase
      .from(`${role}s`)
      .update({ about: newAbout })
      .eq("id", uid);

    if (error) {
      console.error(error);
      toast.error(`Failed to update about.`);
    } else {
      toast.success("About updated successfully.");
      setAbout(newAbout);
    }
  }

  if (!loaded) return null;

  return (
    <InlineEditable
      label="About"
      value={about}
      type="textarea"
      onSave={updateAbout}
    />
  );
}
