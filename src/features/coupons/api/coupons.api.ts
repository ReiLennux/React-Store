/* eslint-disable no-useless-catch */
import { getAuthCookie } from "@/shared/utils/cookies";
import { CouponsRequestDto, CouponsResponseDto } from "../types/coupons.types";
import { Response } from "@/types/api";


const API_URL = import.meta.env.VITE_COUPON_MS_URL || '';
const token = getAuthCookie("token");


export async function getAllCoupons(): Promise<Response<CouponsResponseDto[]>> {

    try {
        const res = await fetch(`${API_URL}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`)
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}

export async function getCouponById(id: number): Promise<Response<CouponsResponseDto>> {

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`)
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}

export async function getCouponByCode(code: string): Promise<Response<CouponsResponseDto>> {

    try {
        const res = await fetch(`${API_URL}/by-code/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`)
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}

export async function postCoupon(request: CouponsRequestDto): Promise<Response<CouponsResponseDto>> {

    try {
        const res = await fetch(`${API_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error Request:', error);
        throw error;
    }
}


export async function patchCoupon(id: number, request: CouponsRequestDto): Promise<Response<CouponsResponseDto>> {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(request),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error Request:', error);
        throw error;
    }
}

export async function deleteCoupon(id: number): Promise<Response<null>> {

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`)
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}