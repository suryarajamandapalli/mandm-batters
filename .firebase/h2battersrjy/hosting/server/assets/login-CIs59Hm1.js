import { M as useRouter, r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useDeliveryPartners } from "./deliveryPartners-CLQVjTCB.js";
import { u as useDeliveryAuth, t as toast } from "./router-Bieu8wEH.js";
import { L as Logo } from "./Logo-2djIL3Tn.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./utils-Bz4m9VPB.js";
function LoginPage() {
  const partners = useDeliveryPartners((s) => s.partners);
  const login = useDeliveryAuth((s) => s.login);
  const router = useRouter();
  const [loading, setLoading] = reactExports.useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const id = form.get("id");
    const passcode = form.get("passcode");
    setTimeout(() => {
      setLoading(false);
      const partner = partners.find((p) => p.id === id && p.passcode === passcode);
      if (partner) {
        login(partner);
        toast.success(`Welcome back, ${partner.name}!`);
        router.navigate({
          to: "/delivery"
        });
      } else {
        toast.error("Invalid Partner ID or Passcode.");
      }
    }, 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center min-h-[80vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card rounded-3xl border border-border p-8 shadow-xl shadow-navy/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "xl" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-navy", children: "Partner Portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Sign in to view your assigned deliveries." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-6", autoComplete: "off", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] font-black text-navy/40 mb-2 ml-1", children: "Partner ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "id", required: true, autoComplete: "off", className: "w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-navy focus:outline-none focus:border-orange focus:bg-white transition-all", placeholder: "e.g. DP001" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs uppercase tracking-[0.2em] font-black text-navy/40 mb-2 ml-1", children: "Secure Passcode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "passcode", type: "password", required: true, autoComplete: "new-password", className: "w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-navy focus:outline-none focus:border-orange focus:bg-white transition-all", placeholder: "••••" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full mt-4 bg-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange hover:text-navy hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 shadow-xl shadow-navy/10", children: loading ? "Authenticating..." : "Enter Portal" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
