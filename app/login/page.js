"use client";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

import { useSelector } from "react-redux";

export default function LoginPage() {
  // Get User from Redux
  const user = useSelector((state) => state.auth.user);

  // Check if user exists
  const isAuthenticated = !!user; // Check if user exists

  // Redirect to Home if authenticated
  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <p className="text-muted-foreground text-center mb-6">
          Enter your credentials to access your account
        </p>
        <div className="border rounded-lg p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
