"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { FocusTrap } from "focus-trap-react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  autoFocus?: boolean;
}

export default function ModalBase({
  isOpen,
  onClose,
  children,
  autoFocus,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-brightness-70 flex items-center justify-center"
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
              className="modal-content bg-mainBg border border-white/10 relative focus:outline-none rounded-2xl shadow-2xl overflow-y-auto
             w-[90vw] md:w-[80vw] xl:w-[70vw] max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-8 right-8" onClick={onClose}>
                <X
                  className="text-textWhite/80 transition hover:cursor-pointer hover:text-textButton "
                  size={16}
                />
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
