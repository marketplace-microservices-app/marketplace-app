"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";

import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";

export default function LoginForm() {
  //   const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loginData = {
      email,
      password,
    };

    console.log("Login Data:", loginData);

    const response = {
      status: 200,
      message: "Login Successful",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNGRhNjY2MC1kY2I3LTQ0MDctOWU5MC1lZWI4MmQ1MThlNzMiLCJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNzQ1MTU2ODA5fQ.tOm5-yM3WDeLE4qsR1_NVFsQk94pEjJyEdJTRwU7o7k",
      user: {
        id: "a4da6660-dcb7-4407-9e90-eeb82d518e73",
        email: "jane.doe@example.com",
        role: "seller",
      },
    };

    // Simulate a login rquest
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "admin@admin.com" && password === "admin") {
            resolve("Login successful");

            const userData = {
              token: response.accessToken,
              ...response.user,
            };

            dispatch(login(userData));
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 2000);
      });
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Create an account
        </Link>
      </div>
    </form>
  );
}
