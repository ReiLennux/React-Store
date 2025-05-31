// src/shared/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
              <main className="flex-1 p-6">
        <Outlet />
      </main>
      </SidebarProvider>

    </div>
  );
}
