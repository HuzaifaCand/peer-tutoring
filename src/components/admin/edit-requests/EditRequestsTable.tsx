"use client";

import { Table } from "@/components/table/Table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditRequestColumns } from "./EditRequestColumns";
import { useDataFetch } from "@/hooks/useDataFetch";
import {
  ComputedEditRequest,
  getEditRequest,
  getEditRequests,
} from "./getEditRequests";
import { useModalOpener } from "@/components/modal/useModalOpener";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { Modal } from "@/components/modal/ModalComponent";

function getResolvePriority(r: ComputedEditRequest) {
  if (r.approved === null) return 0;
  if (r.approved === false) return 1;
  return 2;
}

const editRequestSorter = (a: ComputedEditRequest, b: ComputedEditRequest) => {
  const prioA = getResolvePriority(a);
  const prioB = getResolvePriority(b);

  // First compare priority
  if (prioA !== prioB) return prioA - prioB;

  // Within each group: oldest first
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
};

export default function EditRequestsTable({
  setRows,
}: {
  setRows: Dispatch<SetStateAction<number>>;
}) {
  const [selectedRequest, setSelectedRequest] =
    useState<ComputedEditRequest | null>(null);

  // create sort fn, resolved = null at the top, resolved = false in the middle, resolved = true at the bottom and then sort by created_at
  const { data, loading, setRefetchFlag } = useDataFetch(getEditRequests, {
    sortFn: editRequestSorter,
  });

  const closeModal = useCloseModal(setSelectedRequest);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      const getReq = async () => {
        const data = await getEditRequest(id);
        setSelectedRequest(data);
      };
      getReq();
    }
  }, []);

  const { handleOpen } = useModalOpener<ComputedEditRequest>(
    setSelectedRequest,
    "id"
  );

  const handleClick = (t: ComputedEditRequest) => handleOpen(t);

  return (
    <>
      <Modal
        type="editRequest"
        data={selectedRequest}
        onClose={closeModal}
        refetchTable={() => setRefetchFlag(true)}
      />
      <Table
        data={data}
        loading={loading}
        setRefetchFlag={setRefetchFlag}
        type="editRequest"
        columns={EditRequestColumns}
        setRowCount={setRows}
        onRowClick={handleClick}
      />
    </>
  );
}
