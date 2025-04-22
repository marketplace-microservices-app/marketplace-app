import ProductCard from "@/components/product-card";

export default function ProductGrid({ products, viewType }) {
  const gridColumnCount =
    viewType === "buyer"
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColumnCount} gap-4 md:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewType={viewType} />
      ))}
    </div>
  );
}
