"use client";

import { usePathname } from "next/navigation";

// Hides AARM site chrome (e.g. the footer) on the standalone /intercept page.
export function HideOnIntercept({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/intercept")) return null;
  return <>{children}</>;
}
