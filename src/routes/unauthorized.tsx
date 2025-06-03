import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
      <h1 className="text-3xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="text-gray-600">You don't have permission to access this page.</p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
}
