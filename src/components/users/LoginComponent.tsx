"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

export const bg = "bg-gradient-to-br from-[#0f0f12] via-[#16161a] to-[#1b1b1f]";

export function LoginComponent({
  handleSignIn,
  loading,
}: {
  handleSignIn: () => void;
  loading: boolean;
}) {
  return (
    <div className={clsx("flex h-screen items-center justify-center px-6", bg)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-[#18181b] border border-[#242427] shadow-[0_0_15px_rgba(0,0,0,0.25)] rounded-xl p-10 w-full max-w-md text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Image
            src="/android-chrome-192x192.png"
            alt="PeerLink Logo"
            width={80}
            height={80}
            priority
            className="rounded-xl border border-[#2a2a2e] shadow-sm"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-100 mt-4 tracking-tight">
              PeerLink
            </h1>
            <p className="text-sm text-gray-400">
              Peer Tutoring Platform for{" "}
              <span className="text-yellow">Cedar College</span>
            </p>
          </div>
        </motion.div>

        {/* Sign-in Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="pt-10"
        >
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-3 hover:cursor-pointer w-full py-3 focus:outline-none focus:bg-[#2b2b2f] text-gray-100 bg-[#222226] hover:bg-[#2b2b2f] border border-[#343438]
                        rounded-lg transition-all duration-150 disabled:opacity-60"
          >
            <>
              <Image
                src="/google-icon.svg"
                alt="Google"
                width={18}
                height={18}
              />
              <span className="font-medium text-sm text-gray-100">
                Sign in with Google
              </span>
            </>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
