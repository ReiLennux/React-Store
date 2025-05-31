import { useState } from "react";
import { UserRequest } from "../types/user.types";
import type { Response } from "../../../types/api";
import { registerUser } from "../services/user.service";


export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (userData: UserRequest) : Promise<Response<null>> => {
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