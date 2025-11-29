"use client";

import { useState } from "react";
import { getActionButtonClass } from "../sharedUI";
import { CompleteSessionModal } from "./CompleteSessionModal";

export function CompleteSessionButton({
  tutorId,
  sessionId,
  refetch,
}: {
  tutorId: string;
  sessionId: string;
  refetch: () => void;
}) {
  const [completeModal, setCompleteModal] = useState(false);

  return (
    <>
      <CompleteSessionModal
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        sessionId={sessionId}
        tutorId={tutorId}
        refetch={refetch}
      />

      <button
        onClick={() => setCompleteModal(true)}
        className={getActionButtonClass("positive")}
      >
        Complete Session
      </button>
    </>
  );
}
