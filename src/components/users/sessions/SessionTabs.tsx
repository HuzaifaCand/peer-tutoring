import clsx from "clsx";
import { TABS } from "./SessionsMain";

export type Tab =
  | "overview"
  | "requests"
  | "active"
  | "scheduled"
  | "completed"
  | "cancelled";

export function SessionsTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}) {
  return (
    <div className="mb-6 overflow-x-auto bg-elevatedBg px-4 pt-3 rounded-xl pb-1 no-scrollbar">
      <div className="flex gap-8 px-1">
        {TABS.map((t) => {
          const active = activeTab === t;

          return (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={clsx(
                "relative pb-2 text-xs sm:text-sm whitespace-nowrap transition-colors",
                "text-textWhite/70 hover:text-white",
                "after:absolute after:left-0 after:-bottom-0.5 after:h-[0.5px]  after:bg-gray-200/60 after:scale-x-0 after:origin-center after:transition-transform after:duration-300",
                t === "cancelled" ? "after:w-8/10" : "after:w-full",
                active && "text-white after:scale-x-100",
                "capitalize",
                t === "cancelled" && "pr-4"
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
