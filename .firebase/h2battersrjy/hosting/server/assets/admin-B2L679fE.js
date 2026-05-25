import { r as reactExports, U as jsxRuntimeExports, M as useRouter, _ as Outlet } from "./worker-entry-BqvgFAY5.js";
import { b as useAdminAuth, c as useSiteSettings, L as Link } from "./router-Bieu8wEH.js";
import { L as Logo } from "./Logo-2djIL3Tn.js";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, O as Overlay, c as cva, D as Description } from "./index-CwckyyLm.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
import { X } from "./x-Cj-DygLU.js";
import { u as useAdminFilter } from "./adminFilter-BQmauvwt.js";
import { C as Calendar } from "./calendar-DkZIiN80.js";
import { M as Menu } from "./menu-Cq-0K_jZ.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { S as ShoppingCart, I as IndianRupee, a as Settings } from "./shopping-cart-Bjw0eGi9.js";
import { P as Package } from "./package-CgrZNsCh.js";
import { M as MessageSquare } from "./message-square-bGaklR8P.js";
import { L as LogOut } from "./log-out-BxWkRxRv.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./index-uIYPz_p6.js";
import "./format-HuECJiab.js";
const __iconNode$2 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function AdminLayout() {
  const isAdmin = useAdminAuth((s) => s.isAdmin);
  const logout = useAdminAuth((s) => s.logout);
  const enquiries = useSiteSettings((s) => s.enquiries);
  const unreadEnquiries = enquiries.filter((e) => !e.isRead).length;
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = reactExports.useState(false);
  const {
    selectedDate,
    setSelectedDate
  } = useAdminFilter();
  const navItems = [{
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard
  }, {
    label: "Orders",
    to: "/admin/orders",
    icon: ShoppingCart
  }, {
    label: "Payments",
    to: "/admin/payments",
    icon: IndianRupee
  }, {
    label: "Products",
    to: "/admin/products",
    icon: Package
  }, {
    label: "Delivery Partners",
    to: "/admin/delivery",
    icon: Users
  }, {
    label: "Enquiries",
    to: "/admin/enquiries",
    icon: MessageSquare,
    badge: unreadEnquiries
  }, {
    label: "Website CMS",
    to: "/admin/cms",
    icon: Settings
  }];
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, {});
  }
  const handleLogout = () => {
    logout();
    router.navigate({
      to: "/admin/login"
    });
  };
  const SidebarContent = ({
    isMobile = false
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-20 flex items-center px-8 border-b border-white/5", isMobile ? "px-4" : "px-8"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-xl tracking-tight text-white", children: [
        "Admin ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "HUB" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30", children: "Main Menu" }),
      navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.to, onClick: () => isMobile && setIsMobileMenuOpen(false), activeProps: {
        className: "bg-white/10 text-orange border-l-4 border-orange"
      }, activeOptions: item.to === "/admin/dashboard" ? {
        exact: true
      } : {}, className: "flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl hover:bg-white/5 transition-all text-white/70 hover:text-white font-bold text-sm group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-5 group-hover:scale-110 transition-transform" }),
          item.label
        ] }),
        item.badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-orange text-navy text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg", children: item.badge })
      ] }, item.label))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-white/5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-4" }),
        "Live Site"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-500/10 hover:bg-red-500 transition-all text-red-500 hover:text-white font-bold text-xs uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
        "Sign Out"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:flex w-72 bg-navy text-white flex-col fixed inset-y-0 left-0 shadow-2xl z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden h-16 bg-navy text-white flex items-center justify-between px-4 sticky top-0 z-30 shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-lg tracking-tight", children: [
          "Admin ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "HUB" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1 border border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3.5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), className: "bg-transparent border-none text-[10px] font-bold text-white outline-none focus:ring-0 p-0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: isMobileMenuOpen, onOpenChange: setIsMobileMenuOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 hover:bg-white/10 rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-6 text-white" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "p-0 bg-navy border-none w-[280px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Admin Navigation" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { isMobile: true })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 lg:ml-72 min-h-screen relative flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-20 bg-white/80 backdrop-blur-md border-b border-border hidden lg:flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-navy flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 bg-green-500 rounded-full animate-pulse" }),
            "System: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium ml-1", children: "Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-secondary/50 rounded-2xl px-4 py-2 border border-border group hover:border-orange/30 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4 text-orange" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-0.5", children: "Filtering Data For" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), className: "bg-transparent border-none text-sm font-black text-navy p-0 focus:ring-0 h-4" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-navy", children: "Administrator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-bold uppercase tracking-widest", children: "Master Access" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-2xl bg-secondary grid place-items-center text-navy font-black border border-border shadow-inner", children: "AD" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4 md:p-6 lg:p-10 w-full max-w-[1600px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "p-6 text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest border-t border-border mt-auto", children: "Renuka's H2 Batters — Internal Administrative Panel" })
    ] })
  ] });
}
export {
  AdminLayout as component
};
