import { motion } from "framer-motion";

type SkeletonProps = {
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: {
    card: "w-60",
    image: "h-48",
    padding: "p-4",
  },
  md: {
    card: "w-64",
    image: "h-56",
    padding: "p-6",
  },
  lg: {
    card: "w-80",
    image: "h-72",
    padding: "p-8",
  },
};

export default function ProductCardSkeleton({ size = "md" }: SkeletonProps) {
  const styles = sizeMap[size];

  return (
    <motion.div
      className={`
        ${styles.card}
        bg-[#EFF3EB]
        rounded-2xl
        overflow-hidden
        shadow-sm
        flex
        flex-col
        animate-pulse
      `}
    >
      {/* Image skeleton */}
      <div
        className={`
          ${styles.image}
          w-full
          bg-gray-200
        `}
      />

      {/* Content skeleton */}
      <div className={`${styles.padding} space-y-3`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
      </div>
    </motion.div>
  );
}
