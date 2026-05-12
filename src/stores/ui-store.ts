import { create } from "zustand";

type UIState = {
  loading: boolean;
  setLoading: (v: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

/**
 * Show a top progress bar for `delay` ms, then run `fn`.
 * Use to simulate save/update latency on mock-data mutations.
 */
export async function withLoading<T>(fn: () => T | Promise<T>, delay = 600): Promise<T> {
  const { setLoading } = useUIStore.getState();
  setLoading(true);
  try {
    await new Promise((r) => setTimeout(r, delay));
    return await fn();
  } finally {
    setLoading(false);
  }
}