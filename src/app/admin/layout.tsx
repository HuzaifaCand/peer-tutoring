"use client";

import DesktopSidebar from "@/components/admin/sidebar/DesktopSidebar";
import MobileSidebar from "@/components/admin/sidebar/MobileSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Mobile sidebar (fixed overlay) */}
      <MobileSidebar />

      {/* Desktop layout */}
      <div className="flex">
        <DesktopSidebar />
        <main className="flex-1 p-6 sm:p-8 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
