import { Navigate } from "react-router-dom";
import { getAuthCookie } from "../utils/cookies";
import type { JSX } from "react";
import { useUserRole } from "@/hooks/useUserRole";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}


export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = getAuthCookie("token");
  const role = useUserRole(); 
  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && allowedRoles.length > 0 && role) {
    try {

      if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
      }
    } catch (e) {
      console.error("Error decoding token", e);
      return <Navigate to="/auth" />;
    }
  }

  return children;
}
