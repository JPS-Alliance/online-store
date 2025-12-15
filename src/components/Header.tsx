import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const [showClone, setShowClone] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const router = useRouter();

  const { cart } = useAppContext();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/collections/hair-care" },
    { label: "Skin Care", href: "/collections/skin-care" },
    { label: "Pantry Essentials", href: "/collections/pantry-essentials" },
    { label: "Brands", href: "/brands" },
    { label: "Catalog", href: "/collections/all" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY === 0);

      if (currentScrollY === 0) setShowClone(false);
      else if (currentScrollY < lastScrollY) setShowClone(true);
      else setShowClone(false);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const renderMenu = () =>
    menuItems.map((item) => {
      const isActive = router.pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`transition-colors duration-200 ${
            isActive
              ? "text-black underline"
              : "text-black/70 hover:text-black hover:underline"
          }`}
        >
          {item.label}
        </Link>
      );
    });

  const HeaderIcons = () => (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
      {/* Profile / Login */}
      <Link
        href="/login"
        aria-label="Login"
        className="text-black/80 hover:text-black transition relative"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        aria-label="Cart"
        className="text-black/80 hover:text-black transition relative"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>

        {/* Cart count badge */}
        {cart.length > 0 && (
          <span className="absolute -bottom-1 -right-1.5 bg-[#9B056F] text-white text-[9px] font-normal rounded-full w-4 h-4 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}

      </Link>
    </div>
  );

  return (
    <>
      {/* Original header */}
      <header className="w-full bg-[#EFF3EB] relative z-10 border-b border-gray-200 py-4">
        <div className="relative flex items-center justify-center max-w-6xl mx-auto py-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="JPS Alliance"
              width={300}
              height={150}
              priority
            />
          </Link>
          <HeaderIcons />
        </div>
        <nav className="flex justify-center pb-4 space-x-8 text-sm font-normal">
          {renderMenu()}
        </nav>
      </header>

      {/* Animated clone header */}
      <header
        className={`
          fixed top-0 left-0 w-full bg-[#EFF3EB] z-50 shadow-md py-4
          ${!atTop ? "transition-transform duration-300 ease-in-out" : ""}
          ${showClone ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="relative flex justify-center py-4 max-w-6xl mx-auto">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="JPS Alliance"
              width={300}
              height={150}
              priority
            />
          </Link>
          <HeaderIcons />
        </div>
        <nav className="flex justify-center pb-4 space-x-8 text-sm font-normal">
          {renderMenu()}
        </nav>
      </header>
    </>
  );
}
