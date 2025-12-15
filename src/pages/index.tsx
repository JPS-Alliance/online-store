import HeroSection from "@/components/HeroSection";
import ImageTextSection from "@/components/ImageTextSection";
import ProductGrid from "@/components/ProductGrid";
import TestimonialSection from "@/components/TestimonialSection";
import { products } from "@/data/products";


export default function Home() {
  return (
    <>
      <HeroSection />
      <ImageTextSection
        image="/receiving-shipping-box.webp"
        title="Free Shipping on all orders"
        text="Pay no extra shipping fees on our products. The price you see is the price you pay."
      />

      <section className="bg-[#EFF3EB] py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-black text-left mb-12">
            Featured Products
          </h2>

          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </section>

      <TestimonialSection
        message="Our mission is to deliver high-quality products that nurture your natural beauty and support your everyday wellness."
        author="Founder"
      />
      <ImageTextSection
        enableZoom
        image="/autumn-trees-hillside.webp"
        title="Our Story"
        text="Founded in 2024 in Toronto, Canada, JPS Alliance is a family-owned business and a pioneer in Ayurvedic and health-first approaches to skincare, beauty, and household products. Rooted in nature and guided by tradition, we believe in the natural way to heal the skin and cure the soul. As a family, our mission is to bring balance, purity, and wellness to everyday routines through holistic solutions that come from the heart. At JPS Alliance, we are committed to quality, authenticity, and innovation — continuously striving to blend ancient wisdom with modern care for a healthier, more radiant you."
      />
    </>
  );
}
