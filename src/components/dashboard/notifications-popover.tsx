import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Bell, CheckCheck, FileText, Trophy, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type NotifKind = "attempt" | "user" | "alert" | "achievement";
type Notif = {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const seed: Notif[] = [
  {
    id: "n1",
    kind: "attempt",
    title: "New submission",
    body: "Aisha Putri submitted UTBK SNBT 2026 Vol. 1",
    time: "2m ago",
    read: false,
  },
  {
    id: "n2",
    kind: "user",
    title: "New user joined",
    body: "Budi Santoso created an account",
    time: "12m ago",
    read: false,
  },
  {
    id: "n3",
    kind: "achievement",
    title: "Top score!",
    body: "Citra Lestari scored 980 on TOEFL Simulation",
    time: "1h ago",
    read: false,
  },
  {
    id: "n4",
    kind: "alert",
    title: "Subtest review needed",
    body: "3 questions flagged in Quantitative Reasoning",
    time: "3h ago",
    read: true,
  },
  {
    id: "n5",
    kind: "attempt",
    title: "Attempt completed",
    body: "Eka Wijaya finished GRE Verbal Reasoning",
    time: "Yesterday",
    read: true,
  },
];

const iconMap: Record<NotifKind, { icon: typeof Bell; tone: string }> = {
  attempt: { icon: FileText, tone: "text-primary bg-primary/10" },
  user: { icon: UserPlus, tone: "text-success bg-success/10" },
  alert: { icon: AlertTriangle, tone: "text-destructive bg-destructive/10" },
  achievement: { icon: Trophy, tone: "text-warning bg-warning/10" },
};

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>(seed);
  const unread = items.filter((n) => !n.read).length;

  const markAll = () => {
    setItems((xs) => xs.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markOne = (id: string) =>
    setItems((xs) => xs.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] text-destructive-foreground">
              {unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(92vw,22rem)] p-0 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold">Notifications</div>
            <div className="text-xs text-muted-foreground">
              {unread > 0 ? `${unread} unread` : "You're all caught up"}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-xs"
            onClick={markAll}
            disabled={unread === 0}
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all
          </Button>
        </div>
        <Separator />
        <ScrollArea className="max-h-[60vh]">
          <ul className="divide-y divide-border/60">
            <AnimatePresence initial={false}>
              {items.map((n) => {
                const { icon: Icon, tone } = iconMap[n.kind];
                return (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.18 }}
                  >
                    <button
                      onClick={() => markOne(n.id)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-muted/50",
                        !n.read && "bg-primary/[0.03]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                          tone,
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium">{n.title}</span>
                          {!n.read && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
                          {n.body}
                        </span>
                        <span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          {n.time}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
