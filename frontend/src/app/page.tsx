"use client";

import { useEffect } from "react";
import { getToken } from "@/lib/auth/storage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function HomePage() {
  useEffect(() => {
    const target = getToken() ? "/dashboard/" : "/login/";
    window.location.replace(target);
  }, []);

  return <LoadingSpinner label="Chargement..." />;
}
