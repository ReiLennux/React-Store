import type { AuthResponse, LoginPayload } from "../types/auth.types";
import type { Response } from "../../../types/api";
import { loginApi } from "../api/auth.api";
import { setAuthCookies } from "../../../shared/utils/cookies";

export async function login(credentials: LoginPayload): Promise<Response<AuthResponse>> {
 const response = await loginApi(credentials);
  if (!response?.isSuccess) throw new Error(response?.message || 'Authentication error');
        
        const { token } = response.result;
        const {name, email, phoneNumber} = response.result.user;
        setAuthCookies(token, name, email, phoneNumber);
        
        return response;
}