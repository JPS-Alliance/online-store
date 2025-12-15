"use client";

import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { Product } from "@/data/products";

type ProductCollectionSectionProps = {
  title: string;
  products: Product[];
};

export default function ProductCollectionSection({
  title,
  products,
}: ProductCollectionSectionProps) {
  const [availability, setAvailability] = useState<"all" | "in" | "out">("all");
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const [loading, setLoading] = useState(true);

  /* ---------------------------------------------
     Fake loading on mount + when filters change
  --------------------------------------------- */
  useEffect(() => {
    setLoading(true);

    const delay = Math.floor(Math.random() * (600 - 300 + 1)) + 300;

    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);


  /* ---------------------------------------------
     Filter products
  --------------------------------------------- */
  const filteredProducts = products
    .filter((p) => {
      if (availability === "all") return true;
      if (availability === "in") return p.inStock;
      if (availability === "out") return !p.inStock;
      return true;
    })
    .filter((p) => {
      const min = priceMin === "" ? 0 : priceMin;
      const max = priceMax === "" ? Infinity : priceMax;
      return p.price >= min && p.price <= max;
    });

  /* ---------------------------------------------
     Sort products
  --------------------------------------------- */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "date-old":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "date-new":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case "best-selling":
        return b.sales - a.sales;
      case "featured":
      default:
        return 0;
    }
  });

  return (
    <section className="bg-[#EFF3EB] max-w-7xl mx-auto px-10 md:px-20 lg:px-28 py-16">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-medium text-black mb-12">
        {title}
      </h2>

      {/* Filters Label */}
      <div className="text-black font-semibold text-lg mb-4">Filters:</div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Availability */}
          <div className="flex flex-col">
            <label className="font-medium text-black mb-1">Availability:</label>
            <select
              value={availability}
              onChange={(e) =>
                setAvailability(e.target.value as "all" | "in" | "out")
              }
              className="rounded-lg border border-black/30 px-3 py-2 text-black focus:ring-2 focus:ring-green-200 focus:outline-none transition"
            >
              <option value="all">All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex flex-col">
            <label className="font-medium text-black mb-1">Price:</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) =>
                  setPriceMin(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="rounded-lg border border-black/30 px-3 py-2 w-20 text-black focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
              <span className="self-center text-black/70">—</span>
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) =>
                  setPriceMax(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="rounded-lg border border-black/30 px-3 py-2 w-20 text-black focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-col">
            <label className="font-medium text-black mb-1">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-black/30 px-3 py-2 text-black focus:ring-2 focus:ring-green-200 focus:outline-none transition"
            >
              <option value="featured">Featured</option>
              <option value="a-z">Alphabetically A-Z</option>
              <option value="z-a">Alphabetically Z-A</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
              <option value="date-old">Date Added Old to New</option>
              <option value="date-new">Date Added New to Old</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="text-black font-medium">
          {loading ? "Loading…" : `${sortedProducts.length} products`}
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={sortedProducts} loading={loading} />
    </section>
  );
}
