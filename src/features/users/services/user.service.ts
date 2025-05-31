import { registerApi } from "../api/users.api";
import { UserRequest } from "../types/user.types";
import type { Response } from "../../../types/api";


export async function registerUser(userData: UserRequest): Promise<Response<null>> {
    const response = await registerApi(userData);
    if (!response?.isSuccess) {
        throw new Error(response?.message || 'Registration error');
    }
    return response;
}