import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

export function StatCard({
  label, value, delta, icon: Icon, index = 0,
}: {
  label: string; value: string | number; delta: number; icon: LucideIcon; index?: number;
}) {
  const positive = delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="relative overflow-hidden border-border/60 p-5 transition hover:border-primary/40 hover:shadow-elegant">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      </Card>
    </motion.div>
  );
}
