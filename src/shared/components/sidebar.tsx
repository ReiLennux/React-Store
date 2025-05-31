// src/shared/components/Sidebar.tsx
import { clearAuthCookies, getAuthCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
    const navigate = useNavigate();
    const name = getAuthCookie('userName');
    const email = getAuthCookie('userEmail');
    const phone = getAuthCookie('userPhoneNumber');

    return (
        <aside className="w-64 bg-gray-100 p-4 rounded-xl shadow">
            <h2 className="text-xl font-bold">Bienvenido</h2>
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p className='hover:text-red-600'>
                <button onClick={() => {
                    clearAuthCookies();
                    navigate('/login');
                }}>Cerrar sesión</button>

            </p>
        </aside>
    );
}
