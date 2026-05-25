import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";

interface AdminFilterState {
  selectedDate: string; // format: "yyyy-MM-dd"
  setSelectedDate: (date: string) => void;
  resetDate: () => void;
}

export const useAdminFilter = create<AdminFilterState>()(
  persist(
    (set) => ({
      selectedDate: format(new Date(), "yyyy-MM-dd"),
      setSelectedDate: (date) => set({ selectedDate: date }),
      resetDate: () => set({ selectedDate: format(new Date(), "yyyy-MM-dd") }),
    }),
    {
      name: "rhb-admin-filter",
    }
  )
);
