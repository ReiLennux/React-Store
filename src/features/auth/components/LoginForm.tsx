import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginPayload } from '../types/auth.types';
import { useLogin } from '../hooks/useLogin';
import { getAuthCookie } from '../../../shared/utils/cookies';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import login_img from '@/assets/logo.png';

export function LoginForm() {
    const navigate = useNavigate();
    const { login, loading, error } = useLogin();

    const [form, setForm] = useState<LoginPayload>({ username: '', password: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (getAuthCookie('token')) {
            navigate('/home');
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        const response = await login(form);

        if (response?.isSuccess) {
            setMessage(`¡Bienvenido, ${response.result?.user.name}!`);
            navigate('/home');
        } else {
            setMessage(response?.message || 'Error al iniciar sesión');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div>
                <img src={login_img} alt="logo" className="w-24 mb-4" />
                <h1 className="text-4xl font-bold mb-1">
                    Welcome Again!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to log in to your account.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="username">Email</Label>
                    <Input
                        id="username"
                        name="username"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={form.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="•••••••••••"
                        required
                        value={form.password}
                        onChange={handleInputChange}
                    />
                </div>

                <Button type="submit" className="w-full">
                    {loading ? 'Loading...' : 'Login'}
                </Button>

                {(message || error) && (
                    <div className="text-center text-sm">
                        {message && <p className="text-green-600">{message}</p>}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                )}
            </div>
        </form>
    )
}