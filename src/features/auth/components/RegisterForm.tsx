import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@/contexts/AlertContext";
import { useRegister } from "../hooks/useRegister";
import { RegisterRequest } from "../types/auth.types";


export function RegisterForm() {
    const navigate = useNavigate();

    const { showAlert } = useAlert();
    const { register, loading, error } = useRegister();
    const [form, setForm] = useState<RegisterRequest>({ name: '', password: '', email: '', phoneNumber: '' });
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
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div>
                <h1 className="text-4xl font-bold mb-1">
                    Hi! Sign In!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Please fill in the details below to create a new user account.
                </p>
            </div>
            <div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
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
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                        </div>
                        <Input
                            id="phoneNumber"
                            type="number"
                            placeholder="7733362277"
                            required
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="•••••••••••"
                            required
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                    {message && (
                        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
                    )}

                    {error && (
                        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
                    )}
                </div>
            </div>
        </form>

    );
}