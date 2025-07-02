import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRequest } from "../types/user.types";
import { useAssignRole } from "../hooks/useRegister";
import { useAlert } from "@/contexts/AlertContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function UsersForm() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { AssignRole, loading, error } = useAssignRole();

  const [form, setForm] = useState<UserRequest>({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const response = await AssignRole(form);
    if (response?.isSuccess) {
      showAlert(response.message!, "success", 3000);
      setMessage(`${response.message}!`);
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } else {
      setMessage(response?.message || "Error assign role failed");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
          <CardHeader>
            <CardTitle>Register a new user</CardTitle>
            <CardDescription>
              Please fill in the fields to create an account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="+1234567890"
                  required
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={form.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Register"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
      )}
      {error && (
        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
      )}
    </>
  );
}
