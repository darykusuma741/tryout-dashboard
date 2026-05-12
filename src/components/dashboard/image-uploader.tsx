import { useCallback, useRef, useState } from "react";
import { UploadCloud, X, ImagePlus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ACCEPT = ["image/png", "image/jpeg", "image/webp"];

export function ImageUploader({
  value, onChange, label = "Upload image",
}: {
  value?: string; onChange: (url: string | undefined) => void; label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handle = useCallback((file: File) => {
    if (!ACCEPT.includes(file.type)) {
      toast.error("Only PNG, JPG, or WebP allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB.");
      return;
    }
    setLoading(true);
    setProgress(0);
    const url = URL.createObjectURL(file);
    let p = 0;
    const id = setInterval(() => {
      p += 12 + Math.random() * 18;
      if (p >= 100) {
        clearInterval(id);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          onChange(url);
          toast.success("Image uploaded");
        }, 200);
      } else setProgress(p);
    }, 120);
  }, [onChange]);

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])}
      />
      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="group relative overflow-hidden rounded-xl border border-border bg-muted/30"
          >
            <img src={value} alt="preview" className="h-44 w-full object-cover" />
            <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
                <ImagePlus className="mr-1.5 h-3.5 w-3.5" /> Replace
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onChange(undefined)}>
                <X className="mr-1.5 h-3.5 w-3.5" /> Remove
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="drop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault(); setDrag(false);
              const f = e.dataTransfer.files?.[0]; if (f) handle(f);
            }}
            onClick={() => inputRef.current?.click()}
            className={`flex h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 p-6 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40"}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading… {Math.floor(progress)}%</p>
                <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-primary transition-all" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">Drag & drop or click — PNG, JPG, WebP up to 5MB</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
