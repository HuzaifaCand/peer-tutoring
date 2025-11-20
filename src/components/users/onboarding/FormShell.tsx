import clsx from "clsx";

export function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <main className={`min-h-screen flex items-center justify-center bg-mainBg`}>
      <div
        className={clsx(
          "min-h-screen shadow-lg p-6 lg:p-8 ",
          "w-9/10 sm:w-5/6 lg:max-w-5xl lg:mx-auto",
          "border-l border-r border-hoverBg bg-mainBg shadow-[0_0_15px_rgba(0,0,0,0.25)]"
        )}
      >
        {children}
      </div>
    </main>
  );
}
