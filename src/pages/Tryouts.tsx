import { DataTable } from "@/components/dashboard/data-table";
import { ImageUploader } from "@/components/dashboard/image-uploader";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { mockTryouts } from "@/mock/data";
import { withLoading } from "@/stores/ui-store";
import { Tryout } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Eye, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Tryouts() {
  const [data, setData] = useState<Tryout[]>(mockTryouts);
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>("all");

  const togglePublish = (id: string) =>
    withLoading(() => {
      setData((d) => d.map((t) => (t.id === id ? { ...t, published: !t.published } : t)));
      toast.success("Status updated");
    });

  const remove = (id: string) =>
    withLoading(() => {
      setData((d) => d.filter((t) => t.id !== id));
      toast.success("Tryout deleted");
    });

  const filtered =
    filter === "all"
      ? data
      : data.filter((t) => (filter === "published" ? t.published : !t.published));

  const columns: ColumnDef<Tryout>[] = [
    {
      accessorKey: "title",
      header: "Tryout",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.banner} alt="" className="h-10 w-14 rounded-md object-cover" />
          <div>
            <div className="font-medium">{row.original.title}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">
              {row.original.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="secondary">{row.original.category}</Badge>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => <span className="text-sm">{row.original.duration}m</span>,
    },
    {
      accessorKey: "participants",
      header: "Participants",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">{row.original.participants.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.original.published}
            onCheckedChange={() => togglePublish(row.original.id)}
          />
          <span className="text-xs text-muted-foreground">
            {row.original.published ? "Published" : "Draft"}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5" /> View
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => remove(row.original.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Tryouts"
        description="Manage every tryout, banner, and publish state."
        actions={
          <>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-primary">
                  <Plus className="mr-1.5 h-4 w-4" /> New tryout
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create tryout</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <ImageUploader value={banner} onChange={setBanner} label="Upload banner" />
                  <div className="space-y-1.5">
                    <Label>Title</Label>
                    <Input placeholder="UTBK SNBT 2026" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea rows={3} placeholder="Describe this tryout…" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent>
                          {["UTBK", "TOEFL", "SAT", "GRE"].map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Duration (min)</Label>
                      <Input type="number" defaultValue={120} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-primary"
                    onClick={() =>
                      withLoading(() => {
                        setOpen(false);
                        toast.success("Tryout created");
                      })
                    }
                  >
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />
      <DataTable columns={columns} data={filtered} searchKey="tryouts" />
    </motion.div>
  );
}

export default Tryouts;
