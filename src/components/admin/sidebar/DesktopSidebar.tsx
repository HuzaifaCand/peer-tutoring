import SidebarContent from "./SidebarContent";

export default function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden lg:block overflow-y-auto scrollbar-thin scrollbar-track-transparent w-64 bg-elevatedBg text-textWhite border-r border-white/5 ">
      <SidebarContent />
    </aside>
  );
}
