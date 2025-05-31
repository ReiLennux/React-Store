import { Navigate } from 'react-router-dom';
import { getAuthCookie } from '../utils/cookies';
import type { JSX } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = getAuthCookie('token');
  return token ? children : <Navigate to="/login" />;
}
