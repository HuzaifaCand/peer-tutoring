import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 px-6 py-8 md:py-12 md:px-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
