import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const [showClone, setShowClone] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const router = useRouter();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Hair Care", href: "/hair-care" },
    { label: "Skin Care", href: "/skin-care" },
    { label: "Pantry Essentials", href: "/pantry-essentials" },
    { label: "Brands", href: "/brands" },
    { label: "Catalog", href: "/catalog" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setAtTop(currentScrollY === 0);

      if (currentScrollY === 0) {
        // At top → hide instantly
        setShowClone(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up → show clone
        setShowClone(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down → hide clone
        setShowClone(false);
      }

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
          className={`
            transition-colors duration-200
            ${isActive
              ? "text-black underline"
              : "text-black/70 hover:text-black hover:underline"}
          `}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <>
      {/* Original header */}
      <header className="w-full bg-[#EFF3EB] relative z-10">
        <div className="flex justify-center py-4">
          <Link href="/">
            <Image src="/logo.png" alt="JPS Alliance" width={300} height={150} priority />
          </Link>
        </div>
        <nav className="flex justify-center pb-4 space-x-8 text-sm font-normal">
          {renderMenu()}
        </nav>
      </header>

      {/* Animated clone header */}
      <header
        className={`
          fixed top-0 left-0 w-full bg-[#EFF3EB] z-50 shadow-md
          ${!atTop ? "transition-transform duration-300 ease-in-out" : ""}
          ${showClone ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex justify-center py-4">
          <Link href="/">
            <Image src="/logo.png" alt="JPS Alliance" width={300} height={150} priority />
          </Link>
        </div>
        <nav className="flex justify-center pb-4 space-x-8 text-sm font-normal">
          {renderMenu()}
        </nav>
      </header>
    </>
  );
}
