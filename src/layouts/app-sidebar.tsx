import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings,
} from "lucide-react";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Tryouts", url: "/tryouts", icon: FileText },
  { title: "Tests", url: "/tests", icon: ListChecks },
  { title: "Subtests", url: "/subtests", icon: Layers },
  { title: "Questions", url: "/questions", icon: HelpCircle },
];

const monitoringItems = [
  { title: "Attempts", url: "/attempts", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const systemItems = [{ title: "Settings", url: "/settings", icon: Settings }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuthStore();
  const isActive = (p: string) => pathname.startsWith(p);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2.5 py-1.5 ${collapsed ? "justify-center px-0" : "px-2"}`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold tracking-tight">Tryout Studio</span>
              <span className="truncate text-[10px] text-muted-foreground">Admin Console</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin">
        {[
          { label: "Workspace", items: mainItems },
          { label: "Monitoring", items: monitoringItems },
          { label: "System", items: systemItems },
        ].map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url} className="gap-2.5">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div
          className={`flex items-center gap-2 rounded-lg hover:bg-sidebar-accent ${
            collapsed ? "justify-center p-1" : "p-2"
          }`}
        >
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-gradient-primary text-xs text-primary-foreground">
              {user?.name?.[0] ?? "A"}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1 overflow-hidden leading-tight">
                <div className="truncate text-xs font-medium">{user?.name ?? "Admin"}</div>
                <div className="truncate text-[10px] text-muted-foreground">
                  {user?.email ?? "admin@tryout.app"}
                </div>
              </div>
              <button
                onClick={logout}
                aria-label="Sign out"
                className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
