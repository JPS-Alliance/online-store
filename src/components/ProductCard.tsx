import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: {
    card: "w-full",        // Fill the column
    image: "h-48",
    text: "text-sm",
    price: "text-sm",
    padding: "p-4",
  },
  md: {
    card: "w-full",        // Fill the column
    image: "h-64",
    text: "text-lg",
    price: "text-base",
    padding: "p-6",
  },
  lg: {
    card: "w-full h-full", // Same as before
    image: "h-[26rem] md:h-[32rem] lg:h-[36rem]",
    text: "text-2xl",
    price: "text-xl",
    padding: "p-10",
  },
};


export default function ProductCard({
  product,
  size = "md",
}: ProductCardProps) {
  const styles = sizeMap[size];
  const hasHoverImage = product.images.length > 1;
  const isOutOfStock = !product.inStock;

  return (
    <Link
      href={`/products/${product.id}`}
      className={isOutOfStock ? "pointer-events-none" : ""}
    >
      <motion.div
        whileHover={!isOutOfStock ? "hover" : undefined}
        initial="rest"
        animate="rest"
        className={`
          ${styles.card}
          bg-[#EFF3EB]
          rounded-2xl
          overflow-hidden
          shadow-sm
          ${!isOutOfStock && "hover:shadow-lg"}
          transition-shadow
          cursor-pointer
          flex
          flex-col
          items-center
          relative
        `}
      >
        {/* IMAGE */}
        <div
          className={`
            relative
            ${styles.image}
            w-full
            flex
            items-center
            justify-center
            bg-white
          `}
        >
          {/* Primary Image */}
          <motion.div
            variants={{
              rest: { opacity: 1, scale: 1 },
              hover: {
                opacity: hasHoverImage ? 0 : 1,
                scale: 1.05,
              },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 300px"
              priority={size === "lg"}
            />
          </motion.div>

          {/* Hover Image */}
          {hasHoverImage && !isOutOfStock && (
            <motion.div
              variants={{
                rest: { opacity: 0, scale: 1 },
                hover: { opacity: 1, scale: 1.05 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alt`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </motion.div>
          )}

          {/* OUT OF STOCK OVERLAY */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="text-white text-sm font-semibold tracking-wide bg-black/60 px-4 py-2 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className={`${styles.padding} text-center w-full`}>
          <motion.h3
            variants={{
              rest: { y: 6, opacity: 0.85 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`font-medium text-black pb-1 ${styles.text}`}
          >
            {product.name}
          </motion.h3>

          <p
            className={`text-black/70 mt-2 ${styles.price} ${
              isOutOfStock ? "line-through opacity-60" : ""
            }`}
          >
            ${product.price.toFixed(2)} CAD
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
