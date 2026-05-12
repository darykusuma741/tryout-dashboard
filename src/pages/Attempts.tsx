import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockAttempts } from "@/mock/data";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const statusColor: Record<string, string> = {
  in_progress: "bg-info/15 text-info border-info/30",
  completed: "bg-success/15 text-success border-success/30",
  submitted: "bg-primary/15 text-primary border-primary/30",
  abandoned: "bg-destructive/15 text-destructive border-destructive/30",
};

function fmtTime(s: number) {
  const m = Math.floor(s / 60),
    sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function Attempts() {
  const inProgress = mockAttempts.filter((a) => a.status === "in_progress").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Attempt monitoring"
        description={`Watch ${inProgress} active attempts in real time.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Active", inProgress, "info"],
          ["Completed", mockAttempts.filter((a) => a.status === "completed").length, "success"],
          ["Submitted", mockAttempts.filter((a) => a.status === "submitted").length, "primary"],
          ["Abandoned", mockAttempts.filter((a) => a.status === "abandoned").length, "destructive"],
        ].map(([label, val, c]) => (
          <Card key={label as string} className="border-border/60 p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{val}</span>
              <span className={`h-2 w-2 rounded-full bg-${c}`} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-border/60">
        <div className="border-b border-border/50 px-4 py-3 text-sm font-medium">
          Live participants
        </div>
        <div className="divide-y divide-border/40">
          {mockAttempts.map((a) => (
            <div key={a.id} className="grid grid-cols-12 items-center gap-3 px-4 py-3">
              <div className="col-span-12 flex items-center gap-3 md:col-span-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted text-xs">{a.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{a.user.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{a.user.email}</div>
                </div>
              </div>
              <div className="col-span-6 truncate text-sm md:col-span-3">
                <div className="truncate">{a.tryout}</div>
                <div className="text-xs text-muted-foreground">Subtest: {a.activeSubtest}</div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{a.progress}%</span>
                </div>
                <Progress value={a.progress} className="h-1.5" />
              </div>
              <div className="col-span-6 flex items-center gap-1.5 text-sm md:col-span-2">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="tabular-nums">{fmtTime(a.remaining)}</span>
              </div>
              <div className="col-span-6 md:col-span-1">
                <Badge
                  variant="outline"
                  className={`${statusColor[a.status]} text-[10px] uppercase`}
                >
                  {a.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default Attempts;
