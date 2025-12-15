import Image from "next/image";
import {
  motion,
  useAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function HeroSection() {
  const controls = useAnimation();
  const imageRef = useRef<HTMLDivElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Scroll progress relative to the image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // VERY subtle zoom (scroll down → zoom in, scroll up → zoom out)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="bg-[#EFF3EB] h-[750px] px-10 md:px-20 lg:px-28 py-16">
      <div className="relative max-w-7xl mx-auto flex items-center">
        {/* IMAGE CONTAINER */}
        <div
          ref={imageRef}
          className="relative ml-auto w-full md:w-2/3 h-[700px] rounded-2xl overflow-hidden shadow-lg"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="w-full h-full"
          >
            <Image
              src="/image.webp"
              alt="Skincare products"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* TEXT CARD (overlapping image) */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            absolute
            left-0
            md:left-12
            bg-gradient-to-b from-[#e6f7a6] to-[#fce3da]
            rounded-2xl
            p-20
            w-full md:w-[420px]
            shadow-xl
          "
        >
          <h2 className="text-5xl font-medium mb-4 text-black leading-tight">
            Healthy. Beautiful.
          </h2>
          <p className="text-black/70 mb-6">
            Discover skincare, haircare, and pantry essentials crafted with nature’s touch.
          </p>
          <Link href="/collections/all">
            <button
              className="
                bg-black
                text-[#ECFEA7]
                px-6 py-3
                rounded-lg
                cursor-pointer
                border
                border-transparent
                hover:border-[#cfe89a]
                transition
              "
            >
              Shop now
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
