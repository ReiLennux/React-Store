import { useEffect, useState } from 'react';
import type { LoginPayload } from '../types/auth.types';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { getAuthCookie } from '../../../shared/utils/cookies';

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

    const response = await login(form);
    if (response?.isSuccess) {
      setMessage(`¡Bienvenido, ${response.result?.user.name}!`);
    } else {
      setMessage(response?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

      <input
        type="email"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="w-full p-3 border rounded-lg"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        className="w-full p-3 border rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
      )}

      {error && (
        <p className="text-center text-sm text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
}
