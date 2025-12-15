import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "../data/products";

type ProductGridProps = {
  products: Product[];
  loading?: boolean;
};

export default function ProductGrid({
  products,
  loading = false,
}: ProductGridProps) {
  return (
    <section className="bg-[#EFF3EB]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} size="sm" />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="sm"
              />
            ))}
      </div>
    </section>
  );
}
