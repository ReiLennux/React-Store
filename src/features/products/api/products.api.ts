/* eslint-disable no-useless-catch */
import { Response } from "@/types/api";
import { pagerRequest, pagerResponse, ProductRequestDto, ProductResponseDto } from "../types/products.types";
import { getAuthCookie } from "@/shared/utils/cookies";

const API_URL = "http://localhost:7575";
const token = getAuthCookie("token");


export async function postProduct(request: ProductRequestDto): Promise<Response<ProductResponseDto>> {
    const formData = new FormData();

    formData.append("name", request.name);
    formData.append("price", request.price.toString());
    formData.append("description", request.description || '');
    formData.append("categoryName", request.categoryName);
    formData.append("stock", request.stock.toString());

    if (request.image) {
        formData.append("image", request.image);
    }

    const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`);
    }

    return await res.json();
}

export async function getProducts(): Promise<Response<ProductResponseDto[]>> {
    try {
        const res = await fetch(`${API_URL}/api/products`, {
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

        console.log("fetched products");
        return await res.json();

    } catch (error) {
        throw error;
    }
}

export async function updateProduct(request: ProductRequestDto): Promise<Response<ProductResponseDto>> {
    const formData = new FormData();

    formData.append("name", request.name);
    formData.append("price", request.price.toString());
    formData.append("description", request.description || '');
    formData.append("categoryName", request.categoryName);
    formData.append("stock", request.stock.toString());

    if (request.image) {
        formData.append("image", request.image);
    }

    const res = await fetch(`${API_URL}/api/products/${request.productId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! Status: ${res.status}`);
    }

    return await res.json();
}


export async function getPagerProducts(pager: pagerRequest): Promise<Response<pagerResponse>> {
    try {
        const res = await fetch(`${API_URL}/api/products/All?page=${pager.page}recordsPerPage=${pager.record}`, {
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

        console.log("fetched products");
        return await res.json();

    } catch (error) {
        throw error;
    }
}

export async function deleteProducts(id: number): Promise<Response<null>> {
    try {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
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

        console.log("fetched products");
        return await res.json();

    } catch (error) {
        throw error;
    }
}

export async function getProductById(id: number): Promise<Response<ProductResponseDto>> {
    try {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
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

        console.log("fetched products");
        return await res.json();

    } catch (error) {
        throw error;
    }
}