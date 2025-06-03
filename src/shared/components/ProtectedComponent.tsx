import { JSX } from "react";
import { useUserRole } from "@/hooks/useUserRole";

interface ProtectedComponentProps {
  allowedRoles: string[];
  children: JSX.Element;
}

export function ProtectedComponent({ allowedRoles, children }: ProtectedComponentProps) {
  const role = useUserRole();

  if (!allowedRoles.includes(role!)) return null;
  return children;
}
