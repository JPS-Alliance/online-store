import ProductCollectionSection from "@/components/ProductCollectionSection";
import { products } from "@/data/products";

export default function HairCarePage() {
    return (
        <>
            <ProductCollectionSection
                title="Skin Care"
                products={products.filter(p => p.category === "Skin Care")}
            />
        </>
    )
}