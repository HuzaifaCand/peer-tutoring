"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Clock,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/tutors", label: "Tutors", icon: GraduationCap },
  { href: "/admin/sessions", label: "Sessions", icon: Clock },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen hidden lg:flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-track-transparent w-64 bg-elevatedBg text-textWhite flex flex-col border-r border-white/10 ">
      <div className="px-4 pt-14 pb-4 text-lg font-bold border-b border-white/10 ">
        Dashboard
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-sm font-medium ${
                isActive
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-white" : "text-gray-400"}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10    ">
        <Link
          href="/admin/logout"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-sm font-medium ${
            pathname === "/admin/logout"
              ? "bg-white/10 text-white"
              : "hover:bg-white/5 text-gray-300"
          }`}
        >
          <LogOut size={18} className="text-gray-400" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
