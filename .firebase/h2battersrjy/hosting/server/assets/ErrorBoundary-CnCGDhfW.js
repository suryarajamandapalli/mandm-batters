import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { L as Link } from "./router-Bieu8wEH.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
class ErrorBoundary extends reactExports.Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.fallback) {
        return this.fallback;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-[2rem] border border-border shadow-sm m-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 bg-red-50 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-8 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-navy mb-2", children: "Something went wrong" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mb-8", children: "An unexpected error occurred while rendering this component. We've been notified and are looking into it." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => window.location.reload(),
              className: "inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-bold hover:bg-orange hover:text-navy transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
                " Try Again"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-bold text-navy hover:bg-secondary transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "size-4" }),
                " Go Home"
              ]
            }
          )
        ] }),
        false
      ] });
    }
    return this.props.children;
  }
}
export {
  ErrorBoundary as E
};
