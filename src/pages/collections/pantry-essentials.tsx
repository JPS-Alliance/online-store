import ProductCollectionSection from "@/components/ProductCollectionSection";
import { products } from "@/data/products";

export default function HairCarePage() {
    return (
        <>
            <ProductCollectionSection
                title="Pantry Essentials"
                products={products.filter(p => p.category === "Pantry Essentials")}
            />
        </>
    )
}