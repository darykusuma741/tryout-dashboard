import { ImageUploader } from "@/components/dashboard/image-uploader";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { mockQuestions } from "@/mock/data";
import { withLoading } from "@/stores/ui-store";
import type { Question } from "@/types";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Check,
  FileText,
  Filter,
  GripVertical,
  ImageIcon,
  ImagePlus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sigma,
  Trash2,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

function Questions() {
  const [items, setItems] = useState<Question[]>(mockQuestions);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [diff, setDiff] = useState<string>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const PAGE = view === "grid" ? 9 : 8;

  const filtered = items.filter((i) => {
    if (q && !i.prompt.toLowerCase().includes(q.toLowerCase())) return false;
    if (type !== "all" && i.type !== type) return false;
    if (diff !== "all" && i.difficulty !== diff) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE);

  const toggle = (id: string) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };
  const bulkDelete = () =>
    withLoading(() => {
      setItems((p) => p.filter((q) => !selected.has(q.id)));
      setSelected(new Set());
      toast.success("Questions deleted");
    });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Questions"
        description="Author rich, math-aware questions with images, options, and answer keys."
        actions={
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="sm" className="bg-gradient-primary">
                <Plus className="mr-1.5 h-4 w-4" /> New question
              </Button>
            </SheetTrigger>
            <QuestionEditor onClose={() => setOpen(false)} />
          </Sheet>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-50 max-w-md">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search questions…"
            className="h-9 pl-8"
          />
        </div>
        <Select
          value={type}
          onValueChange={(v) => {
            setType(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-9 w-32">
            <Filter className="mr-1 h-3 w-3" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="mixed">Text + Image</SelectItem>
            <SelectItem value="math">Math</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={diff}
          onValueChange={(v) => {
            setDiff(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-9 w-32">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")} className="ml-auto">
          <TabsList className="h-9">
            <TabsTrigger value="grid" className="px-3">
              <LayoutGrid className="h-3.5 w-3.5" />
            </TabsTrigger>
            <TabsTrigger value="list" className="px-3">
              <List className="h-3.5 w-3.5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5"
          >
            <span className="text-sm">{selected.size} selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setSelected(new Set())}>
                Clear
              </Button>
              <Button size="sm" variant="destructive" onClick={bulkDelete}>
                Delete selected
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((q) => (
            <QuestionCard
              key={q.id}
              q={q}
              selected={selected.has(q.id)}
              onToggle={() => toggle(q.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="divide-y divide-border/50 border-border/60">
          {paged.map((q) => (
            <div key={q.id} className="flex items-center gap-3 p-3">
              <Checkbox checked={selected.has(q.id)} onCheckedChange={() => toggle(q.id)} />
              <TypeIcon type={q.type} />
              <div className="flex-1 truncate text-sm">{q.prompt}</div>
              <Badge variant="outline" className="text-[10px] uppercase">
                {q.difficulty}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </Card>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{filtered.length} questions</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <span className="text-xs">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function TypeIcon({ type }: { type: Question["type"] }) {
  const map = { text: FileText, image: ImageIcon, mixed: ImageIcon, math: Sigma };
  const Icon = map[type];
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
      <Icon className="h-3.5 w-3.5" />
    </div>
  );
}

function QuestionCard({
  q,
  selected,
  onToggle,
}: {
  q: Question;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
      <Card
        className={`group relative flex h-full flex-col gap-3 overflow-hidden border-border/60 p-4 transition hover:border-primary/40 hover:shadow-elegant ${selected ? "ring-2 ring-primary" : ""}`}
      >
        <div className="flex items-start gap-2">
          <Checkbox checked={selected} onCheckedChange={onToggle} className="mt-0.5" />
          <TypeIcon type={q.type} />
          <Badge variant="outline" className="ml-auto text-[10px] uppercase">
            {q.difficulty}
          </Badge>
        </div>
        {q.image && <img src={q.image} alt="" className="h-32 w-full rounded-md object-cover" />}
        <p className="line-clamp-3 text-sm">{q.prompt}</p>
        <div className="space-y-1 text-xs">
          {q.options.slice(0, 2).map((o) => (
            <div
              key={o.id}
              className={`flex items-center gap-1.5 truncate rounded-md px-2 py-1 ${o.id === q.correctOptionId ? "bg-success/10 text-success" : "text-muted-foreground"}`}
            >
              {o.id === q.correctOptionId && <Check className="h-3 w-3" />}
              <span className="truncate">{o.text}</span>
            </div>
          ))}
          <span className="text-[10px] text-muted-foreground">
            + {q.options.length - 2} more options
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

function SortableOption({
  id,
  index,
  text,
  image,
  points,
  isCorrect,
  multi,
  onText,
  onImage,
  onPoints,
  onCorrect,
  onRemove,
}: {
  id: string;
  index: number;
  text: string;
  image?: string;
  points: number;
  isCorrect: boolean;
  multi: boolean;
  onText: (v: string) => void;
  onImage: (v: string | undefined) => void;
  onPoints: (v: number) => void;
  onCorrect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = (f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    onImage(URL.createObjectURL(f));
  };
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-lg border bg-card p-2 ${isCorrect ? "border-success/60 bg-success/5" : "border-border/70"}`}
    >
      <div className="flex items-center gap-2">
        <button {...attributes} {...listeners} className="cursor-grab text-muted-foreground">
          <GripVertical className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onCorrect}
          aria-label={isCorrect ? "Correct answer" : "Mark as correct"}
          className={`flex h-6 w-6 items-center justify-center border text-[10px] font-medium transition ${multi ? "rounded-md" : "rounded-full"} ${isCorrect ? "border-success bg-success text-success-foreground" : "border-border hover:border-success/60"}`}
        >
          {isCorrect ? <Check className="h-3 w-3" /> : String.fromCharCode(65 + index)}
        </button>
        <Input
          value={text}
          onChange={(e) => onText(e.target.value)}
          className="h-8 flex-1"
          placeholder={`Option ${String.fromCharCode(65 + index)}`}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => fileRef.current?.click()}
          title={image ? "Replace image" : "Add image"}
        >
          <ImagePlus className={`h-3.5 w-3.5 ${image ? "text-primary" : ""}`} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isCorrect && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-8 flex items-center gap-2 rounded-md border border-success/30 bg-success/5 px-2 py-1.5">
              <Award className="h-3.5 w-3.5 text-success" />
              <Label htmlFor={`pts-${id}`} className="text-xs text-success">
                Points
              </Label>
              <Input
                id={`pts-${id}`}
                type="number"
                min={0}
                step={1}
                value={points}
                onChange={(e) => onPoints(Number(e.target.value) || 0)}
                className="h-7 w-20"
              />
              <span className="text-[11px] text-muted-foreground">awarded if selected</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {image && (
        <div className="relative mt-2 ml-8 w-fit">
          <img src={image} alt="" className="h-20 rounded-md border border-border object-cover" />
          <button
            onClick={() => onImage(undefined)}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
            aria-label="Remove image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function QuestionEditor({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState<Question["type"]>("text");
  const [image, setImage] = useState<string | undefined>();
  const [opts, setOpts] = useState<{ id: string; text: string; image?: string }[]>([
    { id: "o1", text: "" },
    { id: "o2", text: "" },
    { id: "o3", text: "" },
    { id: "o4", text: "" },
  ]);
  const [pointsMap, setPointsMap] = useState<Record<string, number>>({
    o1: 10,
    o2: 10,
    o3: 10,
    o4: 10,
  });
  const [multi, setMulti] = useState(false);
  const [correct, setCorrect] = useState<Set<string>>(new Set(["o1"]));

  const toggleCorrect = (id: string) => {
    setCorrect((prev) => {
      const next = new Set(multi ? prev : []);
      if (multi) {
        next.has(id) ? next.delete(id) : next.add(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const add = () => {
    const id = `o${Date.now()}`;
    setOpts((p) => [...p, { id, text: "" }]);
    setPointsMap((p) => ({ ...p, [id]: 10 }));
  };
  const onEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setOpts((p) =>
        arrayMove(
          p,
          p.findIndex((x) => x.id === active.id),
          p.findIndex((x) => x.id === over.id),
        ),
      );
    }
  };

  return (
    <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
      <SheetHeader>
        <SheetTitle>New question</SheetTitle>
      </SheetHeader>
      <div className="space-y-5 py-4">
        <div className="space-y-1.5">
          <Label>Type</Label>
          <Tabs value={type} onValueChange={(v) => setType(v as Question["type"])}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="text">
                <FileText className="mr-1 h-3 w-3" /> Text
              </TabsTrigger>
              <TabsTrigger value="image">
                <ImageIcon className="mr-1 h-3 w-3" /> Image
              </TabsTrigger>
              <TabsTrigger value="mixed">Mixed</TabsTrigger>
              <TabsTrigger value="math">
                <Sigma className="mr-1 h-3 w-3" /> Math
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-1.5">
          <Label>Question prompt</Label>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="flex items-center gap-1 border-b border-border bg-muted/40 p-1.5 text-xs">
              <button className="rounded px-2 py-1 font-bold hover:bg-background">B</button>
              <button className="rounded px-2 py-1 italic hover:bg-background">I</button>
              <button className="rounded px-2 py-1 underline hover:bg-background">U</button>
              <span className="mx-1 h-4 w-px bg-border" />
              <button className="rounded px-2 py-1 hover:bg-background">
                <Sigma className="h-3 w-3" />
              </button>
              <button className="rounded px-2 py-1 hover:bg-background">
                <ImageIcon className="h-3 w-3" />
              </button>
              <span className="ml-auto text-[10px] text-muted-foreground">
                Supports LaTeX: $x^2 + y^2$
              </span>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="rounded-none border-0 focus-visible:ring-0"
              placeholder="Type your question… Use $\\frac{a}{b}$ for math."
            />
          </div>
        </div>

        {(type === "image" || type === "mixed") && (
          <div className="space-y-1.5">
            <Label>Question image</Label>
            <ImageUploader value={image} onChange={setImage} />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Answer options</Label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Switch
                  checked={multi}
                  onCheckedChange={(v) => {
                    setMulti(v);
                    if (!v)
                      setCorrect((prev) => {
                        const first = Array.from(prev)[0];
                        return new Set(first ? [first] : []);
                      });
                  }}
                />
                Allow multiple correct
              </label>
              <Button variant="outline" size="sm" onClick={add}>
                <Plus className="mr-1 h-3 w-3" /> Add option
              </Button>
            </div>
          </div>
          <DndContext collisionDetection={closestCenter} onDragEnd={onEnd}>
            <SortableContext items={opts.map((o) => o.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {opts.map((o, i) => (
                  <SortableOption
                    key={o.id}
                    id={o.id}
                    index={i}
                    text={o.text}
                    image={o.image}
                    points={pointsMap[o.id] ?? 10}
                    isCorrect={correct.has(o.id)}
                    multi={multi}
                    onText={(v) =>
                      setOpts((p) => p.map((x) => (x.id === o.id ? { ...x, text: v } : x)))
                    }
                    onImage={(img) =>
                      setOpts((p) => p.map((x) => (x.id === o.id ? { ...x, image: img } : x)))
                    }
                    onPoints={(v) => setPointsMap((p) => ({ ...p, [o.id]: v }))}
                    onCorrect={() => toggleCorrect(o.id)}
                    onRemove={() => {
                      setOpts((p) => p.filter((x) => x.id !== o.id));
                      setCorrect((prev) => {
                        const n = new Set(prev);
                        n.delete(o.id);
                        return n;
                      });
                      setPointsMap((prev) => {
                        const n = { ...prev };
                        delete n[o.id];
                        return n;
                      });
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <p className="text-[11px] text-muted-foreground">
            Tip: click the letter to mark {multi ? "one or more" : "the"} correct answer
            {multi ? "s" : ""}. Use the image button to attach a picture to an option.
          </p>
        </div>
      </div>
      <SheetFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-gradient-primary"
          onClick={() =>
            withLoading(() => {
              onClose();
              toast.success("Question saved");
            })
          }
        >
          Save question
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
export default Questions;
