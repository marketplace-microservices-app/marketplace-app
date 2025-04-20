"use client";
import RegisterForm from "@/components/register-form";

import { redirect } from "next/navigation";

import { useSelector } from "react-redux";

export default function RegisterPage() {
  // Get User from Redux
  const user = useSelector((state) => state.auth.user);

  // Check if user exists
  const isAuthenticated = !!user;

  // Redirect to Home if authenticated
  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
