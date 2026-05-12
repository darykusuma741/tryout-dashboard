import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, useRouteContext } from "@tanstack/react-router";
import { Toaster } from "../ui/sonner";

function RootComponent() {
  const { queryClient } = useRouteContext({
    from: "__root__",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default RootComponent;
