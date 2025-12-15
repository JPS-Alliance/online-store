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
    card: "w-60",
    image: "h-50",
    text: "text-md",
    price: "text-sm",
    padding: "p-5",
  },
  md: {
    card: "w-60",
    image: "h-60",
    text: "text-base",
    price: "text-base",
    padding: "p-6",
  },
  lg: {
    card: "w-80",
    image: "h-80",
    text: "text-lg",
    price: "text-lg",
    padding: "p-8",
  },
};

export default function ProductCard({ product, size = "md" }: ProductCardProps) {
  const styles = sizeMap[size];
  const hasHoverImage = product.images.length > 1;

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className={`
          ${styles.card}
          bg-[#EFF3EB]
          rounded-2xl
          overflow-hidden
          shadow-sm
          hover:shadow-lg
          transition-shadow
          cursor-pointer
          flex flex-col
          items-center
        `}
      >
        {/* IMAGE */}
        <div className={`relative ${styles.image} overflow-hidden w-full`}>
          {/* Primary Image */}
          <motion.div
            variants={{
              rest: { opacity: 1 },
              hover: { opacity: hasHoverImage ? 0 : 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </motion.div>

          {/* Hover Image */}
          {hasHoverImage && (
            <motion.div
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[1]}
                alt={`${product.name} alt`}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </div>

        {/* CONTENT */}
        <div className={`${styles.padding} text-center w-full`}>
          {/* Name reveal */}
          <motion.h3
            variants={{
              rest: { y: 6, opacity: 0.85 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`font-medium text-black pb-2 ${styles.text}`}
          >
            {product.name}
          </motion.h3>

          <p className={`text-black/70 mt-2 ${styles.price}`}>
            ${product.price.toFixed(2)} CAD
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
