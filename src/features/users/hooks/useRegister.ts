import { useState } from "react";
import { UserRequest } from "../types/user.types";
import type { Response } from "../../../types/api";
import { assignRole } from "../services/user.service";


export function useAssignRole() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const AssignRole = async (userData: UserRequest) : Promise<Response<null>> => {
        setLoading(true);
        setError(null);

        try {
            const response = await assignRole(userData);
            return response;
        }catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    return { AssignRole, loading, error };
}