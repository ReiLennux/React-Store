import type { Response } from "@/types/api";
import { CartDto, CartHeaderDto } from "../types/cart.type";
import { getAuthCookie } from "@/shared/utils/cookies";

const token = getAuthCookie("token");

export async function getCart(userId: number): Promise<Response<CartDto>> {
    const API_URL = "http://localhost:7878";

    try {
        const res = await fetch(`${API_URL}/api/shopping-cart/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Get Cart Failed:', error);
        throw error;
    }
}

export async function upsertCart(cartDto: CartDto): Promise<Response<boolean>> {

    const API_URL = "http://localhost:7878";

    try {
        const res = await fetch(`${API_URL}/api/shopping-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cartDto)
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Upsert Cart Failed:', error);
        throw error;
    }

}

export async function deleteCart(cartHeaderId: number): Promise<Response<boolean>> {
    const API_URL = "http://localhost:7878";

    try {
        const res = await fetch(`${API_URL}/api/shopping-cart/${cartHeaderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Delete Cart Failed:', error);
        throw error;
    }
}

export async function applyCoupon(cartHeaderDto: CartHeaderDto): Promise<Response<boolean>> {

    const API_URL = "http://localhost:7878";

    try {
        const res = await fetch(`${API_URL}/api/shopping-cart/apply-coupon`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cartHeaderDto)
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Apply Coupon Failed:', error);
        throw error;
    }
}

export async function removeCoupon(cartHeaderDto: CartHeaderDto): Promise<Response<boolean>> {
    const API_URL = "http://localhost:7878";

    try {
        const res = await fetch(`${API_URL}/api/shopping-cart/remove-coupon/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cartHeaderDto)
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Remove Coupon Failed:', error);
        throw error;
    }
}