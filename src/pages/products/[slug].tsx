import { useRouter } from "next/router";
import ProductDetailsPage from "@/components/ProductDetailsPage";
import { products } from "@/data/products";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;

  const product = products.find((p) => p.id === slug);

  if (!product) return <p className="text-center py-20">Product not found.</p>;

  return <ProductDetailsPage product={product} />;
}
