import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
          req.cookies.getAll().map((c) => ({ name: c.name, value: c.value })),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const { data: userRow } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .maybeSingle();

  const role = userRow?.role ?? user?.user_metadata?.role ?? null;

  // Helper for redirects — use NextResponse.redirect properly
  const redirect = (path: string) => {
    const redirectUrl = new URL(path, req.url);
    return NextResponse.redirect(redirectUrl);
  };
  // homepage logic
  if (pathname === "/") {
    if (!user) return redirect("/login");
    if (!role) return redirect("/onboarding");
    return redirect(`/${role}`);
  }

  // LOGIN page logic
  if (pathname.startsWith("/login")) {
    if (user) {
      if (!role) return redirect("/onboarding");
      return redirect(`/${role}`);
    }
    return res;
  }

  // ONBOARDING logic
  if (pathname.startsWith("/onboarding")) {
    if (!user) return redirect("/login");
    if (role) return redirect(`/${role}`);
    return res;
  }

  // STUDENT / TUTOR routes
  if (pathname.startsWith("/tutor") || pathname.startsWith("/student")) {
    if (!user) return redirect("/login");
    if (!role) return redirect("/onboarding");

    if (role === "admin") return redirect("/admin");

    if (pathname.startsWith("/tutor") && role !== "tutor")
      return redirect("/student");
    if (pathname.startsWith("/student") && role !== "student")
      return redirect("/tutor");

    return res;
  }

  // ADMIN routes
  if (pathname.startsWith("/admin")) {
    if (!user || !role) return redirect("/login");
    if (role !== "admin") return redirect(`/${role}`);
    return res;
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/onboarding/:path*",
    "/tutor/:path*",
    "/student/:path*",
    "/admin/:path*",
  ],
};
