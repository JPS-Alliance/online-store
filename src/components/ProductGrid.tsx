import ProductCard from "./ProductCard";
import { Product } from "../data/products"; // your products.ts

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="bg-[#EFF3EB]">
      <div className="m grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
