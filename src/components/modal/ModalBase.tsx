"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";
import { X } from "lucide-react";
import clsx from "clsx";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  noX?: boolean;
  onClose: () => void;
  children: ReactNode;
  autoFocus?: boolean;
  width?: "tight" | "wide";
}

export default function ModalBase({
  noX = false,
  isOpen,
  onClose,
  children,
  autoFocus,
  width,
}: ModalProps) {
  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // If not mounted yet (Next.js SSR), avoid errors
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <FocusTrap
            focusTrapOptions={{
              clickOutsideDeactivates: true,
              escapeDeactivates: false,
              initialFocus: autoFocus ? undefined : false,
              fallbackFocus: ".modal-content",
            }}
          >
            <motion.div
              className={clsx(
                "modal-content will-change-opacity bg-mainBg focus:outline-none rounded-2xl shadow-2xl",
                "w-[90vw] md:w-[80vw] xl:w-[70vw] max-h-[90vh] mx-auto",
                width === "tight" ? "max-w-3xl xl:max-w-4xl" : "max-w-6xl"
              )}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="p-6 overflow-y-auto modal-scroll max-h-[90vh]">
                <div className="relative">
                  {children}
                  {!noX && (
                    <button
                      className="absolute top-4 right-2"
                      onClick={onClose}
                    >
                      <X
                        className="text-textWhite/80 transition hover:cursor-pointer hover:text-textButton"
                        size={16}
                      />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
