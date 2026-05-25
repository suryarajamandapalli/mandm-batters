import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useOrders, Order } from "@/store/orders";
import { useSiteSettings } from "@/store/siteSettings";
import { useProductsStore } from "@/store/products";
import { useExpensesStore } from "@/store/expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  IndianRupee, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Filter,
  CheckCircle,
  Clock,
  Wallet,
  CreditCard,
  Download,
  Settings,
  Receipt,
  TrendingDown,
  ArrowDownRight,
  ArrowUpRight,
  Percent
} from "lucide-react";
import { 
  format, 
  isSameDay, 
  isSameWeek, 
  isSameMonth, 
  isSameYear, 
  startOfDay,
  parseISO 
} from "date-fns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: DashboardPage,
});

type ReportPeriod = "daily" | "weekly" | "monthly" | "yearly";

import { useAdminFilter } from "@/store/adminFilter";

function DashboardPage() {
  const orders = useOrders((s) => s.orders);
  const products = useProductsStore((s) => s.products);
  const expenses = useExpensesStore((s) => s.expenses);
  const { selectedDate } = useAdminFilter();
  const [period, setPeriod] = useState<ReportPeriod>("daily");

  const filteredOrders = useMemo(() => {
    const baseDate = parseISO(selectedDate);
    const selectedDateStr = selectedDate; // "yyyy-MM-dd"
    const safeOrders = Array.isArray(orders) ? orders : [];
    
    return safeOrders.filter((o) => {
      if (!o.date) return false;
      const orderDate = parseISO(o.date);
      
      // Strict Daily Filter: compare the date part of the ISO string
      if (period === "daily") {
        const oDateStr = o.date.split("T")[0];
        return oDateStr === selectedDateStr;
      }
      
      if (period === "weekly") return isSameWeek(orderDate, baseDate);
      if (period === "monthly") return isSameMonth(orderDate, baseDate);
      if (period === "yearly") return isSameYear(orderDate, baseDate);
      return false;
    });
  }, [orders, selectedDate, period]);

  const filteredExpenses = useMemo(() => {
    const baseDate = parseISO(selectedDate);
    const selectedDateStr = selectedDate; // "yyyy-MM-dd"
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    
    return safeExpenses.filter((e) => {
      if (!e.date) return false;
      const expenseDate = parseISO(e.date);
      
      // Strict Daily Filter: compare the date part of the ISO string
      if (period === "daily") {
        const eDateStr = e.date.split("T")[0];
        return eDateStr === selectedDateStr;
      }
      
      if (period === "weekly") return isSameWeek(expenseDate, baseDate);
      if (period === "monthly") return isSameMonth(expenseDate, baseDate);
      if (period === "yearly") return isSameYear(expenseDate, baseDate);
      return false;
    });
  }, [expenses, selectedDate, period]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  }, [filteredExpenses]);

  const stats = useMemo(() => {
    const totalCollection = filteredOrders.reduce((acc, o) => acc + o.totalAmount, 0);
    const cashCollection = filteredOrders
      .filter((o) => o.paymentMethod === "Cash")
      .reduce((acc, o) => acc + o.totalAmount, 0);
    const upiCollection = filteredOrders
      .filter((o) => o.paymentMethod === "UPI")
      .reduce((acc, o) => acc + o.totalAmount, 0);
    
    const deliveredCount = filteredOrders.filter((o) => o.status === "delivered").length;
    const pendingCount = filteredOrders.filter((o) => o.status !== "delivered").length;

    // Most repeated products
    const productCounts: Record<string, { name: string; count: number }> = {};
    filteredOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = { name: item.name, count: 0 };
        }
        productCounts[item.productId].count += (item.kg || 0) + (item.halfKg || 0);
      });
    });

    const mostRepeated = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalCollection,
      cashCollection,
      upiCollection,
      deliveredCount,
      pendingCount,
      totalOrders: filteredOrders.length,
      mostRepeated
    };
  }, [filteredOrders]);

  const generatePDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const periodLabel = period.charAt(0).toUpperCase() + period.slice(1);
    const dateLabel = format(parseISO(selectedDate), "dd MMM yyyy");

    // Header
    doc.setFillColor(15, 23, 42); // Slate Navy
    doc.rect(0, 0, pageW, 36, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("M and M Batters", 14, 16);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`${periodLabel} Report  ·  ${dateLabel}  ·  Generated: ${format(new Date(), "dd MMM yyyy, hh:mm a")}`, 14, 28);

    let y = 46;

    // Summary section
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 14, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["Metric", "Value"]],
      body: [
        ["Total Revenue (Gross)", `Rs. ${stats.totalCollection}`],
        ["Total Expenses", `Rs. ${totalExpenses}`],
        ["Net Profit", `Rs. ${stats.totalCollection - totalExpenses}`],
        ["Total Orders", String(stats.totalOrders)],
        ["Delivered Orders", String(stats.deliveredCount)],
        ["Pending Orders", String(stats.pendingCount)],
        ["Cash Collection", `Rs. ${stats.cashCollection}`],
        ["UPI Collection", `Rs. ${stats.upiCollection}`],
      ],
      headStyles: { fillColor: [229, 149, 36], textColor: [15, 23, 42], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      styles: { fontSize: 10 },
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Top Products
    if (stats.mostRepeated.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Top Products", 14, y);
      y += 6;

      autoTable(doc, {
        startY: y,
        head: [["#", "Product", "Units Ordered"]],
        body: stats.mostRepeated.map((p, i) => [String(i + 1), p.name, String(p.count)]),
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [248, 249, 252] },
        styles: { fontSize: 10 },
      });

      y = (doc as any).lastAutoTable.finalY + 10;
    }

    // Orders table
    if (filteredOrders.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Orders", 14, y);
      y += 6;

      autoTable(doc, {
        startY: y,
        head: [["Order ID", "Customer", "Phone", "Status", "Payment", "Total"]],
        body: filteredOrders.map((o) => [
          o.id,
          o.customerName,
          o.phone,
          o.status.toUpperCase(),
          `${o.paymentMethod} - ${o.isPaid ? "Paid" : "Unpaid"}`,
          `Rs. ${o.totalAmount}`,
        ]),
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [248, 249, 252] },
        styles: { fontSize: 8 },
      });
    }

    // Footer
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${totalPages}  ·  Made by WEBDEN`, pageW / 2, doc.internal.pageSize.getHeight() - 6, { align: "center" });
    }

    doc.save(`report-${selectedDate}-${period}.pdf`);
  };

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              Store overview for <span className="text-orange font-bold uppercase">{period}</span> report.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-3xl border border-border shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:border-r border-border">
              <Filter className="size-4 text-orange" />
              <span className="text-sm font-black uppercase tracking-wider text-navy">Period</span>
            </div>
            
            <div className="grid grid-cols-2 sm:flex items-center gap-3">
              <Select value={period} onValueChange={(v) => setPeriod(v as ReportPeriod)}>
                <SelectTrigger className="h-10 border-none bg-secondary/50 sm:bg-transparent focus:ring-0 rounded-xl sm:rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 pt-3 sm:pt-0 sm:border-l border-border sm:pl-3">
              <button
                onClick={generatePDF}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-navy text-white hover:bg-orange hover:text-navy rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10"
              >
                <Download className="size-3.5" /> PDF
              </button>
              
              <button 
                onClick={() => {
                  if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
                    useOrders.getState().clearAllData();
                    useSiteSettings.getState().clearAllEnquiries();
                  }
                }}
                className="size-10 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors shrink-0"
                title="Clear All Data"
              >
                <Settings className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Gross Revenue Card */}
          <Card className="border-none shadow-sm bg-navy text-white overflow-hidden relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-white/60">Gross Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">₹{stats.totalCollection}</div>
              <IndianRupee className="absolute top-4 right-4 size-8 opacity-10" />
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="border-none shadow-sm bg-red-50 text-red-950 overflow-hidden relative border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-red-700">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-red-900">₹{totalExpenses}</div>
              <Receipt className="absolute top-4 right-4 size-8 text-red-500/10" />
            </CardContent>
          </Card>

          {/* Net Profit Card */}
          {(() => {
            const netProfit = stats.totalCollection - totalExpenses;
            const isPositive = netProfit >= 0;
            return (
              <Card className={`border-none shadow-sm overflow-hidden relative border-l-4 ${isPositive ? 'bg-green-50 text-green-950 border-l-green-500' : 'bg-rose-50 text-rose-950 border-l-rose-500'}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-xs font-semibold uppercase tracking-wider ${isPositive ? 'text-green-700' : 'text-rose-700'}`}>Net Profit</CardTitle>
                </CardHeader>
                <CardContent className="flex items-baseline justify-between">
                  <div className={`text-2xl font-black ${isPositive ? 'text-green-900' : 'text-rose-900'}`}>₹{netProfit}</div>
                  {isPositive ? <ArrowUpRight className="size-6 text-green-500/50 absolute top-4 right-4" /> : <ArrowDownRight className="size-6 text-rose-500/50 absolute top-4 right-4" />}
                </CardContent>
              </Card>
            );
          })()}

          {/* Orders Card */}
          <Card className="border-none shadow-sm bg-white overflow-hidden relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-navy">{stats.totalOrders}</div>
              <ShoppingCart className="absolute top-4 right-4 size-8 text-orange/10" />
            </CardContent>
          </Card>

          {/* Delivered Card */}
          <Card className="border-none shadow-sm bg-green-50/30 overflow-hidden relative border-l-4 border-l-green-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-green-700">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-green-900">{stats.deliveredCount}</div>
              <CheckCircle className="absolute top-4 right-4 size-8 text-green-500/10" />
            </CardContent>
          </Card>

          {/* Pending Card */}
          <Card className="border-none shadow-sm bg-orange-50/30 overflow-hidden relative border-l-4 border-l-orange-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-orange-700">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-orange-900">{stats.pendingCount}</div>
              <Clock className="absolute top-4 right-4 size-8 text-orange-500/10" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-navy font-bold flex items-center gap-2">
                <Wallet className="size-5 text-orange" />
                Payment Split
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <IndianRupee className="size-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">Cash Collection</div>
                    <div className="text-xs text-muted-foreground">End of day cash</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-navy">₹{stats.cashCollection}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <CreditCard className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy">UPI Collection</div>
                    <div className="text-xs text-muted-foreground">Digital payments</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-navy">₹{stats.upiCollection}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-navy font-bold flex items-center gap-2">
                <TrendingUp className="size-5 text-orange" />
                Most Repeated Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.mostRepeated.map((p, idx) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <div className="size-8 rounded-lg bg-orange/10 text-orange grid place-items-center font-bold text-sm">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-navy">{p.name}</div>
                      <div className="w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className="bg-orange h-full rounded-full" 
                          style={{ width: `${(p.count / Math.max(...stats.mostRepeated.map(x => x.count))) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-navy">{p.count} units</div>
                  </div>
                ))}
                {stats.mostRepeated.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm italic">
                    No data available for this period.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-navy mb-4">Orders for this period</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-navy">{order.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-navy">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "new" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{order.paymentMethod}</span>
                        <span className={`text-[10px] ${order.isPaid ? "text-green-600" : "text-orange-600"}`}>
                          {order.isPaid ? "● Paid" : "○ Unpaid"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-navy text-right">₹{order.totalAmount}</td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="size-8 opacity-20" />
                        <p>No orders found for this period.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

