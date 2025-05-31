// src/shared/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/sidebar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
