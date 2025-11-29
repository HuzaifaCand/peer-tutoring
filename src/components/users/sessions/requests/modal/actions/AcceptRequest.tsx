"use client";
import { FormButton } from "@/components/forms/FormButton";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { UnifiedRequest } from "../../getSessionRequests";
import { AcceptOnsiteRequest } from "./AcceptOnsiteRequest";

export function AcceptRequest({
  type,
  refetch,
  req,
  closeModal,
}: {
  type: "onsite" | "online";
  refetch: () => void;
  req: UnifiedRequest;
  closeModal: () => void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {type === "onsite" && (
        <AcceptOnsiteRequest
          req={req}
          closeModal={closeModal}
          refetch={refetch}
        />
      )}

      {type === "online" && (
        <FormButton
          text="Accept"
          size="sm"
          handleClick={() => {
            toast.message("Online scheduling coming soon.");
          }}
          disabled={loading}
        />
      )}
    </>
  );
}
