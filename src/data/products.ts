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
  SHISEIDO: "SHIDEIDO",
  ECO_STYLE: "ECO STYLE",
  CUCCIO: "CUCCIO",
  LILY_OF_THE_DESERT: "LILY OF THE DESERT",
  NAVITAS_ORGANICS: "NAVITAS ORGANICS"
}

const Category = {
  HairCare: "Hair Care",
  SkinCare: "Skin Care",
  PantryEssentials: "Pantry Essentials"
}

// YYYY-MM-DD → stable seed per day
const getDateSeed = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

// Simple seeded RNG (Mulberry32)
const seededRandom = (seed: number) => {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Convert string seed → number
const stringToSeed = (str: string) =>
  str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const rng = seededRandom(stringToSeed(getDateSeed()));

const randomDateWithinLastYear = () => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);

  return new Date(
    past.getTime() + rng() * (now.getTime() - past.getTime())
  );
};

const randomSales = () => {
  const r = rng();

  if (r < 0.6) return Math.floor(rng() * 40) + 5;     // 5–45
  if (r < 0.9) return Math.floor(rng() * 150) + 50;  // 50–200
  return Math.floor(rng() * 500) + 200;              // 200–700
};

const randomInStockHighProbability = () => {
  return rng() < 0.97;
};

// Shuffle array using seeded RNG
const shuffle = <T>(array: T[], randomFn: () => number) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Get today's featured products
export const getHottest = () => {
  const seed = stringToSeed(getDateSeed() + "-featured"); // unique seed for featured
  const rng = seededRandom(seed);

  const shuffled = shuffle(products, rng);

  const [featured, secondary1, secondary2] = shuffled;

  return {
    featured,
    secondary: [secondary1, secondary2],
  };
};

// Get today's hottest products automatically excluding featured
export const getFeatured = () => {
  const { featured, secondary } = getHottest(); // get deterministic featured first
  const exclude = [featured, ...secondary];

  const seed = stringToSeed(getDateSeed() + "-hot"); // unique seed for hottest
  const rng = seededRandom(seed);

  const available = products.filter(p => !exclude.includes(p));
  const shuffled = shuffle(available, rng);

  // Sort by sales descending
  const sortedBySales = shuffled.sort((a, b) => b.sales - a.sales);

  return sortedBySales.slice(0, 4);
};


const rawProducts: Product[] = [
  {
    id: "l3vel3-pomade",
    name: "L3VEL3 Pomade - Improves Hair Strength and Volume",
    price: 13.99,
    description: `
    IMPROVE YOUR HAIR'S HEALTHY.
    - Our pomade is enriched with keratin which helps strengthen weak strands and promotes strong, breakage-resistant hair.
    - Protects hair against damage from environmental stressors and heated styling tools.

    LEVEL UP YOUR LUSTER.
    - Adds definition and dramatic gloss to your hair for a head-turning look.
    - Enjoy sexy hair that dazzles everyone you meet.

    ENJOY LONG-LASTING HOLD.
    - Lightweight, non-gunky formula for well-groomed styles that demand extreme hold.
    - Keeps hair in place without weighing it down.
    - Offers freedom to reshape and style for a look that pops.

    PROFESSIONAL GROOMING AT HOME.
    - L3VEL3 offers everything a regular consumer or professional barber could need.
    - Styling products, cleansing sprays, and more for the latest hair trends.

    A BRAND BUILT BY ARTISTS.
    - Shaking up the men’s grooming industry with professional products accessible to general consumers.
    - Every ethical and innovative move is inspired by our artists.
    `,
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
  {
    id: "l3vel3-paste",
    name: "L3VEL3 Paste - Long-Lasting Hold",
    price: 16.99,
    description: `
    - Improves volume and strength
    - Long-lasting manageable firm hold
    - Infused with Keratin
    - Protects against hair damage
    - Helps reduce the risk of frizz
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/paste/img1.webp",
      "/products/l3vel3/paste/img2.webp",
      "/products/l3vel3/paste/img3.webp",
      "/products/l3vel3/paste/img4.webp",
      "/products/l3vel3/paste/img5.webp",
      "/products/l3vel3/paste/img6.webp",
      "/products/l3vel3/paste/img7.webp"
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-forming-cream",
    name: "L3VEL3 Forming Cream - Boosts Hair Volume, 150 ml",
    price: 13.79,
    description: `
    RESIDUE FREE.
    - Because of its light, creamy consistency, this cream is easy to work with and won't weigh down your tresses.
    - It leaves behind no residue that can make hair look dull and unclean and washes out easily to prevent product build up.

    GIVE YOUR TRESSES CHARACTER
    - Our cream defines the strands and adds volume and texture to countless styles.
    - Your hair is left feeling soft without being stiff or sticky.
    - It is great for all hair types so you can create your individual hairstyle.

    KEEP YOUR MANE IN PLACE
    - This cream also offers medium hold that keeps your style secure until you decide to switch things up.
    This product offers awesome styling potential and keeps your hair in place for a boost of confidence.

    PROFESSIONAL GROOMING AT HOME
    - L3VEL3 offers everything a regular consumer or a professional barber could need, from styling products to cleansing sprays.
    - We're continually developing new products that make the latest hair trends achievable.

    A BRAND BUILT BY ARTISTS
    - Our mission is to shake up the men’s grooming industry by providing professional products that deliver results and are accessible to general consumers.
    Every ethical and innovative move we make are inspired by our artists.
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/forming-cream/img1.webp",
      "/products/l3vel3/forming-cream/img2.webp",
      "/products/l3vel3/forming-cream/img3.webp",
      "/products/l3vel3/forming-cream/img4.webp",
      "/products/l3vel3/forming-cream/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-spider-wax",
    name: "L3VEL3 Spider Wax",
    price: 13.49,
    description: `
    DELIVERS LONG-LASTING HOLD
    - Lock your hair in place with a product that delivers all-day hold.
    - Our unique fiber hair wax whips up height and texture that lasts.
    - The innovative formula works just like a spiderweb, catching every strand of hair.

    IMPROVES FLEXIBILITY WITH MEDIUM SHINE
    - Use our hair wax to try out new hairstyles that deliver the ultimate flexibility.
    - This styling hair wax for men is specially designed for men who want a long-lasting medium shine.

    FLAKE-FREE FORMULA
    - The water-based formula washes out easily, leaving no residue that could make your hair look dull or unhealthy.
    - This spider wax whips through your hair cleanly, creating no unsightly flakes to spoil your look.

    PROFESSIONAL GROOMING AT HOME
    - L3VEL3 offers everything a regular consumer or a professional barber could need, from styling products to cleansing sprays.
    We're continually developing new products that make the latest hair trends achievable.

    A BRAND BUILT BY ARTISTS
    - Our mission is to shake up the men’s grooming industry by providing professional products that deliver results and are accessible to general consumers.
    Every ethical and innovative move we make is inspired by our artists.
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/spider-wax/img1.webp",
      "/products/l3vel3/spider-wax/img2.webp",
      "/products/l3vel3/spider-wax/img3.webp",
      "/products/l3vel3/spider-wax/img4.webp",
      "/products/l3vel3/spider-wax/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-styling-powder",
    name: "L3VEL3 Styling Powder",
    price: 13.99,
    description: `
    NATURAL LOOK
    - Our hair powder for men gives you that desired natural look while providing you with volume and texture.

    NO OILY OR GREASY RESIDUE
    - We formulated the hair styling powder men with ingredients that doesn't leave any residue around.

    EASY TO APPLY
    - Our hair powder men styling is very easy to apply and use, simply sprinkle the powder and spread it through your hair.

    DELIVERS MATTE FINISH
    - The texture powder for men gives you the styling and volume while also delivering a clean matte finish.

    ADDS VOLUME AND TEXTURE
    - Use our powder for hair to give you the volume and texture you seek while styling!
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/styling-powder/img1.webp",
      "/products/l3vel3/styling-powder/img2.webp",
      "/products/l3vel3/styling-powder/img3.webp",
      "/products/l3vel3/styling-powder/img4.webp",
      "/products/l3vel3/styling-powder/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-tinted-gel",
    name: "L3VEL3 Tinted Gel, 250 ml",
    price: 13.79,
    description: `
    INTENSIFY YOUR HAIR COLOR. This tinted gel temporarily covers gray or white hair and can be used to instantly disguise roots or refresh a faded dye job. You can switch it up from gray to black on a whim for an occasion or to match your threads.
    PUMP UP THE VOLUME. Amplify any style, whether sleek or messy with our innovative hair gel. It defines and glosses individual strands and delivers a charismatic finish. Achieve awe inspiring volume and texture that is immediately impressive.
    ULTIMATE STAYING POWER. Enjoy a hair gel that bonds to the hair to make it stronger and more resilient. This product was developed to lock hairstyles in place without stiffness or stickiness and leave you walking in confidence all day long.
    PROFESSIONAL GROOMING AT HOME. L3VEL3 offers everything a regular consumer or a professional barber could need, from styling products to cleansing sprays. We're continually developing new products that make the latest hair trends achievable.
    A BRAND BUILT BY ARTISTS. Our mission is to shake up the men’s grooming industry by providing professional products that deliver results and are accessible to general consumers. Every ethical and innovative move we make are inspired by our artists.
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/tinted-gel/img1.webp",
      "/products/l3vel3/tinted-gel/img2.webp",
      "/products/l3vel3/tinted-gel/img3.webp",
      "/products/l3vel3/tinted-gel/img4.webp",
      "/products/l3vel3/tinted-gel/img5.webp",
      "/products/l3vel3/tinted-gel/img6.webp",
      "/products/l3vel3/tinted-gel/img7.webp",
      "/products/l3vel3/tinted-gel/img8.webp",
      "/products/l3vel3/tinted-gel/img9.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-sea-salt-texturizing-spray",
    name: "L3VEL3 Sea Salt Texturizing Spray, 250ml",
    price: 19.99,
    description: `
    - Texturizing and volumizing salt spray suitable for straight, curly, short, or long hair.
    - Creates natural, messy texture or relaxed curls with added fullness.
    - Moisturizes with castor oil, ensuring hair stays soft and touchable without the crunch.
    - Light hold (level 1) for easy reshaping and a natural look that washes out cleanly.
    - Versatile for all hair types, ideal for both men and women
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/sea-salt-texturizing-spray/img1.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img2.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img3.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img4.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img5.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img6.webp",
      "/products/l3vel3/sea-salt-texturizing-spray/img7.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-light-hold-styling-powder",
    name: "L3VEL3 Light Hold Styling Powder, 30g",
    price: 13.99,
    description: `
    - Light hold styling powder suitable for both men and women
    - Texturizing and Volumizing
    - Natural Matte Hairstyle
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/light-hold-styling-powder/img1.webp",
      "/products/l3vel3/light-hold-styling-powder/img2.webp",
      "/products/l3vel3/light-hold-styling-powder/img3.webp",
      "/products/l3vel3/light-hold-styling-powder/img4.webp",
      "/products/l3vel3/light-hold-styling-powder/img5.webp",
      "/products/l3vel3/light-hold-styling-powder/img6.webp",
      "/products/l3vel3/light-hold-styling-powder/img7.webp",
      "/products/l3vel3/light-hold-styling-powder/img8.webp",
      "/products/l3vel3/light-hold-styling-powder/img9.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-matte-putty",
    name: "L3VEL3 Matte Putty, 5 Ounce",
    price: 13.99,
    description: `
    - Medium hold level of 2, offering a balance between control and flexibility
    - Provides a modern, on-trend matte finish
    - Easy to apply and rework throughout the day
    - Suitable for all hair types
    - Contains beneficial ingredients like beeswax, Ethylhexyl Palmitate, and Bentonite
    - Gentle on the hair, leaving it feeling soft and manageable
    `,
    brand: Brand.L3VEL3,
    category: Category.HairCare,
    images: [
      "/products/l3vel3/matte-putty/img1.webp",
      "/products/l3vel3/matte-putty/img2.webp",
      "/products/l3vel3/matte-putty/img3.webp",
      "/products/l3vel3/matte-putty/img4.webp",
      "/products/l3vel3/matte-putty/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },

  {
    id: "shideido-fino",
    name: "Shiseido Fino Premium Touch penetration Essence Hair Mask, 230g",
    price: 21.99,
    description: `
    - The damage care hair mask contains 7 good-for-hair ingredients to deeply moisturize, strengthen, and repair hair damage while smoothing and preventing hair colour from fading.
    - This hair mask is designed for effective and fast hair repair. No matter if your hair is naturally dry, damaged by coloring, perming, sun exposure, and/or other environmental factors, Shiseido's hair mask can quickly repair damaged hair.
    `,
    brand: Brand.SHISEIDO,
    category: Category.HairCare,
    images: [
      "/products/shiseido/fino/img1.jpg",
      "/products/shiseido/fino/img2.jpg",
      "/products/shiseido/fino/img3.jpg",
      "/products/shiseido/fino/img4.jpg",
      "/products/shiseido/fino/img5.jpg",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },

  {
    id: "ecostyle-argan-oil-32oz",
    name: "Eco Style Moroccan Argan Oil Gel, 32 Ounce",
    price: 24.99,
    description: `
    Condition and revitalize your hair with a lightweight gel containing natural argan oil to provide nourishment, control frizz and add shine.
    - Made with 100 percent argan oil
    - For all hair types
    - Contains uv protection
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/argan-oil-32oz/img1.webp",
      "/products/eco_style/argan-oil-32oz/img2.webp",
      "/products/eco_style/argan-oil-32oz/img3.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-curl-and-wave",
    name: "Eco Style Curl & Wave Styling Gel, 8 Ounce",
    price: 12.99,
    description: `
    FLAKE FREE
    - Our non-flaking hair gel gives you perfect wash-and-go hairstyles without a shower of unwanted flakes

    CONTROL EDGES, STRAYS, AND FLY-AWAYS
    - This hair gel delivers the strongest edge control with extreme hold so you can create high definition looks that last all day

    FIND YOUR PERFECT GEL
    - Eco Style Professional Styling Gel was the first alcohol-free hair styling product to hit the market
    - Today we offer the largest selection of hair styling gels so that you can choose the right gel for any style you desire

    HOME GROWN GREEN
    - Eco's mission is to lead the beauty industry in environmental consciousness and green technologies
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/curl-and-wave/img1.webp",
      "/products/eco_style/curl-and-wave/img2.jpg",
      "/products/eco_style/curl-and-wave/img3.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-krystal-clear",
    name: "Eco Style Krystal Clear Gel, 32 Ounce",
    price: 24.99,
    description: `
    Eco Style Krystal styling gel is a strong hold gel that is ideal for any hair type and color. This weightless hair gel provides gravity-defying hold and adds body & shine to all styles. Eco Style Krystal Gel is water based to deliver moisture and help maintain healthy hair.
    - The water-based formula is enriched with wheat protein and high levels of PVP. It adds moisture and brilliant shine
    - Provides long-lasting hold and offers continuous protection against harmful UV rays.
    - This weightless hair gel provides gravity-defying hold.
    - It adds body & shine to all styles.
    - It provides moisture for healthy hair.
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/krystal-clear/img1.webp",
      "/products/eco_style/krystal-clear/img2.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-olive-oil-32oz",
    name: "Eco Style Olive Oil Gel, 32 Ounce",
    price: 21.99,
    description: `
    Made with 100% pure olive oil. Olive oil helps your scalp naturally regulate its own moisturizing system. Olive oil helps attract moisture to the scalp, and holds it in. Like all our styling gels, it is weightless and will leave your hair with a healthy shine and superior hold. Aids in circulation to the scalp, stimulates hair growth and provides a healthy shine and superior hold.
    - 100% pure olive oil styling gel with maximum hold
    - For all hair types
    - Defines, adds body and shine
    - Weightless and provides gravity
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/olive-oil-32oz/img1.webp",
      "/products/eco_style/olive-oil-32oz/img2.webp",
      "/products/eco_style/olive-oil-32oz/img3.webp",
      "/products/eco_style/olive-oil-32oz/img4.webp",
      "/products/eco_style/olive-oil-32oz/img5.jpg",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-coconut-oil",
    name: "Eco Style Coconut Styling Gel, 8 Ounce",
    price: 11.50,
    description: `
    Eco Style Coconut Styling Gel is made with 100% pure coconut oil. Coconut oil helps your scalp naturally regulate its own moisturizing system. Coconut oil helps attract moisture to the scalp and holds it in. Like all our styling gels, it is weightless and will leave your hair with a healthy shine and superior hold. - For All Hair Types - Long Lasting Hold & Shine - No Flakes, No Tack, Anti-Itch DIRECTIONS Apply to dry or wet hair. Work desired amount through hair and style.
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/coconut-oil/img1.webp",
      "/products/eco_style/coconut-oil/img2.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-black-castor-and-flaxseed-oil",
    name: "Eco Style Black Castor & Flaxseed Oil Gel, 8 Ounce",
    price: 11.99,
    description: `
    Eco Style Black Castor and Flaxseed Oil Styling Gel helps to nourish, repair and grow hair. Wheat protein strengthens and protects hair. Like all of our styling gels, it is weightless and will leave your hair with a healthy shine and superior hold. - Shines, Nourishes, Repairs & Grows - No Flake, No Tack, Anti-Itch - contains Vitamin E, Fiber & Omega-3
    - Helps to nourish, repair and grow hair
    - Strengthens and protects hair
    - Leaves hair with a healthy shine and superior hold
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/black-castor-and-flaxseed-oil/img1.webp",
      "/products/eco_style/black-castor-and-flaxseed-oil/img2.webp",
      "/products/eco_style/black-castor-and-flaxseed-oil/img3.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-argan-oil-8oz",
    name: "Eco Style Moroccan Argan Oil Styling Gel, 8 Ounce",
    price: 11.50,
    description: `
    Condition and revitalize your hair with a lightweight gel containing natural argan oil to provide nourishment, control frizz and add shine.
    - Made with 100 percent argan oil
    - For all hair types
    - Contains uv protection
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/argan-oil-8oz/img1.webp",
      "/products/eco_style/argan-oil-8oz/img2.webp",
      "/products/eco_style/argan-oil-8oz/img3.webp",
      "/products/eco_style/argan-oil-8oz/img4.jpg",
      "/products/eco_style/argan-oil-8oz/img5.jpg",
      "/products/eco_style/argan-oil-8oz/img6.jpg",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-olive-oil-24oz",
    name: "Eco Style Olive Oil Gel, 24 Ounce",
    price: 24.99,
    description: `
    Made with 100% pure olive oil. Olive oil helps your scalp naturally regulate its own moisturizing system. Olive oil helps attract moisture to the scalp, and holds it in. Like all our styling gels, it is weightless and will leave your hair with a healthy shine and superior hold. Aids in circulation to the scalp, stimulates hair growth and provides a healthy shine and superior hold.
    - 100% pure olive oil styling gel with maximum hold
    - For all hair types
    - Defines, adds body and shine
    - Weightless and provides gravity
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/olive-oil-24oz/img1.webp",
      "/products/eco_style/olive-oil-24oz/img2.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "ecostyle-olive-oil-8oz",
    name: "Eco Style Olive Oil Gel, 8 Ounce",
    price: 12.99,
    description: `
    Made with 100% pure olive oil. Olive oil helps your scalp naturally regulate its own moisturizing system. Olive oil helps attract moisture to the scalp, and holds it in. Like all our styling gels, it is weightless and will leave your hair with a healthy shine and superior hold. Aids in circulation to the scalp, stimulates hair growth and provides a healthy shine and superior hold.
    - 100% pure olive oil styling gel with maximum hold
    - For all hair types
    - Defines, adds body and shine
    - Weightless and provides gravity
    `,
    brand: Brand.ECO_STYLE,
    category: Category.HairCare,
    images: [
      "/products/eco_style/olive-oil-8oz/img1.webp",
      "/products/eco_style/olive-oil-8oz/img2.webp",
      "/products/eco_style/olive-oil-8oz/img3.jpg",
      "/products/eco_style/olive-oil-8oz/img4.webp",
      "/products/eco_style/olive-oil-8oz/img5.webp",
      "/products/eco_style/olive-oil-8oz/img6.webp",
      "/products/eco_style/olive-oil-8oz/img7.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },

  {
    id: "l3vel3-shaving-gel-aqua",
    name: "L3 Straight Razor Shave Gel - Aqua, 250ml",
    price: 22.99,
    description: `
    SOOTHES THE SKIN
    - Our formula creates a protective barrier of lather over hair to soften strands before you run a metal razor through them.
    - It minimizes friction on the face, so the blades glide smoothly without causing any cuts, or bumps.

    PROTECTS AND HYDRATES SKIN WHEN SHAVING
    - This clear shaving gel is made with a superior formula, allowing you to fully enjoy your shave.
    - The clear shaving gel for men provides a faster, more precise shave while leaving your skin in great shape.

    EASY VISIBILITY WITH REFRESHING FRAGRANCE
    - This non-foaming formula delivers easy visibility, so you can see where the blades from your razor have already passed.
    - There's no need to prime your face with a hot towel since our gel takes care of it all.

    PROFESSIONAL GROOMING AT HOME
    - L3VEL3 offers everything a regular consumer or a professional barber could need, from styling products to cleansing sprays.
    - We're continually developing new products that make the latest hair trends achievable.

    A BRAND BUILT BY ARTISTS
    - Our mission is to shake up the men’s grooming industry by providing professional products that deliver results and are accessible to general consumers.
    - Every ethical and innovative move we make is inspired by our artists.
    `,
    brand: Brand.L3VEL3,
    category: Category.SkinCare,
    images: [
      "/products/l3vel3/shaving-gel-aqua/img1.webp",
      "/products/l3vel3/shaving-gel-aqua/img2.webp",
      "/products/l3vel3/shaving-gel-aqua/img3.webp",
      "/products/l3vel3/shaving-gel-aqua/img4.webp",
      "/products/l3vel3/shaving-gel-aqua/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "l3vel3-blackhead-removal-mask",
    name: "L3VEL3 Deep Cleansing Blackhead Removal Mask",
    price: 16.99,
    description: `
    DEEP CLEANSING BLACKHEAD REMOVAL
    - The blackhead remover black mask penetrates your skin effectively!

    REMOVES IMPURITIES AND DEAD SKIN CELLS
    - The black mask purifying peel-off mask removes the impurities and dead skin cells.

    BALANCES AND RESTORES SKIN RADIANCE
    - The black mask peel off blackhead remover will leave your skin soft, smooth, and glowing.

    CONTAINS NATURAL HERBAL SEED EXTRACTS
    - We made sure to formulate our black mask for blackheads with natural herbal seed extracts.

    CELL-PROTECTIVE AND ANTI-AGING EFFECTS
    - Our peel-off mask gives you cell-protection and anti-aging effects!
    `,
    brand: Brand.L3VEL3,
    category: Category.SkinCare,
    images: [
      "/products/l3vel3/blackhead-removal-mask/img1.webp",
      "/products/l3vel3/blackhead-removal-mask/img2.webp",
      "/products/l3vel3/blackhead-removal-mask/img3.webp",
      "/products/l3vel3/blackhead-removal-mask/img4.webp",
      "/products/l3vel3/blackhead-removal-mask/img5.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },

  {
    id: "cuccio-cuticle-oil-milk-and-honey",
    name: "Cuccio Revitalize Cuticle Oil, Milk and Honey, 2.5 Ounce",
    price: 19.96,
    description: `
    ADVANCED THERAPY FOR DRY HANDS
    - Give your cuticles some much-needed love and care.
    - Our vitamin-infused oil conditioner deeply penetrates your skin with moisture, working to prevent peeling, while healing damaged, cracked nails and hands.

    ARFITICIAL INGREDIENTS BEGONE
    - Obtain salon-quality results without unnatural chemicals touching your skin.
    - 100% paraben free with cruelty free ingredients, this oil is formulated with plant-based preservatives and highly curated natural ingredients.

    INTENSIVE HYDRATION WITH NO HEAVY RESIDUE
    - This oil is the solution to dry, damaged cuticles, and it won't weigh your hands down with excess product.
    - This grease-free formula melts directly into skin, blessing you with healing moisture and shine.

    STRONGER AND LONGER-THAN-EVER NAILS
    - A single application of the oil is sure to strengthen nails and boost natural shine overnight.
    - Perfect for thin, tired nails, our anti-breakage formula promotes the renewal of natural growth and thickness.

    SPA RESULTS FROM HOME
    - Don't overpay for your luxury.
    - Treat yourself to an at-home manicure with this spa-ready product.
    - Housed in a classy bottle design, the Cuticle Revitalizing Oil's delicious scent and salon-quality properties are a delicacy.
    `,
    brand: Brand.CUCCIO,
    category: Category.SkinCare,
    images: [
      "/products/cuccio/cuticle-oil-milk-and-honey/img1.webp",
      "/products/cuccio/cuticle-oil-milk-and-honey/img2.jpg",
      "/products/cuccio/cuticle-oil-milk-and-honey/img3.webp",
      "/products/cuccio/cuticle-oil-milk-and-honey/img4.jpg",
      "/products/cuccio/cuticle-oil-milk-and-honey/img5.webp",
      "/products/cuccio/cuticle-oil-milk-and-honey/img6.jpg",
      "/products/cuccio/cuticle-oil-milk-and-honey/img7.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "cuccio-cuticle-oil-pomegranate-and-fig",
    name: "Cuccio Revitalize Cuticle Oil, Pomegranate and Fig, 2.5 Ounce",
    price: 19.96,
    description: `
    ADVANCED THERAPY FOR DRY HANDS
    - Give your cuticles some much-needed love and care.
    - Our vitamin-infused oil conditioner deeply penetrates your skin with moisture, working to prevent peeling, while healing damaged, cracked nails and hands.

    ARFITICIAL INGREDIENTS BEGONE
    - Obtain salon-quality results without unnatural chemicals touching your skin.
    - 100% paraben free with cruelty free ingredients, this oil is formulated with plant-based preservatives and highly curated natural ingredients.

    INTENSIVE HYDRATION WITH NO HEAVY RESIDUE
    - This oil is the solution to dry, damaged cuticles, and it won't weigh your hands down with excess product.
    - This grease-free formula melts directly into skin, blessing you with healing moisture and shine.

    STRONGER AND LONGER-THAN-EVER NAILS
    - A single application of the oil is sure to strengthen nails and boost natural shine overnight.
    - Perfect for thin, tired nails, our anti-breakage formula promotes the renewal of natural growth and thickness.

    SPA RESULTS FROM HOME
    - Don't overpay for your luxury.
    - Treat yourself to an at-home manicure with this spa-ready product.
    - Housed in a classy bottle design, the Cuticle Revitalizing Oil's delicious scent and salon-quality properties are a delicacy.
    `,
    brand: Brand.CUCCIO,
    category: Category.SkinCare,
    images: [
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img1.webp",
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img2.webp",
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img3.webp",
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img4.webp",
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img5.webp",
      "/products/cuccio/cuticle-oil-pomegranate-and-fig/img6.jpg",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },

  {
    id: "lily-of-the-desert-aloe-vera-gel",
    name: "Lily of The Desert Aloe Vera Gel - 16 oz",
    price: 15.00,
    description: `
    - Support healthy digestion
    - Support a healthy immune system
    - Balance stomach acidity naturally
    - Soothe occasional muscle and joint discomfort
    `,
    brand: Brand.LILY_OF_THE_DESERT,
    category: Category.PantryEssentials,
    images: [
      "/products/lily_of_the_desert/aloe-vera-gel/img1.webp",
      "/products/lily_of_the_desert/aloe-vera-gel/img2.webp",
      "/products/lily_of_the_desert/aloe-vera-gel/img3.webp",
      "/products/lily_of_the_desert/aloe-vera-gel/img4.jpg",
      "/products/lily_of_the_desert/aloe-vera-gel/img5.webp",
      "/products/lily_of_the_desert/aloe-vera-gel/img6.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "navitas-organics-cacao-powder-8oz",
    name: "Navitas Organics Cacao Powder, 8 Ounce",
    price: 17.50,
    description: `
    - Cacao: The Ancient Maya Feel-Good Food! Navitas Organics Cacao Powder is made from low-temperature dried and cold-pressed organic, Fair Trade certified cacao beans.
    - A nutritious alternative to conventional “cocoa”: Navitas Organics Cacao Powder provides 25% DV magnesium, 10% DV iron and 18% DV fiber per serving.
    - Excellent source of antioxidants, including flavanols.
    - Substitute 1:1 for unsweetened cocoa powder. Perfect for smoothies, shakes, oatmeal, raw treats and your favorite baked goods.
    - USDA Organic, Fair Trade, Non-GMO, Kosher, vegan, gluten-free.
    `,
    brand: Brand.NAVITAS_ORGANICS,
    category: Category.PantryEssentials,
    images: [
      "/products/navitas/cacao-powder-8oz/img1.webp",
      "/products/navitas/cacao-powder-8oz/img2.webp",
      "/products/navitas/cacao-powder-8oz/img3.webp",
      "/products/navitas/cacao-powder-8oz/img4.webp",
      "/products/navitas/cacao-powder-8oz/img5.webp",
      "/products/navitas/cacao-powder-8oz/img6.webp",
      "/products/navitas/cacao-powder-8oz/img7.webp",
      "/products/navitas/cacao-powder-8oz/img8.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "navitas-organics-cacao-powder-16oz",
    name: "Navitas Organics Cacao Powder, 16 Ounce",
    price: 32.99,
    description: `
    - Cacao: The Ancient Maya Feel-Good Food! Navitas Organics Cacao Powder is made from low-temperature dried and cold-pressed organic, Fair Trade certified cacao beans.
    - A nutritious alternative to conventional “cocoa”: Navitas Organics Cacao Powder provides 25% DV magnesium, 10% DV iron and 18% DV fiber per serving.
    - Excellent source of antioxidants, including flavanols.
    - Substitute 1:1 for unsweetened cocoa powder. Perfect for smoothies, shakes, oatmeal, raw treats and your favorite baked goods.
    - USDA Organic, Fair Trade, Non-GMO, Kosher, vegan, gluten-free.
    `,
    brand: Brand.NAVITAS_ORGANICS,
    category: Category.PantryEssentials,
    images: [
      "/products/navitas/cacao-powder-16oz/img1.webp",
      "/products/navitas/cacao-powder-16oz/img2.webp",
      "/products/navitas/cacao-powder-16oz/img3.webp",
      "/products/navitas/cacao-powder-16oz/img4.webp",
      "/products/navitas/cacao-powder-16oz/img5.webp",
      "/products/navitas/cacao-powder-16oz/img6.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
  {
    id: "navitas-organics-cacao-nibs-8oz",
    name: "Navitas Organics Cacao Nibs, 8 Ounce",
    price: 17.50,
    description: `
    - Nature's dark chocolate chips!
    - These minimally processed crushed cacao beans (nibs) are an excellent source of antioxidants, iron and magnesium.
    - A whole food, cacao nibs are also a great source of fiber. Sprinkle them onto cereal, trail mix, yogurt or ice cream or mix them into baked goods.
    - USDA Organic, Kosher, Non-GMO, vegan, gluten-free
    - Contains 1 - 8oz. Pouch of Cacao Nibs
    `,
    brand: Brand.NAVITAS_ORGANICS,
    category: Category.PantryEssentials,
    images: [
      "/products/navitas/cacao-nibs-8oz/img1.webp",
      "/products/navitas/cacao-nibs-8oz/img2.webp",
      "/products/navitas/cacao-nibs-8oz/img3.webp",
      "/products/navitas/cacao-nibs-8oz/img4.webp",
      "/products/navitas/cacao-nibs-8oz/img5.webp",
      "/products/navitas/cacao-nibs-8oz/img6.webp",
    ],
    inStock: true,
    dateAdded: new Date("2024-08-01"),
    sales: 125,
  },
];

export const products: Product[] = rawProducts.map((product) => ({
  ...product,
  inStock: randomInStockHighProbability(),
  dateAdded: randomDateWithinLastYear(),
  sales: randomSales(),
}));