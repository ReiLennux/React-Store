import type { AuthResponse, LoginPayload, RegisterRequest } from "../types/auth.types";
import type { Response } from "../../../types/api";

export async function loginApi(credentials: LoginPayload): Promise<Response<AuthResponse>> {
    const API_URL = "http://localhost:7676"; 
    
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
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
        throw error; // Es mejor lanzar el error para que useLogin pueda manejarlo
    }
}

export async function registerApi(request: RegisterRequest): Promise<Response<null>> {
    const API_URL = "http://localhost:7676"; // Replace with your actual API URL
    
    try {
        const res = await fetch(`${API_URL}/api/auth/register`, {
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
        throw error; // Es mejor lanzar el error para que use pueda manejarlo
    }
}