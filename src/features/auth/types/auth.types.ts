import type { User } from "../../users/types/user.types";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User
}
