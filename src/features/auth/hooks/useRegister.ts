import { useState } from "react";
import type { Response } from "../../../types/api";
import { RegisterRequest } from "../types/auth.types";
import { registerUser } from "../services/auth.service";


export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (userData: RegisterRequest) : Promise<Response<null>> => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerUser(userData);
            return response;
        }catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    return { register, loading, error };
}