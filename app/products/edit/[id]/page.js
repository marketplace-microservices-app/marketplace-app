import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditProductForm from "@/components/edit-product-form";
import Navbar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function EditProductPage({ params }) {
  const { id } = params;

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

        <EditProductForm productId={id} />
      </div>
    </>
  );
}
