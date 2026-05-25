import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useExpensesStore, Expense } from "@/store/expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import {
  IndianRupee,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  Filter,
  Tag,
  Loader2,
  Wallet,
  Receipt,
  FileText
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";
import { useAdminFilter } from "@/store/adminFilter";

export const Route = createFileRoute("/admin/expenses")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: ExpensesPage,
});

const EXPENSE_CATEGORIES = [
  "Ingredients & Raw Materials",
  "Logistics & Fuel",
  "Utilities & Rent",
  "Staff Salary & Labor",
  "Marketing & Promotion",
  "Equipment & Maintenance",
  "Other Expenses"
];

function ExpensesPage() {
  const { expenses, loading, addExpense, deleteExpense } = useExpensesStore();
  const { selectedDate } = useAdminFilter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [filterByDate, setFilterByDate] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Form local state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: EXPENSE_CATEGORIES[0],
    date: selectedDate, // Default to global filter date
    description: ""
  });

  const filteredExpenses = useMemo(() => {
    let result = Array.isArray(expenses) ? expenses : [];

    // Filter by category
    if (selectedCategoryFilter !== "all") {
      result = result.filter(e => e.category === selectedCategoryFilter);
    }

    // Filter by date
    if (filterByDate) {
      result = result.filter(e => {
        if (!e.date) return false;
        return e.date.split("T")[0] === selectedDate;
      });
    }

    return result;
  }, [expenses, selectedDate, filterByDate, selectedCategoryFilter]);

  const stats = useMemo(() => {
    const total = filteredExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);
    
    // Group totals by category
    const categoryTotals = EXPENSE_CATEGORIES.reduce((acc, cat) => {
      acc[cat] = filteredExpenses
        .filter(e => e.category === cat)
        .reduce((sum, e) => sum + (e.amount || 0), 0);
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      categoryTotals
    };
  }, [filteredExpenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Convert date string input into ISO string representation
    const expenseDate = new Date(formData.date);
    // Add current time components to make it a realistic timestamp
    const now = new Date();
    expenseDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    addExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: expenseDate.toISOString(),
      description: formData.description
    });

    // Reset form
    setFormData({
      title: "",
      amount: "",
      category: EXPENSE_CATEGORIES[0],
      date: selectedDate,
      description: ""
    });
    setIsOpen(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = parseISO(dateStr);
      return format(d, "dd MMM yyyy, hh:mm a");
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-orange" />
          <p className="text-muted-foreground animate-pulse">Syncing expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy">Expenses Manager</h1>
            <p className="text-muted-foreground mt-1">Track business expenses and log custom expenditures.</p>
          </div>
          
          <button
            onClick={() => {
              setFormData(prev => ({ ...prev, date: selectedDate }));
              setIsOpen(true);
            }}
            className="bg-orange text-navy px-6 py-3 rounded-full font-black text-sm hover:bg-orange/80 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange/20"
          >
            <Plus className="size-4" /> Add Expense
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Summary Card */}
          <Card className="bg-red-50/50 border border-red-100 flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-red-700 uppercase tracking-widest flex items-center gap-2">
                <Receipt className="size-4" /> Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-red-900">₹{stats.total}</div>
              <p className="text-xs text-red-700/60 mt-1 font-medium">
                {filterByDate ? `Aggregated for ${selectedDate}` : "Aggregated for All Time"}
              </p>
            </CardContent>
          </Card>

          {/* Filtering Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3 border-b border-border bg-secondary/10">
              <CardTitle className="text-sm font-bold text-navy flex items-center gap-2">
                <Filter className="size-4 text-orange" /> Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cat-filter" className="text-xs font-bold uppercase text-muted-foreground">Category</Label>
                <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                  <SelectTrigger id="cat-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {EXPENSE_CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end pt-2 sm:pt-0">
                <label className="flex items-center gap-2.5 cursor-pointer py-2 px-1">
                  <input
                    type="checkbox"
                    checked={filterByDate}
                    onChange={(e) => setFilterByDate(e.target.checked)}
                    className="size-4 rounded border-gray-300 text-orange focus:ring-orange accent-orange"
                  />
                  <div className="text-sm font-bold text-navy select-none">
                    Filter by Selected Date ({selectedDate})
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses List */}
        <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-4">Logged Expenditures</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Expense Details</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-r-lg text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-bold text-navy">{expense.title}</div>
                      {expense.description && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <FileText className="size-3" /> {expense.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-navy bg-orange/10 px-2 py-0.5 rounded-full uppercase">
                        <Tag className="size-2.5" /> {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs font-semibold text-muted-foreground">
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-4 py-4 font-black text-red-600 text-base">
                      ₹{expense.amount}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this expense?")) {
                            deleteExpense(expense.id);
                          }
                        }}
                        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Expense"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground italic">
                      No expenses logged for this filter combination.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Expense Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-display font-bold text-navy flex items-center gap-2">
                <Receipt className="size-5 text-orange" /> Log New Expenditure
              </DialogTitle>
              <DialogDescription>
                Add custom expenditures to keep your financial reports and margins accurate.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title / Name *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Rice & Dhal supplies, Store Rent, Fuel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData({ ...formData, category: val })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Description (Optional)</Label>
                <Input
                  id="desc"
                  placeholder="Notes, receipt numbers, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border font-bold text-navy hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-navy text-white px-4 py-2.5 rounded-xl font-bold hover:bg-orange transition-colors flex items-center justify-center gap-2"
                >
                  Log Expense
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  );
}
