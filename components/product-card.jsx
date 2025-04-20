import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
// import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }) {
  // Generate a product image based on the product name
  const getProductImage = (productName) => {
    // Convert product name to lowercase and replace spaces with hyphens
    const formattedName = productName.toLowerCase().replace(/\s+/g, "-");
    return `/placeholder.svg?height=200&width=200&text=${formattedName}`;
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-lg border bg-card transition-all hover:shadow-md"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="text-xs">
            {product.product_code}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors mt-2">
          {product.product_name}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 h-10">
          {product.short_description}
        </p>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <span className="font-bold text-xl">
            {`$ ${product.item_price}`}
            {/* {formatCurrency(product.item_price)} */}
          </span>
          <span className="font-bold text-xl">
            <Button>View</Button>
            {/* {formatCurrency(product.item_price)} */}
          </span>
        </div>
      </div>
    </Link>
  );
}
