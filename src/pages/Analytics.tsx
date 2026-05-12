import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { chartData, rankings } from "@/mock/data";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Analytics() {
  const avg = Math.round(rankings.reduce((s, r) => s + r.score, 0) / rankings.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Insights, leaderboards, and average performance."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Average Score
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{avg}</div>
          <div className="mt-1 text-xs text-success">+4.2% vs last cycle</div>
        </Card>
        <Card className="border-border/60 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Highest Score
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{rankings[0].score}</div>
          <div className="mt-1 text-xs text-muted-foreground">{rankings[0].name}</div>
        </Card>
        <Card className="border-border/60 p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Pass Rate</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">78%</div>
          <div className="mt-1 text-xs text-success">+2.1%</div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 p-5 lg:col-span-2">
          <h3 className="text-base font-semibold">Score trend</h3>
          <p className="text-xs text-muted-foreground">Average score per month</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-warning" />
            <h3 className="text-base font-semibold">Top rankings</h3>
          </div>
          <div className="space-y-2">
            {rankings.map((r) => (
              <div
                key={r.rank}
                className="flex items-center gap-3 rounded-lg border border-border/50 p-2.5"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${r.rank === 1 ? "bg-warning/20 text-warning" : r.rank <= 3 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  {r.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.tryouts} tryouts</div>
                </div>
                <Badge variant="secondary" className="tabular-nums">
                  {r.score}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="border-border/60 p-5">
        <h3 className="text-base font-semibold">Tryout participation</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
              />
              <Bar dataKey="attempts" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="users" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}

export default Analytics;
