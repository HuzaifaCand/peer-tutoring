import { usePathname } from "next/navigation";

export function useUserRole() {
  const pathname = usePathname();
  if (pathname.includes("/tutor")) return "tutor";
  if (pathname.includes("/student")) return "student";
  if (pathname.includes("/admin")) return "admin";
  return "unknown";
}
