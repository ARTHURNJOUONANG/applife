"use client";

import { useEffect, useState } from "react";

function readPathname() {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

/** Compatible Capacitor : évite usePathname() de next/navigation en WebView. */
export function useClientPathname() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(readPathname());

    const sync = () => setPathname(readPathname());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return pathname;
}
