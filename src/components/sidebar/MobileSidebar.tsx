"use client";

import { X, AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar({
  type,
}: {
  type: "admin" | "student" | "tutor";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden p-4 modal-scroll">
      <button onClick={() => setOpen(true)} className="text-textWhite">
        <AlignJustify size={20} />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed inset-0 w-4/5 sm:w-2/5 md:w-1/3 bg-elevatedBg text-textWhite z-50 p-4 lg:hidden overflow-y-auto transition-transform duration-300 ease-in-out modal-scroll ${
          open
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)} className="text-textWhite">
            <X size={20} />
          </button>
        </div>
        <SidebarContent type={type} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
