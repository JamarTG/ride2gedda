import {
  Bus,
  LayoutDashboard,
  MapPin,
  AlertTriangle,
  Bell,
  BarChart3,
  LogOut,
  Sun,
  Moon,
  TestTube,
} from "lucide-react";
import { ICON_SIZE } from "@/lib/icons/iconSizes";
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
import React from "react";

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
  const { theme, toggleTheme } = useTheme();

  const ThemeIcon = theme === "light" ? Moon : Sun;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-3 py-4">
            <span className={`${collapsed ? "hidden" : ""} font-display text-2xl font-bold tracking-tight text-primary`}>
              ride2gedda.com 🇯🇲
            </span>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({to, icon: Icon, label}) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent hover:text-primary"
                  >
                    <NavLink
                      to={to}
                      end
                      className="h-10 text-base"
                      activeClassName="text-primary font-medium"
                    >
                      <Icon size={ICON_SIZE.nav} className="mr-2" />
                      <span className={`${collapsed ? "hidden" : ""}`}>{label}</span>
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ThemeIcon size={ICON_SIZE.nav} />
            <span className={`${collapsed ? "hidden" : ""}`}>Toggle theme</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-base text-muted-foreground transition-colors hover:text-destructive"
          >
            <LogOut size={ICON_SIZE.nav} />
            <span className={`${collapsed ? "hidden" : ""}`}>Logout</span>
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
            {/* <span className="ml-2 font-display text-sm font-semibold">
              ride2gedda 🇯🇲
            </span> */}
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
