"use client";
import { useState, useEffect } from "react";
import SignIn from "@/src/components/auth/signIn";
import Layout from "@/app/page";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  // Show nothing until authentication check is complete
  if (isAuthenticated === null) return null;

  return isAuthenticated ? <Layout>{children}</Layout> : <SignIn />;
};

export default AuthGuard;
