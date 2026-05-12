import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import { FileText, LayoutDashboard } from "lucide-react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Tryouts", url: "/tryouts", icon: FileText },
  // { title: "Tests", url: "/tests", icon: ListChecks },
  // { title: "Subtests", url: "/subtests", icon: Layers },
  // { title: "Questions", url: "/questions", icon: HelpCircle },
  // { title: "Attempts", url: "/attempts", icon: Activity },
  // { title: "Analytics", url: "/analytics", icon: BarChart3 },
  // { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const navigate = useNavigate();
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {items.map((i) => (
            <CommandItem
              key={i.url}
              onSelect={() => {
                navigate({ to: i.url });
                onOpenChange(false);
              }}
            >
              <i.icon className="mr-2 h-4 w-4" /> {i.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
