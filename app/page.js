"use client";
import Navbar from "@/components/nav-bar";
import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

import Link from "next/link";
import ProductGrid from "@/components/product-grid";
import SellerHome from "@/components/seller-home";
import BuyerHome from "@/components/buyer-home";

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
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="mb-8">
          {user.role === "seller" ? <SellerHome /> : <BuyerHome />}
        </div>
        <div className="flex justify-center">
          <Link href="/products">
            <Button variant="outline">Load More</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
