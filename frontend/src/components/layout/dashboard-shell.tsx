"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getStoredUser, getToken } from "@/lib/auth/storage";
import { navigateTo } from "@/lib/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { PageTransition } from "@/components/layout/page-transition";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(Boolean(getToken()));
    setTokenChecked(true);
  }, []);

  useEffect(() => {
    if (!tokenChecked || loading) return;

    if (!getToken() && !user) {
      navigateTo("/login");
    }
  }, [tokenChecked, loading, user]);

  const cachedUser = getStoredUser();
  const effectiveUser = user ?? cachedUser;

  if (!tokenChecked || (loading && hasToken && !effectiveUser)) {
    return <LoadingSpinner label="Chargement de votre espace..." />;
  }

  if (!hasToken && !effectiveUser) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
