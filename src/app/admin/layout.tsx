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
      {/* Mobile sidebar */}
      <MobileSidebar />

      {/* Desktop layout */}
      <div className="flex">
        <div className="hidden lg:block fixed inset-y-0 left-0 w-64">
          <DesktopSidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 overflow-x-hidden p-6 sm:p-8 md:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
