import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useOrders } from "@/store/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isSameDay, parseISO } from "date-fns";
import { IndianRupee, Wallet, CreditCard, CheckCircle2, XCircle, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/payments")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: PaymentsPage,
});

import { useAdminFilter } from "@/store/adminFilter";

function PaymentsPage() {
  const { orders, updateOrderPaymentStatus } = useOrders();
  const { selectedDate } = useAdminFilter();

  const filteredOrders = useMemo(() => {
    const selectedDateStr = selectedDate; // "yyyy-MM-dd"
    const safeOrders = Array.isArray(orders) ? orders : [];
    return safeOrders.filter((o) => {
      if (!o.date) return false;
      const oDateStr = o.date.split("T")[0];
      return oDateStr === selectedDateStr;
    });
  }, [orders, selectedDate]);

  const stats = useMemo(() => {
    const cash = filteredOrders
      .filter((o) => o.paymentMethod === "Cash" && o.isPaid)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    const upi = filteredOrders
      .filter((o) => o.paymentMethod === "UPI" && o.isPaid)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    const pending = filteredOrders
      .filter((o) => !o.isPaid)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    
    return {
      cash,
      upi,
      pending,
      paidCount: filteredOrders.filter(o => o.isPaid).length,
      unpaidCount: filteredOrders.filter(o => !o.isPaid).length,
    };
  }, [filteredOrders]);

  return (
    <ErrorBoundary>
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy">Payment Management</h1>
            <p className="text-muted-foreground mt-1">Track and reconcile daily collections.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-green-700 uppercase">Cash Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">₹{stats.cash}</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-blue-700 uppercase">UPI Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">₹{stats.upi}</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-orange-700 uppercase">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">₹{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-navy">Daily Reconciliation</h2>
            <div className="flex gap-4 text-xs font-bold uppercase">
               <div className="flex items-center gap-1.5 text-green-600">
                 <CheckCircle2 className="size-4" /> Paid: {stats.paidCount}
               </div>
               <div className="flex items-center gap-1.5 text-orange-600">
                 <XCircle className="size-4" /> Unpaid: {stats.unpaidCount}
               </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.uid} className="hover:bg-secondary/50">
                    <td className="px-4 py-4 font-bold text-navy">{order.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-navy">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {order.paymentMethod === "Cash" ? <Wallet className="size-4 text-green-600" /> : <CreditCard className="size-4 text-blue-600" />}
                        <span className="font-semibold">{order.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-navy">₹{order.totalAmount}</td>
                    <td className="px-4 py-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={order.isPaid}
                          onChange={(e) => {
                            updateOrderPaymentStatus(order.id, e.target.checked, "Admin");
                            toast.success(`Order ${order.id} marked as ${e.target.checked ? "Paid" : "Unpaid"}`);
                          }}
                          className="size-4 rounded border-gray-300 text-orange focus:ring-orange"
                        />
                        <span className={`text-xs font-bold uppercase ${order.isPaid ? "text-green-600" : "text-orange-600"}`}>
                          {order.isPaid ? "Paid" : "Mark Paid"}
                        </span>
                      </label>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                   <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                        No orders for this date.
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
