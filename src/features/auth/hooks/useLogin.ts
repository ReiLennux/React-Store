import { useState } from 'react';
import { login as loginService } from '../services/auth.service';
import type { Response } from "../../../types/api";
import type { AuthResponse, LoginPayload } from '../types/auth.types';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginPayload): Promise<Response<AuthResponse> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginService(credentials);
      return response;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}