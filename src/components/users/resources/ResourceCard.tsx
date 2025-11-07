"use client";

import { CardShell } from "@/components/card/CardShell";
import { colors, Tag } from "@/components/ui/Tag";
import { ExternalLink, Verified, Clock } from "lucide-react";
import { ComputedResourceType } from "./getResources";
import { supabase } from "@/lib/supabase/client";

interface ResourceCardProps {
  resource: ComputedResourceType;
}

// add the verifying ability after adding the auths or at some point later down the line, actually might as well seed it right now

async function incrementResourceView(resourceId: string) {
  const { error } = await supabase.rpc("increment_resource_views", {
    resource_id: resourceId,
  });
  if (error) console.error("Failed to increment view count:", error);
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isTutor = resource.added_by_role === "tutor";
  const isVerified = resource.verified || isTutor;

  return (
    <CardShell>
      {/* Header */}
      <header className="flex justify-between items-center mb-2">
        <div className="flex flex-wrap items-center gap-1">
          <Tag
            value={resource.subject}
            color={resource.subject_color as colors}
            font="font-medium"
          />
          <Tag value={resource.subject_code} color="gray" font="font-medium" />
        </div>

        {isVerified ? (
          <div title="Verified Resource">
            <Verified className="text-green-400 w-4.5 h-4.5" />
          </div>
        ) : (
          <div title="Pending Verification">
            <Clock className="text-yellow-400 w-4.5 h-4.5" />
          </div>
        )}
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

        {!isTutor && resource.verified_by && (
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
          color="teal"
        />

        <div className="flex items-center gap-2">
          {/**user.role === "tutor" && resource.verified !== true && (
         * 
        ) */}
          {/* <button
            className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-medium
               text-green-400 bg-green-500/20 border border-white/10 rounded-md
               hover:bg-green-700/60 transition-all duration-200"
          >
            Verify
          </button> */}
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              incrementResourceView(resource.id).catch(console.error)
            }
            className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm font-medium
               text-white bg-elevatedBg border border-white/10 rounded-md
               hover:bg-hoverBg transition-all duration-200"
          >
            <ExternalLink size={14} />
            View
          </a>
        </div>
      </footer>
    </CardShell>
  );
}
