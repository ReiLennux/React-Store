import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">User Home</h1>
        <p className="text-lg">Welcome to the user home page!</p>
        <p className="text-sm text-gray-500 mt-2">This is a protected route for authenticated users.</p>
        <Button
          className="mt-6 w-full"
          onClick={() => navigate("/user/register")}
        >Register a new User</Button>
      </div>
    </div>

  );
}