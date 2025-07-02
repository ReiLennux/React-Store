import type { AuthResponse, LoginPayload, RegisterRequest } from "../types/auth.types";
import type { Response } from "../../../types/api";

const API_URL = import.meta.env.VITE_AUTH_MS_URL || '';


export async function loginApi(credentials: LoginPayload): Promise<Response<AuthResponse>> {    
    try {
        const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        });
    
        if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }
    
        return await res.json();
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}

export async function registerApi(request: RegisterRequest): Promise<Response<null>> {
    
    try {
        const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        });
    
        if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}