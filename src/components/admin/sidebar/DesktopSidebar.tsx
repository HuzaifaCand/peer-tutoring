import SidebarContent from "./SidebarContent";

export default function DesktopSidebar() {
  return (
    <aside className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent w-64 bg-mainBg text-textWhite border-r border-white/5 ">
      <SidebarContent />
    </aside>
  );
}
