// src/shared/components/Sidebar.tsx
import { Home, ChevronUp, User2, Store, UserCircle } from 'lucide-react';
import { clearAuthCookies, getAuthCookie } from '../utils/cookies';
import { useNavigate } from 'react-router-dom';
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar, SidebarFooter } from '../../components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Users",
    url: "/user",
    icon: UserCircle,
  },
  {
    title: "Products",
    url: "/Products",
    icon: Store,
  },
]

export function AppSidebar() {
  const navigate = useNavigate();
  const name = getAuthCookie('userName');
  const email = getAuthCookie('userEmail');
  const phone = getAuthCookie('userPhoneNumber');
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>POS - Lenn Monroy </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {name}
                  <span className="text-xs text-muted-foreground ml-2">{email} {phone}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => {
                    clearAuthCookies();
                    navigate('/login');
                  }}
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
