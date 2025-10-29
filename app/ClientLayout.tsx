"use client";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Para que tome el tema correcto (incluso  el tema del sistema)
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");
    } else {
      setResolvedTheme(theme as "light" | "dark");
    }
  }, [theme, systemTheme]);

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme={resolvedTheme} 
      />
    </>
  );
}