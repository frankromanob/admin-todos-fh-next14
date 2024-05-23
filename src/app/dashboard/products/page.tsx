import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function ProductsPage() {
    return (
        <>
            <h1>Products Page</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-3 gap-2">
                {
                    products.map(product => (
                        <ProductCard key={product.id} producto={product} />

                    ))
                }
            </div>
        </>
    );
}