"use client";

import Image from "next/image";
import { useState } from "react";
import { products, Product } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { useAppContext } from "@/context/AppContext";

type ProductDetailsPageProps = {
  product: Product;
};

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useAppContext();

  const increase = () => setQuantity((q) => Math.min(q + 1, 20));
  const decrease = () => setQuantity((q) => Math.max(1, q));

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      images: product.images,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products: same brand first, then fill with same category
  const related = products
    .filter((p) => p.id !== product.id)
    .filter((p) => p.brand === product.brand)
    .slice(0, 4);

  if (related.length < 4) {
    const fill = products
      .filter(
        (p) =>
          p.id !== product.id &&
          p.brand !== product.brand &&
          p.category === product.category
      )
      .slice(0, 4 - related.length);
    related.push(...fill);
  }

  return (
    <section className="bg-[#EFF3EB] py-20 px-6 md:px-20 lg:px-28">
      <div className="max-w-7xl mx-auto">
        {/* Images + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* IMAGES */}
          <div className="space-y-4">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-32 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-start">
            <p className="text-sm text-black/50 mb-2">{product.brand}</p>
            <h1 className="text-4xl font-medium text-black mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-black mb-6">
              ${product.price.toFixed(2)} CAD
            </p>

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <button
                type="button"
                onClick={decrease}
                className="px-4 py-2 border border-black/20 rounded-l-lg hover:bg-black/5 transition text-black cursor-pointer"
              >
                -
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val === "") setQuantity(0);
                  else setQuantity(Math.min(20, Number(val)));
                }}
                onBlur={() => {
                  if (quantity === 0) setQuantity(1);
                }}
                className="w-16 text-center border-t border-b border-black/20 outline-none text-black px-4 py-2"
              />
              <button
                type="button"
                onClick={increase}
                className="px-4 py-2 border border-black/20 rounded-r-lg hover:bg-black/5 transition text-black cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-[#ECFEA7] px-6 py-3 rounded-lg font-medium border border-transparent w-full mb-3 cursor-pointer transition hover:border-[#cfe89a] hover:outline hover:outline-2 hover:outline-[#cfe89a]"
            >
              Add to Cart
            </button>

            {added && (
              <p className="text-green-600 font-semibold mb-6 text-center">
                Added to cart!
              </p>
            )}

            <div className="text-black/70 leading-relaxed">
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-medium text-black mb-8 text-center md:text-left">
              Related Products
            </h2>
            <ProductGrid products={related} />
          </div>
        )}

      </div>
    </section>
  );
}
