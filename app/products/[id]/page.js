import { notFound } from "next/navigation";
import Link from "next/link";
// import { getProducts } from "@/app/actions/product";
import ProductDetails from "@/components/product-details";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/nav-bar";

export default async function ProductPage({ params }) {
  const { id } = params; // Get the product ID from the URL parameters

  // If product not found, show 404
  if (!id) {
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

        <ProductDetails productId={id} />
      </div>
    </>
  );
}
