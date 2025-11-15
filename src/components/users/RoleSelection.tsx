"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { useAuthUser } from "@/hooks/useAuthUser";
import { toast } from "sonner";
import { bg } from "@/components/users/LoginComponent";

export default function RoleSelection() {
  const { user, userLoading, userError } = useAuthUser();

  if (userError) toast.error("Error! Please refresh");
  if (userLoading) return <Loading bg={bg} />;
  if (!user) return null;

  const name =
    user?.user_metadata?.full_name?.split(" ").slice(0, -1).join(" ") ||
    "there";

  return (
    <main
      className={clsx(
        "flex flex-col items-center justify-center min-h-screen px-6 text-textWhite",
        bg
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg text-center space-y-8"
      >
        {/* Header */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Hey, <span className="text-yellow">{name}</span> 👋
          </motion.h1>
          <p className="text-sm sm:text-base max-w-sm mx-auto text-white/70 leading-relaxed">
            Welcome to <span className="font-medium text-white">PeerLink</span>.
            Please choose your role below to continue.
          </p>
        </div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GlassButton href="/onboarding/tutor" label="I’m a Tutor" />
          <GlassButton href="/onboarding/student" label="I’m a Student" />
        </motion.div>
      </motion.div>
    </main>
  );
}

function GlassButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={clsx(
        "block w-full py-3 sm:py-3.5 rounded-2xl",
        "bg-white/5 backdrop-blur-sm border border-white/10",
        "hover:bg-white/10 transition-all duration-300",
        "text-white font-medium text-base tracking-wide shadow-sm hover:shadow-md",
        "focus:outline-none focus:ring-2 focus:ring-hoverBg active:bg-white/10"
      )}
    >
      {label}
    </Link>
  );
}
