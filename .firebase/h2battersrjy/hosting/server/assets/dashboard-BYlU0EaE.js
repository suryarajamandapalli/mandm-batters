import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useOrders } from "./orders-CR_WIYxX.js";
import { c as useSiteSettings } from "./router-Bieu8wEH.js";
import { u as useProductsStore } from "./products-DhKdDw1-.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-Cw92DdRs.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, D as Download } from "./select-BFpP6fYI.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { u as useAdminFilter } from "./adminFilter-BQmauvwt.js";
import { p as parseISO } from "./parseISO-D_5qpk76.js";
import { n as normalizeDates, s as startOfWeek, f as format } from "./format-HuECJiab.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { a as Settings, I as IndianRupee, S as ShoppingCart } from "./shopping-cart-Bjw0eGi9.js";
import { C as CircleCheckBig } from "./circle-check-big-D4WEICFP.js";
import { C as Clock } from "./clock-_Z5BVC6k.js";
import { W as Wallet, C as CreditCard } from "./wallet-DlNIKtI2.js";
import { T as TrendingUp } from "./trending-up-DojrSsYm.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
import "./index-uIYPz_p6.js";
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
}
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
}
function isSameYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear();
}
function DashboardPage() {
  const orders = useOrders((s) => s.orders);
  useProductsStore((s) => s.products);
  const {
    selectedDate
  } = useAdminFilter();
  const [period, setPeriod] = reactExports.useState("daily");
  const filteredOrders = reactExports.useMemo(() => {
    const baseDate = parseISO(selectedDate);
    const selectedDateStr = selectedDate;
    const safeOrders = Array.isArray(orders) ? orders : [];
    return safeOrders.filter((o) => {
      if (!o.date) return false;
      const orderDate = parseISO(o.date);
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
  const stats = reactExports.useMemo(() => {
    const totalCollection = filteredOrders.reduce((acc, o) => acc + o.totalAmount, 0);
    const cashCollection = filteredOrders.filter((o) => o.paymentMethod === "Cash").reduce((acc, o) => acc + o.totalAmount, 0);
    const upiCollection = filteredOrders.filter((o) => o.paymentMethod === "UPI").reduce((acc, o) => acc + o.totalAmount, 0);
    const deliveredCount = filteredOrders.filter((o) => o.status === "delivered").length;
    const pendingCount = filteredOrders.filter((o) => o.status !== "delivered").length;
    const productCounts = {};
    filteredOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = {
            name: item.name,
            count: 0
          };
        }
        productCounts[item.productId].count += (item.kg || 0) + (item.halfKg || 0);
      });
    });
    const mostRepeated = Object.values(productCounts).sort((a, b) => b.count - a.count).slice(0, 5);
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
    const {
      default: jsPDF
    } = await import("./jspdf.es.min-Dy-sY-y6.js").then((n) => n.j);
    const {
      default: autoTable
    } = await import("./jspdf.plugin.autotable-CHV4x0GA.js");
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const periodLabel = period.charAt(0).toUpperCase() + period.slice(1);
    const dateLabel = format(parseISO(selectedDate), "dd MMM yyyy");
    doc.setFillColor(31, 41, 80);
    doc.rect(0, 0, pageW, 36, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Renuka's H2 Batters", 14, 16);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`${periodLabel} Report  ·  ${dateLabel}  ·  Generated: ${format(/* @__PURE__ */ new Date(), "dd MMM yyyy, hh:mm a")}`, 14, 28);
    let y = 46;
    doc.setTextColor(31, 41, 80);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 14, y);
    y += 6;
    autoTable(doc, {
      startY: y,
      head: [["Metric", "Value"]],
      body: [["Total Revenue", `Rs. ${stats.totalCollection}`], ["Total Orders", String(stats.totalOrders)], ["Delivered Orders", String(stats.deliveredCount)], ["Pending Orders", String(stats.pendingCount)], ["Cash Collection", `Rs. ${stats.cashCollection}`], ["UPI Collection", `Rs. ${stats.upiCollection}`]],
      headStyles: {
        fillColor: [255, 122, 26],
        textColor: [31, 41, 80],
        fontStyle: "bold"
      },
      alternateRowStyles: {
        fillColor: [248, 249, 252]
      },
      styles: {
        fontSize: 10
      }
    });
    y = doc.lastAutoTable.finalY + 10;
    if (stats.mostRepeated.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 80);
      doc.text("Top Products", 14, y);
      y += 6;
      autoTable(doc, {
        startY: y,
        head: [["#", "Product", "Units Ordered"]],
        body: stats.mostRepeated.map((p, i) => [String(i + 1), p.name, String(p.count)]),
        headStyles: {
          fillColor: [31, 41, 80],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 252]
        },
        styles: {
          fontSize: 10
        }
      });
      y = doc.lastAutoTable.finalY + 10;
    }
    if (filteredOrders.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 80);
      doc.text("Orders", 14, y);
      y += 6;
      autoTable(doc, {
        startY: y,
        head: [["Order ID", "Customer", "Phone", "Status", "Payment", "Total"]],
        body: filteredOrders.map((o) => [o.id, o.customerName, o.phone, o.status.toUpperCase(), `${o.paymentMethod} - ${o.isPaid ? "Paid" : "Unpaid"}`, `Rs. ${o.totalAmount}`]),
        headStyles: {
          fillColor: [31, 41, 80],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 252]
        },
        styles: {
          fontSize: 8
        }
      });
    }
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${totalPages}  ·  Made by WEBDEN`, pageW / 2, doc.internal.pageSize.getHeight() - 6, {
        align: "center"
      });
    }
    doc.save(`report-${selectedDate}-${period}.pdf`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xl:flex-row xl:items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-navy", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm md:text-base", children: [
          "Store overview for ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange font-bold uppercase", children: period }),
          " report."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-3xl border border-border shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 sm:border-r border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "size-4 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black uppercase tracking-wider text-navy", children: "Period" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: period, onValueChange: (v) => setPeriod(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-10 border-none bg-secondary/50 sm:bg-transparent focus:ring-0 rounded-xl sm:rounded-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily", children: "Daily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "monthly", children: "Monthly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yearly", children: "Yearly" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 sm:pt-0 sm:border-l border-border sm:pl-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: generatePDF, className: "flex-1 sm:flex-none px-5 py-2.5 bg-navy text-white hover:bg-orange hover:text-navy rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
            " PDF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
              useOrders.getState().clearAllData();
              useSiteSettings.getState().clearAllEnquiries();
            }
          }, className: "size-10 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors shrink-0", title: "Clear All Data", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-4" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-none shadow-sm bg-navy text-white overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-white/60", children: "Total Collection" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl sm:text-3xl font-bold", children: [
            "₹",
            stats.totalCollection
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute top-4 right-4 size-8 opacity-10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-none shadow-sm bg-white overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Orders" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl sm:text-3xl font-bold text-navy", children: stats.totalOrders }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "absolute top-4 right-4 size-8 text-orange/10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-none shadow-sm bg-green-50 overflow-hidden relative border-l-4 border-l-green-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-green-700", children: "Delivered" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl sm:text-3xl font-bold text-green-900", children: stats.deliveredCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "absolute top-4 right-4 size-8 text-green-500/10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-none shadow-sm bg-orange-50 overflow-hidden relative border-l-4 border-l-orange-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xs font-semibold uppercase tracking-wider text-orange-700", children: "Pending" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl sm:text-3xl font-bold text-orange-900", children: stats.pendingCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute top-4 right-4 size-8 text-orange-500/10" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg text-navy font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-5 text-orange" }),
          "Payment Split"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-secondary/30 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-5 text-green-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-navy", children: "Cash Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "End of day cash" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-navy", children: [
              "₹",
              stats.cashCollection
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-secondary/30 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-5 text-blue-600" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-navy", children: "UPI Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Digital payments" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-bold text-navy", children: [
              "₹",
              stats.upiCollection
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg text-navy font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5 text-orange" }),
          "Most Repeated Products"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          stats.mostRepeated.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "size-8 rounded-lg bg-orange/10 text-orange grid place-items-center font-bold text-sm", children: [
              "#",
              idx + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-navy", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-secondary h-1.5 rounded-full mt-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-orange h-full rounded-full", style: {
                width: `${p.count / Math.max(...stats.mostRepeated.map((x) => x.count)) * 100}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-navy", children: [
              p.count,
              " units"
            ] })
          ] }, p.name)),
          stats.mostRepeated.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground text-sm italic", children: "No data available for this period." })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-navy mb-4", children: "Orders for this period" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground uppercase bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 rounded-l-lg", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 rounded-r-lg text-right", children: "Total" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          filteredOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-secondary/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-medium text-navy", children: order.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy", children: order.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: order.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === "delivered" ? "bg-green-100 text-green-700" : order.status === "new" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`, children: order.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: order.paymentMethod }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] ${order.isPaid ? "text-green-600" : "text-orange-600"}`, children: order.isPaid ? "● Paid" : "○ Unpaid" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4 font-bold text-navy text-right", children: [
              "₹",
              order.totalAmount
            ] })
          ] }, order.id)),
          filteredOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-12 text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-8 opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No orders found for this period." })
          ] }) }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
