import { usePathname } from "next/navigation";

export function useUserRole() {
  const pathname = usePathname();
  if (pathname.startsWith("/tutor")) return "tutor";
  if (pathname.startsWith("/student")) return "student";
  if (pathname.startsWith("/admin")) return "admin";
  return "unknown";
}
