import { getAuthCookie } from "./cookies";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
    roles: string;
}

export function getUserRole(): string | null {
    const token = getAuthCookie('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.roles[0];
    } catch {
        return null;
    }
}