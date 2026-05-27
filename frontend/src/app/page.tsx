"use client";

import { useEffect } from "react";
import { getToken } from "@/lib/auth/storage";
import { navigateTo } from "@/lib/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function HomePage() {
  useEffect(() => {
    navigateTo(getToken() ? "/dashboard" : "/login");
  }, []);

  return <LoadingSpinner label="Chargement..." />;
}
