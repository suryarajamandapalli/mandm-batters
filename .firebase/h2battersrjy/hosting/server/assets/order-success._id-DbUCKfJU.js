import { U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { R as Route, L as Link } from "./router-Bieu8wEH.js";
import { m as motion } from "./proxy-DdJfWClK.js";
import { C as CircleCheck } from "./circle-check-CD5rt2FV.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { A as ArrowRight } from "./arrow-right-Df2n4xrG.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./createLucideIcon-D5w0REDj.js";
function OrderSuccess() {
  const {
    id
  } = Route.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-navy text-white relative overflow-hidden grid place-items-center px-5 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,122,26,0.18),transparent_55%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6
    }, className: "relative max-w-lg w-full text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0
      }, animate: {
        scale: 1
      }, transition: {
        type: "spring",
        damping: 14,
        stiffness: 200,
        delay: 0.15
      }, className: "size-24 rounded-full bg-orange grid place-items-center mx-auto shadow-2xl shadow-orange/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-12 text-navy", strokeWidth: 2.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-8 font-display font-bold text-4xl md:text-5xl", children: "Order Confirmed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/80 text-lg", children: "Thank you for ordering with us. Our team will contact you shortly to confirm the details." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 inline-block bg-white/10 backdrop-blur border border-white/15 rounded-2xl px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-orange font-semibold", children: "Your Order ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display font-bold text-3xl tracking-wider", children: id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-center gap-3 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4 text-orange" }),
        "We'll call you within 30 minutes to confirm."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-col sm:flex-row gap-3 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center justify-center gap-2 bg-orange text-navy px-7 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-orange/30 transition-all", children: [
        "Back to Home",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
      ] }) })
    ] })
  ] });
}
export {
  OrderSuccess as component
};
