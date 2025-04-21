import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

export default function ProductCard({ product, viewType }) {
  return (
    <Link
      href={
        viewType === "buyer"
          ? `/products/${product.id}`
          : `/products/edit/${product.id}`
      }
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
          <span className="font-bold text-xl">{`$ ${product.item_price}`}</span>
          <span className="font-bold text-xl">
            <Button>View</Button>
          </span>
        </div>
      </div>
    </Link>
  );
}
