import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRequest } from "../types/user.types";
import { useRegister } from "../hooks/useRegister";
import { useAlert } from "@/contexts/AlertContext";


export function UsersForm() {
    const navigate = useNavigate();

    const { showAlert } = useAlert();
    const { register, loading, error } = useRegister();
    const [form, setForm] = useState<UserRequest>({ name: '', password: '', email: '', phoneNumber: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        const response = await register(form);
        if (response?.isSuccess) {
            setMessage(`${response.message}!`);
            showAlert(response.message!, 'success', 3000);
            setTimeout(() => {
                navigate('/auth');
            }, 2000); // Redirect after 2 seconds
        } else {
            setMessage(response?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Card className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
                    <CardHeader>
                        <CardTitle>Register a new user</CardTitle>
                        <CardDescription>
                            Please fill in the details below to create a new user account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Role</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.pos"
                                    required
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            {loading ? 'Loading...' : 'Register'}
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