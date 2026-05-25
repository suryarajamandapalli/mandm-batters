import { r as reactExports, U as jsxRuntimeExports, $ as React } from "./worker-entry-BqvgFAY5.js";
import { u as useOrders } from "./orders-CR_WIYxX.js";
import { u as useDeliveryPartners } from "./deliveryPartners-CLQVjTCB.js";
import { t as toast } from "./router-Bieu8wEH.js";
import { o as openWhatsApp, I as Input } from "./whatsapp-BOnPtIkw.js";
import { R as Root$1, P as Portal, C as Content, a as Close, b as Title, D as Description, O as Overlay, c as cva } from "./index-CwckyyLm.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
import { X } from "./x-Cj-DygLU.js";
import { c as composeRefs } from "./index-uIYPz_p6.js";
import { D as Download, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BFpP6fYI.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { u as useAdminFilter } from "./adminFilter-BQmauvwt.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { C as CircleCheckBig } from "./circle-check-big-D4WEICFP.js";
import { S as SquarePen } from "./square-pen-BvaZFTz4.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { M as MessageCircle } from "./message-circle-HnpO-44Z.js";
import { M as MapPin } from "./map-pin-DDPhWf0a.js";
import { W as Wallet, C as CreditCard } from "./wallet-DlNIKtI2.js";
import { U as User } from "./user-BINmN2zP.js";
import { P as Pause, a as Play } from "./play-Cd5LxDv9.js";
import { S as Save } from "./save-C6UICAX1.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./format-HuECJiab.js";
const __iconNode$1 = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const Dialog = Root$1;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
function OrdersPage() {
  const {
    orders,
    loading
  } = useOrders();
  const {
    selectedDate
  } = useAdminFilter();
  if (loading || !orders) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin text-orange" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground animate-pulse", children: "Syncing orders..." })
    ] }) });
  }
  const safeOrders = (Array.isArray(orders) ? orders : []).filter((o) => {
    if (!o.date) return false;
    return o.date.split("T")[0] === selectedDate;
  });
  const columns = [{
    id: "new",
    label: "New Orders",
    icon: PackageCheck
  }, {
    id: "confirmed",
    label: "Confirmed",
    icon: CircleCheckBig
  }, {
    id: "dispatched",
    label: "Dispatched",
    icon: Truck
  }, {
    id: "delivered",
    label: "Delivered",
    icon: CircleCheckBig
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-navy", children: "Order Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage order workflow and assign delivery partners." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 min-h-[calc(100vh-220px)]", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/30 rounded-3xl p-4 border border-border flex flex-col min-h-[400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(col.icon, { className: "size-5 text-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg text-navy", children: col.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto bg-white/50 text-navy font-semibold text-xs px-2 py-1 rounded-full", children: safeOrders.filter((o) => o.status === col.id).length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 pr-1", children: [
        safeOrders.filter((o) => o.status === col.id).map((order) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order }, order.uid)),
        safeOrders.filter((o) => o.status === col.id).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 bg-white/40 rounded-2xl border border-dashed border-secondary/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "size-8 mx-auto text-muted-foreground/20 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-[10px] font-bold uppercase tracking-widest", children: [
            "No ",
            col.label
          ] })
        ] })
      ] })
    ] }, col.id)) })
  ] }) });
}
function VoiceNotePlayer({
  url
}) {
  const [playing, setPlaying] = reactExports.useState(false);
  const audioRef = reactExports.useRef(null);
  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 bg-navy/5 rounded-xl p-2 flex items-center gap-3 border border-navy/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggle, className: "size-8 rounded-full bg-navy text-white grid place-items-center flex-shrink-0", children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4 ml-0.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-navy uppercase tracking-wider", children: "Voice Note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-navy/10 rounded-full mt-1 overflow-hidden", children: playing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-orange animate-progress" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, download: true, target: "_blank", className: "size-8 rounded-full bg-white hover:bg-orange hover:text-white grid place-items-center transition-colors shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: url, onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => setPlaying(false), className: "hidden" })
  ] });
}
function OrderCard({
  order
}) {
  const {
    updateOrderStatus,
    assignPartner,
    updateOrderPaymentStatus,
    updateOrderDetails
  } = useOrders();
  const partners = useDeliveryPartners((s) => s.partners);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const handleConfirm = () => {
    updateOrderStatus(order.uid, "confirmed");
    toast.success("Order confirmed!");
    openWhatsApp(order.phone, `Hello ${order.customerName}, your order ${order.id} from Renuka's H2 Batters is confirmed!`);
  };
  const handleDispatch = () => {
    updateOrderStatus(order.uid, "dispatched");
    toast.success("Order dispatched!");
    openWhatsApp(order.phone, `Hello ${order.customerName}, your order ${order.id} has been dispatched and will reach you soon!`);
  };
  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Date unavailable";
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch {
      return "Date unavailable";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-4 shadow-sm border border-border relative group hover:border-orange/30 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-navy text-xs flex items-center gap-2", children: [
          "Order #",
          order.id,
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsEditing(true), className: "opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "size-3 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-tight", children: formatDate(order.date) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-orange text-sm", children: [
          "₹",
          order.totalAmount || 0
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] font-bold ${order.isPaid ? "text-green-600" : "text-orange-600"}`, children: order.isPaid ? "PAID" : "UNPAID" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 border-y border-secondary/50 my-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-navy text-sm mb-1", children: order.customerName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${order.phone}`, className: "flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-2.5" }),
          " Call"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openWhatsApp(order.phone, `Hello ${order.customerName}, about your order ${order.id}...`), className: "flex items-center gap-1 text-[10px] font-bold text-green-600 hover:bg-green-50 px-2 py-0.5 rounded-full border border-green-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-2.5" }),
          " WhatsApp"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[11px] text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-secondary shadow-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-navy text-[10px] uppercase mb-1 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3 text-orange" }),
          "Delivery Address & Location"
        ] }),
        order.address ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight text-navy/70", children: [
          order.address.door && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            order.address.door,
            ", "
          ] }),
          order.address.apartment && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            order.address.apartment,
            ", "
          ] }),
          order.address.floor && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Fl ",
            order.address.floor,
            ", "
          ] }),
          order.address.street
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold", children: "Address missing" }),
        (order.mapsLink || order.mapsLocation) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: order.mapsLink || `https://maps.google.com/?q=${order.mapsLocation}`, target: "_blank", className: "inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition-all text-[9px] uppercase tracking-wider shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-2.5" }),
          " Open Google Maps"
        ] }) })
      ] }),
      order.voiceNoteUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-1 bg-orange/5 border border-orange/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VoiceNotePlayer, { url: order.voiceNoteUrl }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
      (order.items || []).map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] flex justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-navy font-medium", children: [
        it.kg > 0 ? `${it.kg}kg ` : "",
        it.halfKg > 0 ? `${it.halfKg}x0.5kg ` : "",
        it.name
      ] }) }, `${order.uid}-${it.productId}-${idx}`)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 pt-1 border-t border-secondary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          order.paymentMethod === "Cash" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-3 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-3 text-blue-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-navy uppercase", children: order.paymentMethod })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 cursor-pointer select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: order.isPaid, onChange: (e) => updateOrderPaymentStatus(order.uid, e.target.checked, "Admin"), className: "size-3 rounded border-gray-300 text-orange focus:ring-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-navy uppercase", children: "Mark Paid" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      order.status === "new" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleConfirm, className: "w-full bg-navy text-white text-[10px] font-bold py-2.5 rounded-xl hover:bg-orange transition-colors uppercase tracking-wider", children: "Confirm Order" }),
      order.status === "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full text-[10px] font-semibold p-2 rounded-xl border border-border bg-white", value: order.assignedPartnerId || "", onChange: (e) => assignPartner(order.uid, e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Assign Delivery Partner" }),
          (partners || []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.name }, p.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleDispatch, disabled: !order.assignedPartnerId, className: "w-full bg-orange text-navy text-[10px] font-bold py-2.5 rounded-xl hover:bg-orange/80 transition-colors disabled:opacity-50 uppercase tracking-wider", children: "Mark Dispatched" })
      ] }),
      (order.status === "dispatched" || order.status === "delivered") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold text-navy bg-secondary/50 p-2 rounded-xl border border-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-3.5 text-orange" }),
        partners.find((p) => p.id === order.assignedPartnerId)?.name || "Unassigned"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditOrderModal, { isOpen: isEditing, onClose: () => setIsEditing(false), order, onSave: (updates) => {
      updateOrderDetails(order.uid, updates);
      toast.success("Order details updated.");
    } })
  ] });
}
function EditOrderModal({
  isOpen,
  onClose,
  order,
  onSave
}) {
  const [formData, setFormData] = reactExports.useState({
    customerName: order.customerName,
    phone: order.phone,
    apartment: order.address?.apartment || "",
    street: order.address?.street || "",
    door: order.address?.door || "",
    floor: order.address?.floor || "",
    mapsLocation: order.mapsLocation || "",
    paymentMethod: order.paymentMethod
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      customerName: formData.customerName,
      phone: formData.phone,
      address: {
        apartment: formData.apartment,
        street: formData.street,
        door: formData.door,
        floor: formData.floor
      },
      mapsLocation: formData.mapsLocation,
      paymentMethod: formData.paymentMethod
    });
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[425px] rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold text-navy", children: "Edit Order Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "sr-only", children: [
        "Update customer information and delivery address for order ",
        order.id
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: formData.customerName, onChange: (e) => setFormData({
            ...formData,
            customerName: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", value: formData.phone, onChange: (e) => setFormData({
            ...formData,
            phone: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Address Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Door #", value: formData.door, onChange: (e) => setFormData({
            ...formData,
            door: e.target.value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Floor", value: formData.floor, onChange: (e) => setFormData({
            ...formData,
            floor: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Apartment", value: formData.apartment, onChange: (e) => setFormData({
          ...formData,
          apartment: e.target.value
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Street", value: formData.street, onChange: (e) => setFormData({
          ...formData,
          street: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "maps", children: "Maps Location (Lat,Lng)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "maps", value: formData.mapsLocation, onChange: (e) => setFormData({
          ...formData,
          mapsLocation: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment", children: "Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: formData.paymentMethod, onValueChange: (v) => setFormData({
          ...formData,
          paymentMethod: v
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "payment", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Cash", children: "Cash" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "UPI", children: "UPI" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 px-4 py-2 rounded-xl border border-border font-bold text-navy hover:bg-secondary", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex-1 bg-navy text-white px-4 py-2 rounded-xl font-bold hover:bg-orange transition-colors flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
          " Save Changes"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  OrdersPage as component
};
