import Image from "next/image";

type Brand = {
  name: string;
  logo: string;
};

const brands: Brand[] = [
  {
    name: "Cuccio",
    logo: "/Cuccio_logo.webp",
  },
  {
    name: "Shiseido",
    logo: "/Shiseido-Logo.png",
  },
  {
    name: "Eco Style",
    logo: "/eco-style-logo.webp",
  },
  {
    name: "Navitas Organics",
    logo: "/Navitas_logo.avif",
  },
  {
    name: "L3VEL3",
    logo: "/level3_logo.webp",
  },
  {
    name: "Lily of the Desert",
    logo: "/lily_of_the_desert.jpeg",
  },
  {
    name: "True Skin",
    logo: "/Truskin_logo.webp",
  },
  {
    name: "The Beauty Chef",
    logo: "/the-beauty-chef.webp",
  },
  {
    name: "The Ordinary",
    logo: "/theOrdinary-logo.svg",
  },
  {
    name: "Vedix",
    logo: "/vedix.svg",
  },
  {
    name: "Vitality",
    logo: "/vitality.svg",
  },
  {
    name: "Viva Doria",
    logo: "/vivadoria_logo.avif",
  },
  {
    name: "Webber Naturals",
    logo: "/webber_naturals.avif",
  },
  {
    name: "Wildcraft",
    logo: "/wildcraft.webp",
  },
];

export default function BrandsPage() {
  return (
    <section className="bg-[#EFF3EB] py-20">
      <div className="max-w-7xl mx-auto px-10 md:px-20 lg:px-28">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-medium text-black mb-12">
          Our Brands
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="
                bg-white
                border border-black/10
                rounded-xl
                p-6
                h-[200px]
                flex
                items-center
                justify-center
                transition-transform
                duration-300
                ease-out
                hover:scale-[1.05]
                shadow-sm
                hover:shadow-md
              "
            >
              <Image
                src={"\\brands" + brand.logo}
                alt={brand.name}
                width={180}
                height={120}
                unoptimized
                className="object-contain max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
