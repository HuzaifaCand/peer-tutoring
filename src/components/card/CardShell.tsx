import { motion } from "framer-motion";
import clsx from "clsx";

export function CardShell({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const clickable = onClick !== undefined;

  return (
    <motion.div
      onClick={onClick}
      whileHover={clickable ? { backgroundColor: "var(--color-hoverBg)" } : {}}
      whileTap={
        clickable
          ? { scale: 0.99, backgroundColor: "var(--color-hoverBg)" }
          : {}
      }
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={clsx(
        "rounded-xl bg-elevatedBg shadow-sm",
        "p-5 text-sm",
        clickable ? "cursor-pointer" : "",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
