import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ImageTextSectionProps = {
  image: string;
  title: string;
  text: string;
  enableZoom?: boolean;
};

export default function ImageTextSection({
  image,
  title,
  text,
  enableZoom = false,
}: ImageTextSectionProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const scale = enableZoom
    ? useTransform(scrollYProgress, [0, 1], [1, 1.2])
    : 1;

  return (
    <section className="bg-[#EFF3EB] py-20">
      <div className="max-w-7xl px-10 md:px-20 lg:px-28 mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch gap-10">
        {/* IMAGE */}
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden shadow-lg rounded-l-2xl flex"
        >
          <motion.div style={{ scale }} className="w-full">
            <Image
              src={image}
              alt={title}
              width={800} // optional, sets aspect ratio
              height={800} // optional, sets aspect ratio
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* TEXT */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-5xl font-medium text-black mb-6">{title}</h2>
          <p className="text-black/70 text-lg leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  );
}
