import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { name: string; email: string; avatar?: string };
type AuthState = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "tryout-auth" }
  )
);
