"use client";

import { useState, useEffect } from "react";
import { Pencil, Check } from "lucide-react";

const sharedClasses =
  "w-full px-2 py-1 rounded-md text-xs bg-mainBg border border-white/10 text-textWhite disabled:opacity-60 disabled:cursor-default outline-none transition";

export function InlineEditable({
  type,
  label,
  value,
  onSave,
}: {
  type: "textarea" | "input";
  label: string;
  value: string | null;
  onSave: (v: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value || "");
  const [saving, setSaving] = useState(false);

  // Keep value in sync with parent when not editing
  useEffect(() => {
    if (!editing) {
      setLocal(value || "");
    }
  }, [value, editing]);

  const trimmedValue = (value ?? "").trim();
  const trimmedLocal = local.trim();
  const unchanged = trimmedLocal === trimmedValue;

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
    if (editing) handleSave();
  }

  // Shared icon slot
  function RenderIcon() {
    return !editing ? (
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
    );
  }

  if (type === "input") {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full mt-2">
        <p className="text-sm text-textMuted">{label}</p>

        <div className="flex items-center gap-2 w-full">
          <input
            value={local}
            onBlur={handleBlur}
            onChange={(e) => setLocal(e.target.value)}
            disabled={!editing}
            className={sharedClasses}
          />
          <RenderIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full mt-2">
      {/* header row */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-textWhite">{label}</p>
        <RenderIcon />
      </div>

      <textarea
        value={local}
        onBlur={handleBlur}
        onChange={(e) => setLocal(e.target.value)}
        disabled={!editing}
        rows={4}
        className={sharedClasses + " resize-none"}
      />
    </div>
  );
}
