import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1.05, opacity: 1 });
    }
  }, [controls, inView]);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center bg-[#EFF3EB]">
      {/* Text Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-[#e6f7a6] to-[#fce3da] rounded-2xl p-10 md:w-1/3 shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-4 text-black">Healthy. Beautiful.</h2>
        <p className="text-black/70 mb-6">
          Discover skincare, haircare, and pantry essentials crafted with nature’s touch.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
          Shop now
        </button>
      </motion.div>

      {/* Image */}
      <motion.div
        ref={ref}
        initial={{ scale: 1 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="relative md:w-2/3 rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          src="/image.webp"
          alt="Skincare products"
          width={800}
          height={500}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </motion.div>
    </section>
  );
}
