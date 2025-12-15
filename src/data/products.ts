export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  images: string[];
  inStock: boolean;
  dateAdded: Date;
  sales: number;
};

const Brand = {
  L3VEL3: "L3VEL3",
}

const Category = {
  HairCare: "Hair Care"
}

export const products: Product[] = [
  {
    id: "l3vevl3-pomade",
    name: "L3VEL3 Pomade - Improves Hair Strength and Volume",
    price: 13.99,
    description: `IMPROVE YOUR HAIR'S HEALTHY. Our pomade is enriched with keratin which helps strengthen weak strands and promotes strong, breakage resistant hair. It also protects hair against damage from environmental stressors and heated styling tools.\n

    LEVEL UP YOUR LUSTER. Say hello to megawatt shine with this amazing pomade. It adds definition and a dramatic gloss to your hair for a head turning look. Enjoy sexy hair that dazzles everyone you meet and gives the sun competition.\n

    ENJOY LONG LASTING HOLD. Our lightweight, non gunky formula is a winner for creating well groomed styles that demand extreme hold. It keeps hair in place without weighing it down while offering the freedom to reshape and style for a look that pops.\n

    PROFESSIONAL GROOMING AT HOME. L3VEL3 offers everything a regular consumer or a professional barber could need, from styling products to cleansing sprays. We're continually developing new products that make the latest hair trends achievable.\n

    A BRAND BUILT BY ARTISTS. Our mission is to shake up the men’s grooming industry by providing professional products that deliver results and are accessible to general consumers. Every ethical and innovative move we make are inspired by our artists.`,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/pomade/img1.webp",
      "/products/l3vel3/pomade/img2.webp",
      "/products/l3vel3/pomade/img3.webp",
      "/products/l3vel3/pomade/img4.jpg",
      "/products/l3vel3/pomade/img5.jpg",
      "/products/l3vel3/pomade/img6.webp",
      "/products/l3vel3/pomade/img7.webp",
      "/products/l3vel3/pomade/img8.webp",
      "/products/l3vel3/pomade/img9.webp",
      "/products/l3vel3/pomade/img10.webp",
      "/products/l3vel3/pomade/img11.webp",
      "/products/l3vel3/pomade/img12.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
];
