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
  Library,
  Clock,
  CalendarX,
  UserSearch,
  Bell,
  UserCircle2,
  Edit,
  BookUser,
} from "lucide-react";
import { useState } from "react";
import { ConfirmationModal } from "../modal/ConfirmationModal";
import { useSignOut } from "@/hooks/signout";

type UserType = "admin" | "tutor" | "student";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

// Define nav items per role
const navItemsByType: Record<UserType, NavItem[]> = {
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/students", label: "Students", icon: Users },
    { href: "/admin/tutors", label: "Tutors", icon: GraduationCap },
    { href: "/admin/edit-requests", label: "Edit Requests", icon: Edit },
    { href: "/admin/sessions", label: "Session Stats", icon: CalendarDays },
    {
      href: "/admin/sessions/active",
      label: "Active Sessions",
      icon: PlayCircle,
    },
    {
      href: "/admin/sessions/scheduled",
      label: "Scheduled Sessions",
      icon: CalendarClock,
    },
    {
      href: "/admin/sessions/completed",
      label: "Completed Sessions",
      icon: Verified,
    },
    {
      href: "/admin/sessions/cancelled",
      label: "Cancelled Sessions",
      icon: CalendarX,
    },
  ],
  tutor: [
    { href: "/tutor", label: "Overview", icon: LayoutDashboard },
    { href: "/tutor/profile", label: "Profile", icon: UserCircle2 },
    { href: "/tutor/sessions", label: "My Sessions", icon: CalendarClock },
    { href: "/tutor/resources", label: "Resource Library", icon: Library },
    // { href: "/tutor/my-resources", label: "My Resources", icon: BookUser },
    { href: "/tutor/notifications", label: "Notifications", icon: Bell },
  ],
  student: [
    { href: "/student", label: "Overview", icon: LayoutDashboard },
    { href: "/student/profile", label: "Profile", icon: UserCircle2 },
    { href: "/student/sessions", label: "My Sessions", icon: CalendarClock },
    { href: "/student/tutors", label: "Browse Tutors", icon: UserSearch },
    { href: "/student/resources", label: "Resource Library", icon: Library },
    // { href: "/student/my-resources", label: "My Resources", icon: BookUser },
    { href: "/student/notifications", label: "Notifications", icon: Bell },
  ],
};

interface SidebarProps {
  onClose?: () => void;
  type: UserType;
}

export default function SidebarContent({ onClose, type }: SidebarProps) {
  const [signOutModal, setSignOutModal] = useState(false);
  const pathname = usePathname();
  const navItems = navItemsByType[type];

  return (
    <>
      <ConfirmationModal
        isOpen={signOutModal}
        onCancel={() => setSignOutModal(false)}
        type="positive"
        title="Are you sure you want to sign out?"
        onConfirm={useSignOut()}
        successMessage="Signed out Successfully!"
      />

      <section className="flex flex-col min-h-full">
        <div className="px-4 lg:pt-13 pb-3 text-xl font-bold border-b border-white/5">
          Dashboard
        </div>

        <nav className="flex-1 pl-2 pr-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (pathname.startsWith(href + "/") &&
                !["/admin", "/tutor", "/student", "/admin/sessions"].includes(
                  href
                ));

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
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pl-2 pr-3 py-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => {
              setSignOutModal(true);
            }}
            className={`flex items-center w-full hover:bg-white/5 cursor-pointer gap-3 px-4 py-2 rounded-lg transition-colors duration-150 text-xs font-medium`}
          >
            <LogOut size={15} className="text-gray-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>
    </>
  );
}
