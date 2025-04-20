"use client";
import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  // Get User from Redux
  const user = useSelector((state) => state.auth.user);

  // Check if user exists
  const isAuthenticated = !!user;

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirect("/login");
  }

  return (
    <div>
      <Button> Hello World! </Button>
    </div>
  );
}
