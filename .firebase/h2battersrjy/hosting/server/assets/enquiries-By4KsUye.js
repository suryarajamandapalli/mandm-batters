import { U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { c as useSiteSettings, t as toast } from "./router-Bieu8wEH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { u as useAdminFilter } from "./adminFilter-BQmauvwt.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { U as User } from "./user-BINmN2zP.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { C as Calendar } from "./calendar-DkZIiN80.js";
import { f as format } from "./format-HuECJiab.js";
import { p as parseISO } from "./parseISO-D_5qpk76.js";
import { M as MessageSquare } from "./message-square-bGaklR8P.js";
import { T as Trash2 } from "./trash-2-ISN0WQ3x.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-D5w0REDj.js";
function EnquiriesPage() {
  const {
    enquiries,
    loading,
    removeEnquiry,
    updateEnquiryStatus
  } = useSiteSettings();
  const {
    selectedDate
  } = useAdminFilter();
  if (loading || !enquiries) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin text-orange" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground animate-pulse", children: "Loading enquiries..." })
    ] }) });
  }
  const safeEnquiries = (Array.isArray(enquiries) ? enquiries : []).filter((e) => {
    if (!e.date) return false;
    return e.date.split("T")[0] === selectedDate;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-navy", children: "Customer Enquiries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage feedback and questions from the website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-orange/10 text-orange px-4 py-2 rounded-full border border-orange/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: "Unread:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black", children: safeEnquiries.filter((e) => !e.isRead).length })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      safeEnquiries.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-3xl p-6 md:p-8 border-2 transition-all group relative shadow-sm ${e.isRead ? "border-border opacity-75" : "border-orange shadow-xl shadow-orange/5"}`, children: [
        !e.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -left-3 bg-orange text-navy text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg z-10", children: "New Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-8 gap-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase text-muted-foreground tracking-widest", children: "Customer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-navy text-lg leading-none", children: e.name })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase text-muted-foreground tracking-widest", children: "Contact" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${e.phone}`, className: "font-bold text-navy hover:text-orange hover:underline transition-colors", children: e.phone })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase text-muted-foreground tracking-widest", children: "Received On" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-navy", children: e.date ? format(parseISO(e.date), "PPP p") : "N/A" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 rounded-2xl border relative ${e.isRead ? "bg-secondary/20 border-border" : "bg-orange/5 border-orange/20"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: `absolute -top-3 -left-3 size-8 opacity-10 rotate-12 ${e.isRead ? "text-navy" : "text-orange"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-navy leading-relaxed font-medium ${e.isRead ? "" : "text-lg"}`, children: e.message })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex md:flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateEnquiryStatus(e.id, !e.isRead), className: `flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${e.isRead ? "bg-secondary text-muted-foreground hover:bg-orange/20 hover:text-orange" : "bg-navy text-white hover:bg-orange hover:text-navy shadow-lg shadow-navy/20"}`, children: e.isRead ? "Mark Unread" : "Mark as Read" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm("Permanently delete this enquiry?")) {
                removeEnquiry(e.id);
                toast.success("Enquiry deleted.");
              }
            }, className: "size-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white grid place-items-center transition-all", title: "Delete enquiry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-5" }) })
          ] })
        ] })
      ] }, e.id)),
      safeEnquiries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-secondary shadow-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-16 mx-auto text-muted-foreground/10 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-navy", children: "No messages found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs mx-auto", children: "When customers reach out through your website, their messages will appear here instantly." })
      ] })
    ] })
  ] }) });
}
export {
  EnquiriesPage as component
};
