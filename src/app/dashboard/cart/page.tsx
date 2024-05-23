import { Product } from "@/lib/products";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { products } from '../../../lib/products';
import { ItemCard } from "@/components/ItemCard";
import { WidgetItem } from "@/components";

export const metadata = {
    title: 'Carrito de compras',
    description: 'FH Next 14 Course project',
}

interface ProductInCart {
    product: Product,
    quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }) => {
    const productsInCart: ProductInCart[] = []

    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id)
        if (product) {
            productsInCart.push({ product: product, quantity: cart[id] })
        }
    }
    return productsInCart;
}

export default function CartPage() {

    const cookieStore = cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number }
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce(
        (prev, current) => (current.product.price * current.quantity) + prev, 0)

    return (
        <div>
            <h1 className="text-5xl" >Productos en el carrito</h1>
            <hr className="mb-2" />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsInCart.map(product => (

                            <ItemCard key={product.product.id} product={product.product} quantity={product.quantity} />

                        ))
                    }
                </div>
                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title={"Total a pagar"}  >
                        <div className="mt-2 justify-center gap-4">
                            <h3 className="text-3xl font-bold text-center text-gray-700">${(totalToPay*1.15).toFixed(2)}</h3>
                        </div>
                        <span className="font-bold text-center text-gray-500" >Tax 15%: ${totalToPay * 0.15}</span>
                    </WidgetItem>

                </div>
            </div>
        </div>
    );
}