import type { Response } from "../../../types/api";
import { UserRequest } from "../types/user.types";

const API_URL = import.meta.env.VITE_AUTH_MS_URL || '';


export async function AssignRole(request: UserRequest): Promise<Response<null>> {    
    try {
        const res = await fetch(`${API_URL}/assignRole`, {
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