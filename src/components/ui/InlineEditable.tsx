"use client";

import { useState } from "react";
import { Pencil, Check } from "lucide-react";

export function InlineEditable({
  label,
  value,
  onSave,
}: {
  label: string;
  value: string | null;
  onSave: (v: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value || "");
  const [saving, setSaving] = useState(false);

  const unchanged = local.trim() === (value?.trim?.() ?? value ?? "");

  async function handleSave() {
    if (unchanged) {
      setEditing(false);
      return;
    }

    setSaving(true);
    await onSave(local);
    setSaving(false);
    setEditing(false);
  }

  function handleBlur() {
    if (!editing) return;
    handleSave();
  }

  return (
    <div className="flex flex-col sm:items-center sm:flex-row gap-2 w-full mt-2">
      {/* Label */}
      <p className="text-sm sm:mb-0.5 text-textMuted">{label}</p>

      <div className="flex items-center gap-2 w-full">
        {/* Text field */}
        <input
          value={local}
          onBlur={handleBlur}
          onChange={(e) => setLocal(e.target.value)}
          disabled={!editing}
          className={`w-full px-2 py-1 rounded-md text-xs bg-mainBg border border-white/10 text-textWhite
            disabled:opacity-60 disabled:cursor-default outline-none transition`}
        />

        {/* Icons */}
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="p-1 rounded hover:bg-white/10 transition"
          >
            <Pencil size={14} className="text-textMuted" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving || unchanged}
            className={`p-1 rounded transition ${
              saving || unchanged
                ? "opacity-40 cursor-not-allowed"
                : "bg-green-600/20 hover:bg-green-600/30"
            }`}
          >
            <Check size={14} className="text-green-500" />
          </button>
        )}
      </div>
    </div>
  );
}
