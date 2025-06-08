import type { User } from "../../users/types/user.types";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User
}

export interface RegisterRequest {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;

}