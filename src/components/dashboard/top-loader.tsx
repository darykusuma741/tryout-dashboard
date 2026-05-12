import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";

export function TopLoader() {
  const loading = useUIStore((s) => s.loading);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}