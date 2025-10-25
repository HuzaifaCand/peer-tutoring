import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
