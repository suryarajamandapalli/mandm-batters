import { M as useRouter, U as jsxRuntimeExports, _ as Outlet } from "./worker-entry-BqvgFAY5.js";
import { u as useDeliveryAuth } from "./router-Bieu8wEH.js";
import { L as Logo } from "./Logo-2djIL3Tn.js";
import { L as LogOut } from "./log-out-BxWkRxRv.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./utils-Bz4m9VPB.js";
import "./createLucideIcon-D5w0REDj.js";
function DeliveryLayout() {
  const currentPartner = useDeliveryAuth((s) => s.currentPartner);
  const logout = useDeliveryAuth((s) => s.logout);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.navigate({
      to: "/delivery/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[100svh] bg-secondary/30 flex flex-col", children: [
    currentPartner && /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-navy text-white sticky top-0 z-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-3xl h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-black tracking-tight", children: [
          "Partner ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "HUB" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: currentPartner.image, alt: "", className: "size-8 rounded-full border border-white/20 object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline font-medium", children: currentPartner.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "p-2 hover:bg-white/10 rounded-full transition-colors", "aria-label": "Logout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full max-w-3xl mx-auto container-px py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  DeliveryLayout as component
};
