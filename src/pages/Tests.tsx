import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockTests } from "@/mock/data";
import { withLoading } from "@/stores/ui-store";
import { Test } from "@/types";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SortableRow({ test, onDelete }: { test: Test; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: test.id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 rounded-xl border border-border/70 bg-card p-3.5 ${isDragging ? "shadow-elegant" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
        {test.order + 1}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{test.title}</div>
        <div className="text-xs text-muted-foreground">{test.subtestCount} subtests</div>
      </div>
      <Badge variant="secondary">{test.subtestCount} subtests</Badge>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => onDelete(test.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

function Tests() {
  const [items, setItems] = useState<Test[]>(mockTests);
  const onEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      withLoading(() => {
        const oldI = items.findIndex((i) => i.id === active.id);
        const newI = items.findIndex((i) => i.id === over.id);
        setItems(arrayMove(items, oldI, newI).map((it, i) => ({ ...it, order: i })));
        toast.success("Order updated");
      });
    }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Tests"
        description="Drag to reorder tests within a tryout."
        actions={
          <Button size="sm" className="bg-gradient-primary">
            <Plus className="mr-1.5 h-4 w-4" /> Add test
          </Button>
        }
      />
      <Card className="border-border/60 p-4">
        <DndContext collisionDetection={closestCenter} onDragEnd={onEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((t) => (
                <SortableRow
                  key={t.id}
                  test={t}
                  onDelete={(id) =>
                    withLoading(() => {
                      setItems((s) => s.filter((x) => x.id !== id));
                      toast.success("Test deleted");
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

export default Tests;
