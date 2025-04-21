import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditProductForm from "@/components/edit-product-form";
import Navbar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function EditProductPage() {
  const product = {
    id: "d47ef880-06cd-4fdc-aa63-1dad7b02b2ce",
    product_code: "PROD001",
    product_name: "Wireless Mouse",
    short_description: "Ergonomic wireless mouse with USB receiver",
    item_price: "25.99",
    available_stock: 132,
    seller_id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
    seller: {
      data: {
        id: "e016f334-42bf-4619-a8a7-eeb4fa6aee5f",
        user_id: "267a1d6f-0fc1-400f-bd5a-242c46607ad0",
        first_name: "John",
        last_name: "Doe",
        country: "USA",
      },
    },
  };

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        <EditProductForm product={product} />
      </div>
    </>
  );
}
