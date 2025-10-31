"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarClock,
  PlayCircle,
  CalendarDays,
  Verified,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/tutors", label: "Tutors", icon: GraduationCap },
  { href: "/admin/sessions", label: "Sessions", icon: CalendarClock },
  {
    href: "/admin/sessions/active",
    label: "Active Sessions",
    icon: PlayCircle,
  },
  {
    href: "/admin/sessions/scheduled",
    label: "Scheduled Sessions",
    icon: CalendarDays,
  },
  {
    href: "/admin/sessions/completed",
    label: "Completed Sessions",
    icon: Verified,
  },
];

export default function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <section className="flex flex-col min-h-full">
      <div className="px-4 lg:pt-13 pb-3 text-xl font-bold border-b border-white/5">
        Dashboard
      </div>

      <nav className="flex-1 pl-2 pr-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (pathname.startsWith(href + "/") &&
              !["/admin", "/admin/sessions"].includes(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-xs font-medium ${
                isActive
                  ? "bg-white/5 text-white"
                  : "hover:bg-white/5 text-gray-300"
              }`}
              onClick={onClose}
            >
              <Icon
                size={16}
                className={isActive ? "text-white" : "text-gray-400"}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pl-2 pr-3 py-4 border-t border-white/5">
        <Link
          href="/admin/logout"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-xs font-medium ${
            pathname === "/admin/logout"
              ? "bg-white/5 text-white"
              : "hover:bg-white/5 text-gray-300"
          }`}
          onClick={onClose}
        >
          <LogOut size={15} className="text-gray-400" />
          <span>Sign Out</span>
        </Link>
      </div>
    </section>
  );
}
