import type { AuthResponse, LoginPayload, RegisterRequest } from "../types/auth.types";
import type { Response } from "../../../types/api";
import { loginApi, registerApi } from "../api/auth.api";
import { setAuthCookies } from "../../../shared/utils/cookies";

export async function login(credentials: LoginPayload): Promise<Response<AuthResponse>> {
 const response = await loginApi(credentials);
  if (!response?.isSuccess) throw new Error(response?.message || 'Authentication error');
        
        const { token } = response.result;
        const {id, name, email, phoneNumber} = response.result.user;
        setAuthCookies(Number(id), token, name, email, phoneNumber);
        
        return response;
}

export async function registerUser(userData: RegisterRequest): Promise<Response<null>> {
    const response = await registerApi(userData);
    if (!response?.isSuccess) {
        throw new Error(response?.message || 'Registration error');
    }
    return response;
}