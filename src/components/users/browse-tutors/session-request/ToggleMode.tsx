"use client";

import { motion } from "framer-motion";

import clsx from "clsx";

export function ToggleModeBar({
  mode,
  setMode,
  online,
}: {
  mode: "onsite" | "online";
  setMode: (m: "online" | "onsite") => void;
  online: boolean;
}) {
  return (
    <div className="relative max-w-xs sm:max-w-sm mx-auto w-full rounded-xl bg-elevatedBg p-1 flex">
      {/* Highlight pill */}
      <motion.div
        layout="position"
        layoutId="toggle-pill"
        className={clsx(
          "absolute top-1 bottom-1 rounded-lg bg-mainBg shadow-md transition-colors",
          mode === "onsite" ? "left-1 right-1/2" : "left-1/2 right-1"
        )}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
  );
}
