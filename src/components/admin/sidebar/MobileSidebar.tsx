"use client";

import { X, AlignJustify } from "lucide-react";
import { useState } from "react";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden pt-4 pl-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-elevatedBg hover:scrollbar-thumb-elevatedBg ">
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
        className={`fixed inset-0 w-4/5 h-full bg-elevatedBg text-textWhite z-50 p-4 overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out scrollbar-thin scrollbar-track-transparent scrollbar-thumb-elevatedBg hover:scrollbar-thumb-elevatedBg ${
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
        <SidebarContent onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}

// redeploy
