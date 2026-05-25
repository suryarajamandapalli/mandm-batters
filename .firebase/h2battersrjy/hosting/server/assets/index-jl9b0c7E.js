import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useOrders } from "./orders-CR_WIYxX.js";
import { u as useDeliveryAuth, t as toast } from "./router-Bieu8wEH.js";
import { I as Input, o as openWhatsApp } from "./whatsapp-BOnPtIkw.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { f as format } from "./format-HuECJiab.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { C as Calendar } from "./calendar-DkZIiN80.js";
import { P as Package } from "./package-CgrZNsCh.js";
import { C as CircleCheck } from "./circle-check-CD5rt2FV.js";
import { T as TrendingUp } from "./trending-up-DojrSsYm.js";
import { W as Wallet, C as CreditCard } from "./wallet-DlNIKtI2.js";
import { M as MapPin } from "./map-pin-DDPhWf0a.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { M as MessageCircle } from "./message-circle-HnpO-44Z.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
function DeliveryDashboard() {
  const partner = useDeliveryAuth((s) => s.currentPartner);
  const {
    orders,
    updateOrderStatus,
    updateOrderPaymentStatus,
    loading
  } = useOrders();
  const [selectedDate, setSelectedDate] = reactExports.useState(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
  const filteredOrders = reactExports.useMemo(() => {
    if (!partner?.id || !orders) return [];
    const selectedDateStr = selectedDate;
    return (orders || []).filter((o) => {
      if (!o?.assignedPartnerId || o.assignedPartnerId !== partner.id) return false;
      if (!o?.date) return false;
      const oDateStr = o.date.split("T")[0];
      return oDateStr === selectedDateStr;
    });
  }, [orders, selectedDate, partner?.id]);
  const stats = reactExports.useMemo(() => {
    const pending = filteredOrders.filter((o) => o.status === "dispatched").length;
    const completed = filteredOrders.filter((o) => o.status === "delivered").length;
    const cashCollected = filteredOrders.filter((o) => o.paymentMethod === "Cash" && o.isPaid).reduce((acc, o) => acc + o.totalAmount, 0);
    const upiCollected = filteredOrders.filter((o) => o.paymentMethod === "UPI" && o.isPaid).reduce((acc, o) => acc + o.totalAmount, 0);
    return {
      pending,
      completed,
      cashCollected,
      upiCollected
    };
  }, [filteredOrders]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin text-orange" }) });
  }
  if (!partner) return null;
  const handleComplete = (order) => {
    updateOrderStatus(order.uid, "delivered");
    toast.success("Order marked as delivered!");
    openWhatsApp(order.phone, `Thanks ${order.customerName}! Your order ${order.id} has been successfully delivered by Renuka's H2 Batters. Enjoy!`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-navy", children: "Partner Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-border rounded-xl px-3 py-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4 text-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), className: "border-none bg-transparent focus-visible:ring-0 h-8 text-xs font-bold" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy text-white rounded-[2rem] p-5 shadow-lg shadow-navy/10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-white/50 font-bold mb-1", children: "Pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: stats.pending || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "absolute -bottom-2 -right-2 size-16 opacity-10 rotate-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange text-navy rounded-[2rem] p-5 shadow-lg shadow-orange/10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-navy/50 font-bold mb-1", children: "Delivered" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold", children: stats.completed || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "absolute -bottom-2 -right-2 size-16 opacity-10 rotate-12" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2rem] p-6 border border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4 text-orange" }),
        "Collection Summary"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-2xl bg-green-50 text-green-600 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-muted-foreground uppercase", children: "Cash" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-navy", children: [
              "₹",
              stats.cashCollected || 0
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-2xl bg-blue-50 text-blue-600 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-muted-foreground uppercase", children: "UPI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-navy", children: [
              "₹",
              stats.upiCollected || 0
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-navy mb-4", children: "Assigned Routes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        (filteredOrders || []).filter((o) => o.status === "dispatched").map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-5 border-2 border-orange/20 shadow-xl shadow-orange/5 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-black text-orange uppercase tracking-widest mb-1", children: [
                "Order ",
                order.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-navy", children: order.customerName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-muted-foreground uppercase mb-1", children: "Collect" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-navy text-xl", children: [
                "₹",
                order.totalAmount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold uppercase ${order.paymentMethod === "Cash" ? "text-green-600" : "text-blue-600"}`, children: order.paymentMethod })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-secondary/30 p-4 rounded-2xl border border-secondary mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-orange shrink-0 mt-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-navy font-medium leading-relaxed", children: [
                order.address?.door,
                ", ",
                order.address?.apartment,
                ", ",
                order.address?.floor && `Floor ${order.address.floor}, `,
                order.address?.street
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-orange shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-navy font-bold", children: order.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${order.phone}`, className: "flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-secondary text-navy font-bold text-xs hover:bg-navy hover:text-white transition-all", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }),
                " CALL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openWhatsApp(order.phone, `Hello ${order.customerName}, this is your delivery partner from Renuka's H2 Batters...`), className: "flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-green-500 text-white font-bold text-xs hover:bg-green-600 transition-all shadow-lg shadow-green-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
                " WHATSAPP"
              ] })
            ] }),
            order.mapsLocation && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://maps.google.com/?q=${order.mapsLocation}`, target: "_blank", className: "flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "size-4" }),
              " NAVIGATE TO MAPS"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 pt-4 border-t border-secondary flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between p-4 rounded-2xl bg-green-50 border border-green-100 cursor-pointer select-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: order.isPaid, onChange: (e) => updateOrderPaymentStatus(order.uid, e.target.checked, partner.name), className: "size-5 rounded border-green-300 text-green-600 focus:ring-green-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-green-900 uppercase", children: "Payment Collected" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-green-700", children: [
                  "₹",
                  order.totalAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: !order.isPaid, onClick: () => handleComplete(order), className: "w-full bg-navy text-white py-5 rounded-[1.5rem] font-bold flex justify-center items-center gap-2 hover:bg-orange hover:text-navy transition-all disabled:opacity-20 disabled:grayscale", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5" }),
                " COMPLETE DELIVERY"
              ] })
            ] })
          ] })
        ] }, order.id)),
        (filteredOrders || []).filter((o) => o.status === "dispatched").length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 bg-white rounded-[2rem] border border-dashed border-border text-muted-foreground shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-12 mx-auto opacity-10 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-navy/40 uppercase tracking-widest text-xs", children: "No pending deliveries" })
        ] })
      ] })
    ] }),
    (filteredOrders || []).filter((o) => o.status === "delivered").length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-navy mb-4 opacity-60", children: "Delivered Today" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: (filteredOrders || []).filter((o) => o.status === "delivered").map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/60 rounded-2xl p-4 border border-border flex justify-between items-center group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-navy text-sm", children: order.customerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground font-bold uppercase tracking-wider", children: [
            order.id,
            " · ",
            order.address?.apartment || "Unknown"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-navy", children: [
            "₹",
            order.totalAmount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }),
            " Delivered"
          ] })
        ] })
      ] }, order.id)) })
    ] })
  ] }) });
}
export {
  DeliveryDashboard as component
};
