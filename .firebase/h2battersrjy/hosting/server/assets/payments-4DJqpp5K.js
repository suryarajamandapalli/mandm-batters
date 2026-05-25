import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useOrders } from "./orders-CR_WIYxX.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Cw92DdRs.js";
import { t as toast } from "./router-Bieu8wEH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { u as useAdminFilter } from "./adminFilter-BQmauvwt.js";
import { C as CircleCheck } from "./circle-check-CD5rt2FV.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { W as Wallet, C as CreditCard } from "./wallet-DlNIKtI2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
import "./format-HuECJiab.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function PaymentsPage() {
  const {
    orders,
    updateOrderPaymentStatus
  } = useOrders();
  const {
    selectedDate
  } = useAdminFilter();
  const filteredOrders = reactExports.useMemo(() => {
    const selectedDateStr = selectedDate;
    const safeOrders = Array.isArray(orders) ? orders : [];
    return safeOrders.filter((o) => {
      if (!o.date) return false;
      const oDateStr = o.date.split("T")[0];
      return oDateStr === selectedDateStr;
    });
  }, [orders, selectedDate]);
  const stats = reactExports.useMemo(() => {
    const cash = filteredOrders.filter((o) => o.paymentMethod === "Cash" && o.isPaid).reduce((acc, o) => acc + o.totalAmount, 0);
    const upi = filteredOrders.filter((o) => o.paymentMethod === "UPI" && o.isPaid).reduce((acc, o) => acc + o.totalAmount, 0);
    const pending = filteredOrders.filter((o) => !o.isPaid).reduce((acc, o) => acc + o.totalAmount, 0);
    return {
      cash,
      upi,
      pending,
      paidCount: filteredOrders.filter((o) => o.isPaid).length,
      unpaidCount: filteredOrders.filter((o) => !o.isPaid).length
    };
  }, [filteredOrders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-navy", children: "Payment Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track and reconcile daily collections." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-green-50 border-green-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-bold text-green-700 uppercase", children: "Cash Collected" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-green-900", children: [
          "₹",
          stats.cash
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-blue-50 border-blue-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-bold text-blue-700 uppercase", children: "UPI Collected" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-blue-900", children: [
          "₹",
          stats.upi
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-orange-50 border-orange-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-bold text-orange-700 uppercase", children: "Pending Payments" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-orange-900", children: [
          "₹",
          stats.pending
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-navy", children: "Daily Reconciliation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs font-bold uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-green-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
            " Paid: ",
            stats.paidCount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-orange-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-4" }),
            " Unpaid: ",
            stats.unpaidCount
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground uppercase bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 rounded-l-lg", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 rounded-r-lg", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          filteredOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-bold text-navy", children: order.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: order.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: order.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              order.paymentMethod === "Cash" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4 text-blue-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: order.paymentMethod })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4 font-bold text-navy", children: [
              "₹",
              order.totalAmount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: order.isPaid, onChange: (e) => {
                updateOrderPaymentStatus(order.id, e.target.checked, "Admin");
                toast.success(`Order ${order.id} marked as ${e.target.checked ? "Paid" : "Unpaid"}`);
              }, className: "size-4 rounded border-gray-300 text-orange focus:ring-orange" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold uppercase ${order.isPaid ? "text-green-600" : "text-orange-600"}`, children: order.isPaid ? "Paid" : "Mark Paid" })
            ] }) })
          ] }, order.uid)),
          filteredOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-12 text-center text-muted-foreground", children: "No orders for this date." }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  PaymentsPage as component
};
