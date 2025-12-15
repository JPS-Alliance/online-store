"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

type FeaturedProductSectionProps = {
  featured: Product;
  secondary: Product[];
  title?: string;
};

export default function FeaturedProductSection({
  featured,
  secondary,
  title,
}: FeaturedProductSectionProps) {
  return (
    <section className="bg-[#EFF3EB] py-16">
      <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-28">
        {/* {title && (
          <h2 className="text-4xl md:text-5xl font-medium text-black mb-12">
            {title}
          </h2>
        )} */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* LEFT: FEATURED PRODUCT */}
          <div className="lg:col-span-2 flex">
            <ProductCard product={featured} size="lg" />
          </div>

          {/* RIGHT: SECONDARY PRODUCTS */}
          <div className="flex flex-col gap-8">
            <ProductCard product={secondary[0]} size="md" />
            <ProductCard product={secondary[1]} size="md" />
          </div>
        </div>
      </div>
    </section>
  );
}
