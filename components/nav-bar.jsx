"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { logout } from "@/redux/authSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Navbar() {
  const pathname = usePathname();

  // Get User from Redux
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.products);

  // Check if user exists
  const isAuthenticated = !!user;

  const dispatch = useDispatch();

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">Marketplace App</span>
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                My Orders
              </Link>
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-foreground"
              >
                My Cart {cart.length > 0 && `(${cart.length})`}
              </Link>
            </nav>
          )}
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              onClick={() => dispatch(logout())}
            >
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
        {/* <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div> */}
      </div>
    </header>
  );
}
