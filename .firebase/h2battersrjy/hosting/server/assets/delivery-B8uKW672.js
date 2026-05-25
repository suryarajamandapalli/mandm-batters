import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useDeliveryPartners } from "./deliveryPartners-CLQVjTCB.js";
import { t as toast } from "./router-Bieu8wEH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { M as MediaUpload } from "./MediaUpload-BCulELl0.js";
import { P as Plus } from "./plus-Ci062b-n.js";
import { T as Trash2 } from "./trash-2-ISN0WQ3x.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { M as MapPin } from "./map-pin-DDPhWf0a.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./x-Cj-DygLU.js";
import "./loader-circle-D-sdHygJ.js";
import "./circle-check-big-D4WEICFP.js";
const __iconNode = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode);
function DeliveryPartnersPage() {
  const partners = useDeliveryPartners((s) => s.partners);
  const addPartner = useDeliveryPartners((s) => s.addPartner);
  const deletePartner = useDeliveryPartners((s) => s.deletePartner);
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [newPartnerImage, setNewPartnerImage] = reactExports.useState("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-navy", children: "Delivery Partners" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage delivery personnel and access credentials." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsAdding(!isAdding), className: "bg-navy text-white px-5 py-2.5 rounded-full font-semibold hover:bg-orange transition-colors flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " Add Partner"
      ] })
    ] }),
    isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "bg-white p-8 rounded-[2rem] border border-border grid sm:grid-cols-2 gap-6 shadow-xl relative overflow-hidden", autoComplete: "off", onSubmit: (e) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      addPartner({
        id: form.get("id"),
        passcode: form.get("passcode"),
        name: form.get("name"),
        phone: form.get("phone"),
        image: newPartnerImage,
        address: form.get("address")
      });
      setIsAdding(false);
      setNewPartnerImage("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop");
      toast.success("Delivery partner created successfully!");
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-navy", children: "Partner Registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsAdding(false), className: "text-muted-foreground hover:text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1", children: "Partner ID (Login)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "id", required: true, autoComplete: "off", className: "w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all", placeholder: "e.g. DP001" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1", children: "Passcode (Login)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "passcode", required: true, type: "password", autoComplete: "new-password", className: "w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all", placeholder: "••••" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", required: true, autoComplete: "off", className: "w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "phone", required: true, type: "tel", autoComplete: "off", className: "w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Profile Photo", value: newPartnerImage, onChange: setNewPartnerImage }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "address", required: true, autoComplete: "off", className: "w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex justify-end gap-3 mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsAdding(false), className: "px-8 py-3.5 rounded-xl font-bold text-navy/60 hover:bg-secondary transition-all", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-10 py-3.5 rounded-xl bg-navy text-white font-black uppercase tracking-widest hover:bg-orange hover:text-navy transition-all shadow-lg shadow-navy/10", children: "Register Partner" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
      (partners || []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-6 shadow-sm relative group overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deletePartner(p.id), className: "p-2 bg-white/80 backdrop-blur rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.name, className: "size-16 rounded-full object-cover border-2 border-orange/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-navy", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-medium text-orange flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-3" }),
              " ID: ",
              p.id
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-secondary rounded-lg text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }) }),
            p.phone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-secondary rounded-lg text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }) }),
            p.address
          ] })
        ] })
      ] }, p.id)),
      (partners || []).length === 0 && !isAdding && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 lg:col-span-3 text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-3xl", children: "No delivery partners added yet." })
    ] })
  ] }) });
}
export {
  DeliveryPartnersPage as component
};
