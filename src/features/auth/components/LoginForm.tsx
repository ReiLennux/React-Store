import { useEffect, useState } from 'react';
import type { LoginPayload } from '../types/auth.types';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { getAuthCookie } from '../../../shared/utils/cookies';
import { Button } from '../../../components/ui/button';
import { CardHeader, Card, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

export function LoginForm() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAuthCookie('token')) {
      navigate('/home');
    }
  }, []);

  const { login, loading, error } = useLogin();
  const [form, setForm] = useState<LoginPayload>({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    console.log('Form submitted:', form);

    const response = await login(form);
    if (response?.isSuccess) {
      setMessage(`¡Bienvenido, ${response.result?.user.name}!`);
      navigate('/home');
    } else {
      setMessage(response?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="username"
                  value={form.username}
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
                  required
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {loading ? 'Loading...' : 'Login'}
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
