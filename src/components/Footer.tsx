"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubscribe = () => {
    if (!email) return; // ignore empty submissions
    setSubscribed(true);
    setEmail(""); // clear input

    // hide message after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, #E6F7A6 0%, #FCE3DA 50%, #E6F7A6 100%)",
      }}
    >
      {/* SUBSCRIBE */}
      <div
        className="text-center px-10 md:px-20 lg:px-32 pt-24 pb-20"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-medium mb-6 text-black leading-tight">
          Subscribe to our emails
        </h2>
        <p className="text-black/70 mb-10 text-base md:text-lg leading-relaxed">
          Join our email list for exclusive offers and the latest news.
        </p>

        <div className="flex justify-center">
          <div className="flex w-full max-w-lg items-center border border-black/40 rounded-full bg-[#E6F7A6] px-4 py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="flex-1 bg-transparent outline-none text-base text-black placeholder:text-black/50 px-4 py-2 rounded-l-full"
            />
            <button
              onClick={handleSubscribe}
              className="cursor-pointer text-xl text-black px-4 py-2 rounded-r-full hover:bg-black/10 transition"
            >
              →
            </button>
          </div>
        </div>


        {subscribed && (
          <p className="mt-4 text-green-600 font-medium">
            Subscribed successfully!
          </p>
        )}
      </div>

      {/* MIDDLE SECTION */}
      <div
        className="container mx-auto px-10 md:px-20 lg:px-32 grid grid-cols-1 md:grid-cols-4 gap-16 items-start pb-24"
        data-aos="fade-up"
      >
        {/* MENU */}
        <div>
          <h4 className="font-medium text-lg mb-5 text-black">Menu</h4>
          <ul className="space-y-3 text-black/70 text-base leading-relaxed">
            <li>
              <Link href="/" className="hover:text-black underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/hair-care">Hair Care</Link>
            </li>
            <li>
              <Link href="/skin-care">Skin Care</Link>
            </li>
            <li>
              <Link href="/pantry-essentials">Pantry Essentials</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            <li>
              <Link href="/catalog">Catalog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* OUR STORE */}
        <div>
          <h4 className="font-medium text-lg mb-5 text-black">Our Store</h4>
          <p className="text-black/70 text-base leading-relaxed">
            383 Main Street Markham,
            <br />
            Markham, ON L3P 1Z3
          </p>
        </div>

        {/* LOGO */}
        <div className="flex justify-center" data-aos="fade-up">
          <Image
            src="/footer-logo.png"
            alt="JPS Alliance Logo"
            width={250}
            height={250}
            className="opacity-95"
          />
        </div>

        {/* OUR PROMISE */}
        <div>
          <h4 className="font-medium text-lg mb-5 text-black">Our Promise</h4>
          <p className="text-black/70 text-base leading-relaxed">
            Rooted in nature, we’re committed to pure, purposeful wellness.
          </p>
          <p className="text-black/70 text-base italic mt-6 leading-relaxed">
            Family-Owned / Est. 2024 /<br />
            Toronto, Canada
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-sm text-black/60 pb-12">
        © {new Date().getFullYear()}, JPS Alliance · Privacy policy
      </div>
    </footer>
  );
}
