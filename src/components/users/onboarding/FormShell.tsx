import clsx from "clsx";
import { bg } from "../../LoginComponent";

export function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <main className={`min-h-screen flex items-center justify-center bg-mainBg`}>
      <div
        className={clsx(
          "min-h-screen shadow-lg rounded-md p-6 lg:p-8 ",
          "w-9/10 sm:w-5/6 lg:w-2/3",
          "border border-hoverBg bg-mainBg shadow-[0_0_15px_rgba(0,0,0,0.25)]"
        )}
      >
        {children}
      </div>
    </main>
  );
}
