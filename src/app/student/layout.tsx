import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileSidebar from "@/components/sidebar/MobileSidebar";
import { NotificationsProvider } from "@/components/users/notifications/NotificationsProvider";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Mobile sidebar */}
      <MobileSidebar type="student" />

      {/* Desktop layout */}
      <div className="flex">
        <div className="hidden lg:block fixed inset-y-0 left-0 w-64">
          <DesktopSidebar type="student" />
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-64 p-6 sm:p-8 md:p-10 max-w-7xl mx-auto w-full">
          <NotificationsProvider>{children}</NotificationsProvider>
        </main>
      </div>
    </div>
  );
}
