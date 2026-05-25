import { M as useRouter, r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { b as useAdminAuth, t as toast } from "./router-Bieu8wEH.js";
import { L as Logo } from "./Logo-2djIL3Tn.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./utils-Bz4m9VPB.js";
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLogin() {
  const login = useAdminAuth((s) => s.login);
  const router = useRouter();
  const [loading, setLoading] = reactExports.useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = form.get("password");
    setTimeout(() => {
      const success = login(password);
      setLoading(false);
      if (success) {
        toast.success("Access Granted. Welcome, Admin.");
        router.navigate({ to: "/admin/dashboard" });
      } else {
        toast.error("Invalid Administrative Password.");
      }
    }, 800);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[9999] bg-navy flex items-center justify-center p-6 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden my-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full -mr-16 -mt-16 blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-navy/5 rounded-full -ml-16 -mb-16 blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "xl", className: "rotate-3" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl text-navy tracking-tight", children: "Admin Terminal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 font-medium", children: "Enter secure password to continue" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleLogin,
          className: "space-y-6",
          autoComplete: "off",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-[0.2em] font-black text-navy/40 ml-1", children: "Security Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    name: "password",
                    type: "password",
                    required: true,
                    autoFocus: true,
                    autoComplete: "new-password",
                    className: "w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-12 py-4 text-navy font-bold focus:outline-none focus:border-orange focus:bg-white transition-all",
                    placeholder: "••••••••••••"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "w-full bg-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange hover:text-navy hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-navy/20 flex items-center justify-center gap-3",
                children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }),
                  "Authenticating..."
                ] }) : "Authorize Access"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50", children: "Renuka's H2 Batters — Internal System" }) })
    ] })
  ] }) });
}
const SplitComponent = AdminLogin;
export {
  SplitComponent as component
};
