// rfce

import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { categoryData, chartData, recentActivity, stats } from "@/mock/data";
import { motion } from "framer-motion";
import { Activity, ArrowUpRight, FileText, HelpCircle, Plus, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-primary-glow)",
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="A bird's-eye view of your tryout platform."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Plus className="mr-1.5 h-4 w-4" /> New tryout
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Tryouts"
          value={stats.totalTryouts}
          delta={12}
          icon={FileText}
          index={0}
        />
        <StatCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          delta={8.4}
          icon={Users}
          index={1}
        />
        <StatCard
          label="Total Questions"
          value={stats.totalQuestions.toLocaleString()}
          delta={-2.1}
          icon={HelpCircle}
          index={2}
        />
        <StatCard
          label="Total Attempts"
          value={stats.totalAttempts.toLocaleString()}
          delta={24}
          icon={Activity}
          index={3}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/60 p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">Attempts overview</h3>
                <p className="text-xs text-muted-foreground">Monthly attempts vs new users</p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
              </Badge>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="attempts"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    fill="url(#g1)"
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                    fill="url(#g2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="h-full border-border/60 p-5">
            <h3 className="text-base font-semibold">By category</h3>
            <p className="text-xs text-muted-foreground">Distribution of tryouts</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5">
              {categoryData.slice(0, 4).map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span>{c.name}</span>
                  </div>
                  <span className="text-muted-foreground">{c.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60 p-5 lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold">Completion rate</h3>
              <p className="text-xs text-muted-foreground">Completed tryouts per month</p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                  cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
                />
                <Bar dataKey="completed" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Recent activity</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View all <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex gap-3">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-muted text-[10px]">{a.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-xs leading-relaxed">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                  <div className="text-[10px] text-muted-foreground">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
