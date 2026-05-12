import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { mockSubtests } from "@/mock/data";
import { withLoading } from "@/stores/ui-store";
import { SubTest } from "@/types";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Clock, FileText, GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function Row({
  s,
  onToggle,
  onDelete,
}: {
  s: SubTest;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: s.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{s.title}</span>
          {!s.active && (
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
              inactive
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{s.instructions}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {s.duration} min
          </span>
          <span className="inline-flex items-center gap-1">
            <FileText className="h-3 w-3" /> {s.questions} questions
          </span>
        </div>
      </div>
      <Switch checked={s.active} onCheckedChange={() => onToggle(s.id)} />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => onDelete(s.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

function SubTests() {
  const [items, setItems] = useState<SubTest[]>(mockSubtests);
  const onEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      withLoading(() => {
        const oldI = items.findIndex((i) => i.id === active.id);
        const newI = items.findIndex((i) => i.id === over.id);
        setItems(arrayMove(items, oldI, newI));
        toast.success("Order updated");
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Subtests"
        description="Configure duration, instructions, and active state."
        actions={
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="mr-1.5 h-4 w-4" /> Add subtest
          </Button>
        }
      />
      <Card className="border-border/60 p-4">
        <DndContext collisionDetection={closestCenter} onDragEnd={onEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((s) => (
                <Row
                  key={s.id}
                  s={s}
                  onToggle={(id) =>
                    withLoading(() =>
                      setItems((p) =>
                        p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)),
                      ),
                    )
                  }
                  onDelete={(id) =>
                    withLoading(() => {
                      setItems((p) => p.filter((x) => x.id !== id));
                      toast.success("Subtest deleted");
                    })
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>
    </motion.div>
  );
}

export default SubTests;
