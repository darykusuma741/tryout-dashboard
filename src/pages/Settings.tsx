import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { withLoading } from "@/stores/ui-store";
import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

function Settings() {
  const { theme, setTheme } = useTheme();
  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your workspace, theme, and timer defaults."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 p-5 lg:col-span-2">
          <h3 className="text-base font-semibold">General</h3>
          <p className="text-xs text-muted-foreground">Workspace identity & contact info.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Workspace name</Label>
              <Input defaultValue="Tryout Studio" />
            </div>
            <div className="space-y-1.5">
              <Label>Support email</Label>
              <Input defaultValue="support@tryout.app" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Tagline</Label>
              <Input defaultValue="Premium tryouts for ambitious learners" />
            </div>
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <h3 className="text-base font-semibold">Theme</h3>
          <p className="text-xs text-muted-foreground">Choose how Tryout Studio looks.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs transition ${theme === t.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 p-5 lg:col-span-2">
          <h3 className="text-base font-semibold">Timer defaults</h3>
          <p className="text-xs text-muted-foreground">Applied to new subtests.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Default duration (min)</Label>
              <Input type="number" defaultValue={30} />
            </div>
            <div className="space-y-1.5">
              <Label>Warning at (min left)</Label>
              <Input type="number" defaultValue={5} />
            </div>
            <div className="space-y-1.5">
              <Label>Auto-submit grace (sec)</Label>
              <Input type="number" defaultValue={10} />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {[
              ["Allow review before submit", true],
              ["Show remaining time", true],
              ["Lock answers after submit", false],
              ["Randomize question order", true],
            ].map(([label, v]) => (
              <div key={label as string} className="flex items-center justify-between">
                <Label className="font-normal">{label}</Label>
                <Switch defaultChecked={v as boolean} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <h3 className="text-base font-semibold">Danger zone</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Reset workspace data. This cannot be undone.
          </p>
          <Button variant="destructive" className="mt-4 w-full">
            Reset workspace
          </Button>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-gradient-primary"
          onClick={() => withLoading(() => toast.success("Settings saved"))}
        >
          Save changes
        </Button>
      </div>
    </motion.div>
  );
}

export default Settings;
