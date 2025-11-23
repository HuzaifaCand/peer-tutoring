"use client";

import ModalBase from "@/components/modal/ModalBase";
import { SlotsRow } from "@/lib/computedtypes";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { OnsiteForm } from "./OnsiteForm";
import { OnlineForm } from "./OnlineForm";
interface ReqModalProps {
  reqModal: boolean;
  setReqModal: Dispatch<SetStateAction<boolean>>;
  slots: SlotsRow[];
  online: boolean;
}

export function SessionRequestModal({
  reqModal,
  setReqModal,
  slots,
  online,
}: ReqModalProps) {
  const [mode, setMode] = useState<"online" | "onsite">("onsite");

  return (
    <ModalBase isOpen={reqModal} onClose={() => setReqModal(false)}>
      <div className="w-full flex flex-col gap-4 pt-8">
        {/* TOGGLE BAR */}
        <div className="relative max-w-xs sm:max-w-sm mx-auto w-full rounded-xl bg-elevatedBg p-1 flex">
          {/* Sliding Highlight */}
          <motion.div
            layout
            className="absolute top-1 bottom-1 rounded-lg bg-mainBg shadow-md"
            animate={{
              x: mode === "onsite" ? 0 : "95%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              width: "50%",
            }}
          />

          {/* ONSITE BUTTON */}
          <button
            onClick={() => setMode("onsite")}
            className={clsx(
              "relative z-10 flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
              mode === "onsite"
                ? "text-textWhite"
                : "text-textWhite/50 hover:text-textWhite/70"
            )}
          >
            Onsite
          </button>

          {/* ONLINE BUTTON */}
          <button
            disabled={!online}
            onClick={() => online && setMode("online")}
            className={clsx(
              "relative z-10 flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all",
              !online && "cursor-not-allowed text-textWhite/20 opacity-40",
              online &&
                (mode === "online"
                  ? "text-textWhite"
                  : "text-textWhite/50 hover:text-textWhite/70")
            )}
          >
            Online
          </button>
        </div>

        {/* CONTENT AREA (PLACEHOLDER) */}
        {mode === "onsite" && <OnsiteForm slots={slots} />}

        {mode === "online" && <OnlineForm />}
      </div>
    </ModalBase>
  );
}
