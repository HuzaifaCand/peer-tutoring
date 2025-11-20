"use client";

import { useState } from "react";

import { EditRequestButton } from "./EditRequestButton";
import { TutorSlots } from "./TutorSlots";
import { OnlineAvailability } from "./OnlineAvailability";
import ModalBase from "@/components/modal/ModalBase";
import { EditRequestForm } from "./EditRequestForm";

export function AvailabilitySection({ tutorId }: { tutorId: string }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <ModalBase isOpen={modal} onClose={() => setModal(false)}>
        <EditRequestForm
          uid={tutorId}
          setModal={setModal}
          type="availability_change"
        />
      </ModalBase>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-textWhite">
            Your Availability
          </h2>
          <EditRequestButton handleOpen={() => setModal(true)} />
        </div>

        <TutorSlots tutorId={tutorId} />
        <OnlineAvailability tutorId={tutorId} />
      </div>
    </>
  );
}
