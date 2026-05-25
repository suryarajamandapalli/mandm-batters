import { create } from "zustand";
import {
  ref,
  onValue,
  set as fbSet,
  remove as fbRemove,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { toast } from "sonner";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // ISO String (e.g. 2026-05-23T08:00:00.000Z)
  description?: string;
};

type ExpensesState = {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  _setExpenses: (expenses: Expense[]) => void;
};

export const useExpensesStore = create<ExpensesState>()((set) => ({
  expenses: [],
  loading: true,

  _setExpenses: (expenses) => set({ expenses, loading: false }),

  addExpense: (expenseData) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newExpense: Expense = {
      ...expenseData,
      id,
    };
    
    // Save to Firebase
    fbSet(ref(rtdb, `expenses/${id}`), newExpense)
      .then(() => toast.success("Expense added successfully!"))
      .catch((err) => {
        console.error("Firebase write error:", err);
        toast.error("Failed to sync expense to database.");
      });
  },

  deleteExpense: (id) => {
    fbRemove(ref(rtdb, `expenses/${id}`))
      .then(() => toast.success("Expense deleted successfully!"))
      .catch((err) => {
        console.error("Firebase remove error:", err);
        toast.error("Failed to delete expense.");
      });
  },
}));

// Real-time listener
const expensesRef = ref(rtdb, "expenses");
onValue(expensesRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const expensesList: Expense[] = Object.values(data);
    // Sort newest first
    expensesList.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    useExpensesStore.getState()._setExpenses(expensesList);
  } else {
    useExpensesStore.getState()._setExpenses([]);
  }
});
