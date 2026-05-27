"use client";

import { useEffect } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { getToken } from "@/lib/auth/storage";
import { navigateTo } from "@/lib/navigation";

export default function LoginPage() {
  useEffect(() => {
    if (getToken()) {
      navigateTo("/dashboard");
    }
  }, []);

  return (
    <>
      <h2 className="mb-6 text-xl font-semibold text-white">Connexion</h2>
      <LoginForm />
    </>
  );
}
