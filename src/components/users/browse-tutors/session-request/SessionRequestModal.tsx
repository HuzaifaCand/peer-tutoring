"use client";

import ModalBase from "@/components/modal/ModalBase";
import { SlotsRow } from "@/lib/computedtypes";
import { Dispatch, SetStateAction, useState } from "react";
import { OnsiteForm } from "./onsite/OnsiteForm";
import { OnlineForm } from "./online/OnlineForm";
import { ToggleModeBar } from "./ToggleMode";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Loader, Loader2 } from "lucide-react";

interface ReqModalProps {
  reqModal: boolean;
  setReqModal: Dispatch<SetStateAction<boolean>>;
  slots: SlotsRow[];
  online: boolean;
  tutorId: string;
  subjectId: string;
  subjectLabel: string;
}

export function SessionRequestModal({
  reqModal,
  setReqModal,
  slots,
  online,
  tutorId,
  subjectId,
  subjectLabel,
}: ReqModalProps) {
  const [mode, setMode] = useState<"online" | "onsite">("onsite");

  const { user, userLoading } = useAuthUser();

  const sharedLoad = {
    subjectLabel,
    subjectId,
    tutorId,
  };
  return (
    <ModalBase
      isOpen={reqModal}
      onClose={() => setReqModal(false)}
      width="tight"
    >
      <div className="w-full flex flex-col gap-4 pt-10">
        <ToggleModeBar online={online} setMode={setMode} mode={mode} />

        {(!user || userLoading) && (
          <div className="flex justify-center h-40">
            <Loader2 className="w-4 h-4 animate-spin text-textWhite" />
          </div>
        )}
        {user && mode === "onsite" && (
          <OnsiteForm
            sharedLoad={sharedLoad}
            currStudentId={user.id}
            slots={slots}
            closeModal={() => setReqModal(false)}
          />
        )}

        {user && mode === "online" && (
          <OnlineForm
            sharedLoad={sharedLoad}
            currStudentId={user.id}
            closeModal={() => setReqModal(false)}
          />
        )}
      </div>
    </ModalBase>
  );
}
