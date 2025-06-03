import { getUserRole } from "@/shared/utils/tokenDecoder";
import { useEffect, useState } from "react";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  return role;
}
