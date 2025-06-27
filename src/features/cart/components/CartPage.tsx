import CartDetails from "./CartDetails";
import { useGetCart as use } from "../hooks/useCart";
import { CartDto } from "../types/cart.type";
import { useState } from "react";
import { getAuthCookie } from "@/shared/utils/cookies";
import CartSummary from "./CartSummary";

export default function CartPage() {

    const userId = getAuthCookie('userId');

    const { UseGetCart, loading, error } = use();
    const [data, setData] = useState<CartDto>()

    const getCart = async () => {
        if (!userId) return;
        const numericUserId = Number(userId);
        if (isNaN(numericUserId)) return;
        const response = await UseGetCart(numericUserId);
        if (response && response.isSuccess && response.result) {
            setData(response.result);
        }
    };

    useState(() => {
        getCart();
    });


    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

                    <CartDetails
                        cartDetails={data?.cartDetails || []}
                        loading={loading}
                        error={error}
                    />

                </div>

                <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-6">
                    <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                    <CartSummary
                        CartHeader={data?.cartHeader || null}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}