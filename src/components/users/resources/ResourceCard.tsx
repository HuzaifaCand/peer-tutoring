"use client";

import { CardShell } from "@/components/card/CardShell";
import { colors, Tag } from "@/components/ui/Tag";
import { ExternalLink, Verified, Clock, Copy } from "lucide-react";
import { ComputedResourceType } from "./getResources";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getActionButtonClass } from "../sessions/sharedUI";

interface ResourceCardProps {
  resource: ComputedResourceType;
  refetch: () => void;
}

async function incrementResourceView(resourceId: string) {
  const { data, error } = await supabase.rpc("increment_resource_view_count", {
    resource_id: resourceId,
  });

  if (error) {
    console.error("Failed to increment view count:", error);
  } else {
    console.log("New view count:", data);
  }
}

export function ResourceCard({ resource, refetch }: ResourceCardProps) {
  const [resourceData, setResourceData] = useState<ComputedResourceType | null>(
    null
  );
  const isTutorUser = useUserRole() === "tutor";
  const { user } = useAuthUser();
  if (!user) return null;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resource.link);
      toast.success("Link copied!");
    } catch (err) {
      toast.error("Failed to copy link. Try Again");
      console.error("Clipboard error:", err);
    }
  }

  async function handleVerify(resourceId: string) {
    if (!user) return;
    const { data, error } = await supabase
      .from("resources")
      .update({ verified: true, verified_by: user.id })
      .eq("id", resourceId)
      .select("id")
      .maybeSingle();

    if (error || !data) {
      console.error(error);
      toast.error(
        "You cannot verify this resource. The subject is not assigned to you."
      );
      return;
    }

    toast.success("Resource verified successfully");

    setResourceData(null);
    refetch();
  }

  const addedByTutor = resource.added_by_role === "tutor";
  const isVerified = resource.verified || addedByTutor;

  return (
    <CardShell>
      {/* Header */}

      <ConfirmationModal
        isOpen={!!resourceData && isTutorUser}
        type="positive"
        title="Are you sure you want to verify this resource?"
        description="This will mark the resource as verified and your name will be visible as the verifier."
        onCancel={() => setResourceData(null)}
        onConfirm={() => handleVerify(resource.id)}
      />

      <header className="flex justify-between items-center mb-2">
        <div className="flex flex-wrap items-center gap-1">
          <Tag
            value={resource.subject}
            color={resource.subject_color as colors}
            font="font-medium"
          />
          <Tag value={resource.subject_code} color="muted" />
        </div>
        <div className="flex items-center gap-3">
          {isVerified ? (
            <div title="Verified Resource">
              <Verified className="text-green-400 w-4.5 h-4.5" />
            </div>
          ) : (
            <div title="Pending Verification">
              <Clock className="text-yellow-400 w-4.5 h-4.5" />
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <section className="py-4 space-y-1">
        <h3 className="text-textWhite font-semibold text-base line-clamp-1">
          {resource.title}
        </h3>
        {resource.desc && (
          <p className="text-[11px] sm:text-xs text-textMuted/80 line-clamp-2">
            {resource.desc}
          </p>
        )}
      </section>

      {/* Meta info */}
      <section className="text-[10px] sm:text-xs text-textMuted flex flex-col sm:flex-row sm:justify-between pt-2">
        <span>
          Added by{" "}
          <span className="font-medium text-textWhite">
            {resource.added_by}
          </span>{" "}
          ({resource.added_by_role})
        </span>

        {!addedByTutor && resource.verified_by && (
          <span>
            Verified by{" "}
            <span className="font-medium text-textWhite">
              {resource.verified_by}
            </span>
          </span>
        )}
      </section>

      {/* Footer (views + button) */}

      <footer className="flex justify-between items-center border-t border-white/10 pt-3 mt-3">
        <Tag
          textSize="text-[11px]"
          value={`${resource.views} views`}
          color="gray"
        />

        <div className="flex items-center gap-2">
          {isTutorUser && !resource.verified && (
            <button
              onClick={() => setResourceData(resource)}
              className={getActionButtonClass("positive")}
            >
              Verify
            </button>
          )}

          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              incrementResourceView(resource.id).catch(console.error)
            }
            className="flex items-center gap-1 px-3 py-1 text-[11px] sm:text-xs font-medium
               text-textButton/90 bg-elevatedBg border border-white/10 rounded-md
               hover:bg-hoverBg transition-all duration-200 focus:outline-none focus:bg-hoverBg focus:ring-2 focus:ring-white/10"
          >
            <ExternalLink size={13} />
            View
          </a>
          <div title="Copy Link" onClick={handleCopy}>
            <Copy
              size={13}
              className="text-textWhite hover:cursor-pointer hover:text-textButton"
            />
          </div>
        </div>
      </footer>
    </CardShell>
  );
}
