import React from "react";
import { CardProps } from "./types";

export function Card<T extends Record<string, unknown>>({
  data,
  fields,
}: CardProps<T>) {
  const sections = {
    header: fields.filter((f) => f.section === "header"),
    body: fields.filter((f) => f.section === "body" || !f.section),
    footer: fields.filter((f) => f.section === "footer"),
  };

  return (
    <div className="rounded-xl bg-elevatedBg shadow-md py-6 px-4 border border-white/5 text-sm text-textWhite">
      {/* Header */}
      {sections.header.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-between items-center">
          {sections.header.map((field) => (
            <div key={String(field.key)} className="font-semibold">
              {field.label && (
                <span className="text-textMuted mr-2">{field.label}:</span>
              )}
              <span>
                {field.render
                  ? field.render(data)
                  : String(data[field.key] ?? "-")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      {sections.body.length > 0 && (
        <div className="mb-2 py-2 grid grid-cols-2 gap-y-1">
          {sections.body.map((field) => (
            <div key={String(field.key)}>
              {field.label && (
                <span className="text-textMuted mr-1">{field.label}:</span>
              )}
              <span>
                {field.render
                  ? field.render(data)
                  : String(data[field.key] ?? "-")}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {sections.footer.length > 0 && (
        <div className="border-t border-white/10 pt-4 text-xs text-textMuted flex justify-between">
          {sections.footer.map((field) => (
            <div key={String(field.key)}>
              {field.label && <span className="mr-1">{field.label}:</span>}
              <span>
                {field.render
                  ? field.render(data)
                  : String(data[field.key] ?? "-")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
