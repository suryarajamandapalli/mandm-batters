import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminAuthState = {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      login: (password) => {
        if (password === "Admin@MandM") {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdmin: false }),
    }),
    { name: "rhb-admin-auth" },
  ),
);
