import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      richColors={false}
      closeButton={false}
      toastOptions={{
        style: {
          background: "#12171c", // solid dark grey
          color: "#e6e9ec", // subtle white text
          border: "1px solid #2b2b2b",
          borderRadius: "0.75rem",
          padding: "0.75rem 1rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.1)",
        },
        className: "modern-toast",
      }}
    />
  );
}
