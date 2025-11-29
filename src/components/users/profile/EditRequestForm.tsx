"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RequestFormUI } from "./RequestFormUI";

export type editReqType = {
  id: string;
  payload: { what: string; why: string };
  approved: boolean | null;
} | null;

export function EditRequestForm({
  type,
  uid,
  setModal,
}: {
  type: "subject_change" | "availability_change";
  uid: string;
  setModal: (modal: boolean) => void;
}) {
  const [editReq, setEditReq] = useState<editReqType>(null);

  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // FETCH EXISTING REQUEST
  // ----------------------------
  useEffect(() => {
    let ignore = false;

    async function fetchEditRequest() {
      const { data, error } = await supabase
        .from("edit_requests")
        .select("*")
        .eq("user_id", uid)
        .eq("type", type)
        .is("approved", null) // pending only
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        toast.error("Failed to fetch edit request");
        console.error("edit request fetch error:", error);
        return;
      }

      if (!ignore) {
        const row = data?.[0] ?? null;
        setEditReq(row);

        if (row) {
          setWhat(row.payload.what);
          setWhy(row.payload.why);
        }
      }
    }

    fetchEditRequest();
    return () => {
      ignore = true;
    };
  }, [uid, type]);

  // ----------------------------
  // SUBMIT NEW REQUEST
  // ----------------------------
  async function handleSubmit() {
    if (!what.trim() || !why.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("edit_requests")
      .insert({
        user_id: uid,
        type,
        payload: { what, why },
        approved: null,
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error("submit edit request error:", error);
      toast.error("Failed to submit request.");
      return;
    }

    toast.success("Edit request submitted.");
    setEditReq(null);
    setModal(false);
  }

  // ----------------------------
  // DELETE PENDING REQUEST
  // ----------------------------
  async function handleDelete() {
    if (!editReq) return;

    setLoading(true);

    const { error } = await supabase
      .from("edit_requests")
      .delete()
      .eq("id", editReq.id);

    setLoading(false);

    if (error) {
      console.error("delete error:", error);
      toast.error("Failed to delete request.");
      return;
    }

    toast.success("Request deleted.");
    setModal(false);
  }

  return (
    <RequestFormUI
      editReq={editReq}
      setWhat={setWhat}
      setWhy={setWhy}
      payload={{ what, why }}
      loading={loading}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      type={type}
    />
  );
}
