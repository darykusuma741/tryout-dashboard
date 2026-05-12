import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/app-sidebar";
import { TopBar } from "@/layouts/topbar";
import { useAuthStore } from "@/stores/auth-store";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TopLoader } from "./top-loader";

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setReady(true);
    if (!user && typeof window !== "undefined") {
      // auto-login a demo user so the dashboard is browsable on first load
      useAuthStore.getState().login({ name: "Admin User", email: "admin@tryout.app" });
    }
  }, [user]);

  // Auto-collapse sidebar on tablet-sized screens for a more responsive layout.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const sync = () => setOpen(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  if (!ready) return null;

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="flex min-h-screen w-full bg-gradient-subtle">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopLoader />
          <TopBar />
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
