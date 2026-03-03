import { Bus, LayoutDashboard, MapPin, AlertTriangle, Bell, BarChart3, LogOut, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/routes", icon: MapPin, label: "Routes" },
  { to: "/reports", icon: AlertTriangle, label: "Reports" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
  { to: "/predictions", icon: BarChart3, label: "Predictions" },
];

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout: VoidFunction;
}

function AppSidebar({ onLogout }: { onLogout: VoidFunction }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        
        <div className="flex items-center gap-2 px-3 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-display text-lg font-bold tracking-tight">JUTC</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.to} end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        
        <div className="mt-auto flex flex-col gap-1 p-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {!collapsed && <span>Toggle theme</span>}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AppLayout({ children, onLogout }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b bg-card/80 backdrop-blur-lg sticky top-0 z-50">
            <SidebarTrigger className="ml-2" />
            <span className="ml-2 font-display text-sm font-semibold">JUTC Smart Commute</span>
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
