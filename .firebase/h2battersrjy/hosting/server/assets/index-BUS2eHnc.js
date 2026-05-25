import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { L as Link, c as useSiteSettings, t as toast, a as useNavigate } from "./router-Bieu8wEH.js";
import { u as useCart, a as cartCount, b as cartWeight, S as ShoppingBag, c as cartTotal, l as lineTotal } from "./cart-CEmVhoHp.js";
import { L as Logo } from "./Logo-2djIL3Tn.js";
import { X } from "./x-Cj-DygLU.js";
import { M as Menu } from "./menu-Cq-0K_jZ.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DdJfWClK.js";
import { g as getImageKitUrl } from "./imagekit-0b8ZklfH.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { A as ArrowRight } from "./arrow-right-Df2n4xrG.js";
import { u as useProductsStore } from "./products-DhKdDw1-.js";
import { P as Plus } from "./plus-Ci062b-n.js";
import { C as Clock } from "./clock-_Z5BVC6k.js";
import { S as Star, M as Mail, I as Instagram, F as Facebook, Y as Youtube, T as Twitter } from "./youtube-C55lrTw0.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { M as MapPin } from "./map-pin-DDPhWf0a.js";
import { M as MessageCircle } from "./message-circle-HnpO-44Z.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-Bz4m9VPB.js";
const __iconNode$8 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$8);
const __iconNode$7 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode$7);
const __iconNode$6 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$6);
const __iconNode$5 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = children.props?.ref ?? children?.ref;
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      ref.current?.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender?.();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && safeToRemove?.();
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const links = [
  { href: "/#menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];
function Navbar() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const count = cartCount(items);
  const totalWeight = cartWeight(items);
  const isMinMet = totalWeight >= 1;
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `font-display font-black text-lg md:text-xl tracking-tight ${scrolled ? "text-navy" : "text-white"}`,
                  children: "H2 Batters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black ${scrolled ? "text-muted-foreground" : "text-white/60"}`,
                  children: "Healthy & Homemade"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-8", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              className: `text-sm font-medium transition-colors hover:text-orange ${scrolled ? "text-foreground" : "text-white"}`,
              children: l.label
            },
            l.href
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: open,
                className: `relative grid place-items-center size-10 rounded-full transition-all duration-500 ${isMinMet ? "bg-orange text-navy scale-110 shadow-[0_0_20px_rgba(255,122,26,0.4)] ring-4 ring-orange/20 animate-bounce-subtle" : scrolled ? "bg-secondary text-foreground hover:bg-navy hover:text-white" : "bg-white/15 text-white hover:bg-orange hover:text-navy backdrop-blur"}`,
                "aria-label": "Open cart",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-5" }),
                  count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -top-1 -right-1 text-navy text-[10px] font-black size-5 rounded-full grid place-items-center transition-colors ${isMinMet ? "bg-white" : "bg-orange"}`, children: count })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setMobileOpen((v) => !v),
                className: `md:hidden grid place-items-center size-10 rounded-full ${scrolled ? "bg-secondary text-foreground" : "bg-white/15 text-white backdrop-blur"}`,
                "aria-label": "Menu",
                children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "md:hidden overflow-hidden bg-background border-t border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-px py-4 flex flex-col gap-1", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: l.href,
                onClick: () => setMobileOpen(false),
                className: "px-2 py-3 rounded-lg hover:bg-secondary text-foreground font-medium",
                children: l.label
              },
              l.href
            )) })
          }
        ) })
      ]
    }
  );
}
function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
function Hero() {
  const { heroVideoDesktop, heroVideoMobile, heroTagline, heroHeading, heroButtonText } = useSiteSettings();
  const desktopYoutubeId = getYouTubeId(heroVideoDesktop);
  const mobileYoutubeId = getYouTubeId(heroVideoMobile);
  const desktopEmbedUrl = desktopYoutubeId ? `https://www.youtube.com/embed/${desktopYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${desktopYoutubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1` : null;
  const mobileEmbedUrl = mobileYoutubeId ? `https://www.youtube.com/embed/${mobileYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${mobileYoutubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "home",
      className: "relative h-[100svh] w-full overflow-hidden bg-navy text-white flex items-center justify-center text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute inset-0", children: desktopEmbedUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              src: desktopEmbedUrl,
              className: "absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none",
              style: { border: "none", transform: "scale(1.2)", width: "100vw", height: "100vh" },
              allow: "autoplay; encrypted-media",
              title: "Hero desktop video"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              className: "absolute inset-0 w-full h-full object-cover opacity-60",
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              poster: getImageKitUrl("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1600&auto=format&fit=crop", 1600),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: heroVideoDesktop, type: "video/mp4" })
            },
            heroVideoDesktop
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "block md:hidden absolute inset-0", children: mobileEmbedUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              src: mobileEmbedUrl,
              className: "absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none",
              style: { border: "none", transform: "scale(1.5)", width: "100vw", height: "100vh" },
              allow: "autoplay; encrypted-media",
              title: "Hero mobile video"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              className: "absolute inset-0 w-full h-full object-cover opacity-60",
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              poster: getImageKitUrl("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1600&auto=format&fit=crop", 1600),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: heroVideoMobile || heroVideoDesktop, type: "video/mp4" })
            },
            heroVideoMobile || heroVideoDesktop
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.15),transparent_70%)] z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-navy via-navy/80 to-transparent z-10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container-px mx-auto max-w-5xl z-20 flex flex-col items-center pt-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5 },
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs uppercase tracking-[0.25em] font-black text-orange mb-8 shadow-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 fill-orange" }),
                "Authentic · Traditional · Fresh"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8, delay: 0.1 },
              className: "font-display font-black fluid-h1 text-balance leading-[0.9] tracking-tighter",
              children: heroHeading || "Renuka's H2 Batters"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.25 },
              className: "mt-8 max-w-2xl text-lg md:text-2xl text-white/80 text-balance font-medium leading-relaxed px-4",
              children: heroTagline || "Fresh, hand-crafted idli & dosa batter — fermented to perfection and delivered to your door each morning."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.4 },
              className: "mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "#menu",
                    className: "group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-orange text-navy px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange/30 hover:shadow-orange/50 hover:scale-105 active:scale-95 transition-all",
                    children: [
                      heroButtonText || "Order Now",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5 group-hover:translate-x-1 transition-transform" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#about",
                    className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-md",
                    children: "Our Story"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.6 },
              className: "mt-20 grid grid-cols-3 gap-8 md:gap-24 pt-12 border-t border-white/10 w-full",
              children: [
                { v: "10K+", l: "Happy homes" },
                { v: "100%", l: "Natural" },
                { v: "Daily", l: "Fresh" }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-2xl md:text-4xl text-orange leading-none mb-2", children: s.v }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-xs font-black uppercase tracking-widest text-white/30 whitespace-nowrap", children: s.l })
              ] }, s.l))
            }
          )
        ] })
      ]
    }
  );
}
function TodayMenu() {
  const todayMenu = useSiteSettings((s) => s.todayMenu);
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  if (!todayMenu || todayMenu.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "menu", className: "py-12 md:py-20 bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3", children: "Today's Menu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl md:text-5xl text-navy", children: "Freshly prepared today" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 md:gap-8 max-w-4xl mx-auto", children: todayMenu.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          onClick: () => setSelectedImage(item.image),
          className: "relative aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden group cursor-zoom-in shadow-xl shadow-navy/5 border border-border bg-secondary/30 transition-all hover:shadow-2xl hover:shadow-orange/10 hover:-translate-y-1 active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getImageKitUrl(item.image, 600),
                alt: "Today's Menu Item",
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "size-5" }) }) })
          ]
        },
        item.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedImage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10",
        onClick: () => setSelectedImage(null),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "absolute top-6 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[110]",
              onClick: () => setSelectedImage(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-6" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.9, opacity: 0 },
              className: "relative max-w-full max-h-full rounded-3xl overflow-hidden shadow-2xl",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getImageKitUrl(selectedImage, 1200),
                  alt: "Full Menu Preview",
                  className: "w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl"
                }
              )
            }
          )
        ]
      }
    ) })
  ] });
}
function ProductCard({ p, i }) {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const addKg = useCart((s) => s.addKg);
  const addHalfKg = useCart((s) => s.addHalfKg);
  const open = useCart((s) => s.open);
  const cartItem = items.find((it) => it.productId === p.id);
  const kg = cartItem?.kg ?? 0;
  const halfKg = cartItem?.halfKg ?? 0;
  const total = kg * p.pricePerKg + halfKg * p.pricePerHalfKg;
  const totalKg = kg + halfKg * 0.5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      layout: true,
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: i * 0.05 },
      className: `group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/50 hover:border-orange/30 shadow-sm hover:shadow-2xl hover:shadow-navy/5 hover:-translate-y-1.5 transition-all duration-300 ${!p.inStock || p.stockQuantity <= 0 ? "opacity-75" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getImageKitUrl(p.image, 600),
              alt: p.name,
              className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 bg-white/90 backdrop-blur text-navy text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-navy/5", children: p.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 bg-orange text-navy shadow-lg px-3 py-1.5 rounded-xl border border-white/20 flex flex-col items-center leading-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-black text-base flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold mt-0.5", children: "₹" }),
            p.pricePerKg,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-black ml-0.5 opacity-60", children: "/KG" })
          ] }) }),
          (!p.inStock || p.stockQuantity <= 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-navy/60 backdrop-blur-[2px] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-xl rotate-[-5deg] shadow-lg border-2 border-white/10 uppercase tracking-widest", children: "OUT OF STOCK" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 md:p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-base md:text-lg text-navy truncate flex-1 mr-2", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${p.stockQuantity < 5 ? "text-red-500 bg-red-50 border-red-100" : "text-green-600 bg-green-50 border-green-100"}`, children: p.stockQuantity > 0 ? `${p.stockQuantity} Left` : "Sold Out" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QtyControl,
              {
                label: "1 KG",
                value: kg,
                disabled: !p.inStock || p.stockQuantity <= 0,
                onMinus: () => setQty(p.id, Math.max(0, kg - 1), halfKg),
                onPlus: () => {
                  addKg(p);
                  toast.success(`1 KG ${p.name} added`);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              QtyControl,
              {
                label: "½ KG",
                value: halfKg,
                disabled: !p.inStock || p.stockQuantity <= 0,
                onMinus: () => setQty(p.id, kg, Math.max(0, halfKg - 1)),
                onPlus: () => {
                  addHalfKg(p);
                  toast.success(`½ KG ${p.name} added`);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-secondary flex flex-col gap-2", children: [
            totalKg > 0 && totalKg < 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-orange text-[9px] font-black uppercase tracking-[0.1em] text-center animate-pulse", children: "Min. 1 KG Required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[8px] uppercase tracking-widest text-muted-foreground font-black leading-none mb-1", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-black text-xl text-navy flex items-baseline gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange text-xs", children: "₹" }),
                  total || 0
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  disabled: totalKg < 1 || !p.inStock || p.stockQuantity <= 0,
                  onClick: open,
                  className: `flex-1 h-10 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all active:scale-95 shadow-md ${totalKg >= 1 ? "bg-orange text-navy shadow-orange/10" : "bg-navy text-white shadow-navy/5 opacity-50 grayscale cursor-not-allowed"}`,
                  children: totalKg < 1 && totalKg > 0 ? "Add more" : "Checkout"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function QtyControl({
  label,
  value,
  disabled,
  onMinus,
  onPlus
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-secondary/40 rounded-xl p-1 flex items-center justify-between transition-opacity ${disabled ? "opacity-30 pointer-events-none" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onMinus,
        disabled: value === 0 || disabled,
        className: "size-8 grid place-items-center rounded-lg bg-white text-navy shadow-sm hover:bg-navy hover:text-white disabled:opacity-30 transition-all active:scale-90",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center leading-none px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-sm text-navy", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[7px] font-black uppercase tracking-widest text-muted-foreground mt-0.5", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onPlus,
        disabled,
        className: "size-8 grid place-items-center rounded-lg bg-orange text-navy shadow-sm hover:shadow-orange/20 transition-all active:scale-90 disabled:opacity-30",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" })
      }
    )
  ] });
}
function Products() {
  const products = useProductsStore((s) => s.products);
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const categories = reactExports.useMemo(() => {
    const cats = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
    return cats;
  }, [products]);
  const groupedProducts = reactExports.useMemo(() => {
    const groups = {};
    const catsToProcess = activeCategory === "All" ? categories.filter((c) => c !== "All") : [activeCategory];
    catsToProcess.forEach((cat) => {
      groups[cat] = products.filter((p) => p.category === cat);
    });
    return groups;
  }, [products, activeCategory, categories]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "products", className: "py-12 md:py-20 bg-secondary/30 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-orange font-black px-3 py-1 rounded-full bg-orange/10 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3 fill-orange" }),
          "Our Batters"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-3xl md:text-5xl text-navy text-balance leading-tight", children: [
          "Freshly ground, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          " fermented for you."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActiveCategory(cat),
          className: `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-navy text-white shadow-lg shadow-navy/20" : "bg-white text-navy hover:bg-orange/10 border border-border"}`,
          children: cat
        },
        cat
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: Object.entries(groupedProducts).map(([category, catProducts]) => catProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-black text-xl md:text-3xl text-navy whitespace-nowrap uppercase tracking-tight", children: category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-navy/5 flex-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6", children: catProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { p, i }, p.id)) })
        ]
      },
      category
    )) }) }),
    Object.values(groupedProducts).every((g) => g.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 text-center py-16 bg-white/50 rounded-3xl border border-dashed border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "size-10 mx-auto text-muted-foreground/20 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-navy", children: "No products found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try a different category." })
    ] })
  ] }) });
}
const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    text: "No preservatives, no shortcuts. Just rice, urad dal & patience."
  },
  {
    icon: Clock,
    title: "Fermented Overnight",
    text: "Slow, traditional fermentation for that perfect tangy taste."
  },
  {
    icon: Heart,
    title: "Made With Love",
    text: "A family recipe passed down three generations."
  }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-12 md:py-20 bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-20 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-secondary shadow-2xl shadow-navy/5 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getImageKitUrl("https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1000&auto=format&fit=crop", 800),
              alt: "Traditional batter preparation",
              className: "w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.3 },
              className: "hidden md:block absolute -bottom-6 -right-6 bg-orange text-navy p-8 rounded-[2rem] max-w-[240px] shadow-2xl shadow-orange/20 border-4 border-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-4xl", children: "3 Gen." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase tracking-widest mt-1 opacity-80 leading-tight", children: "Of perfecting our secret recipe" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-4", children: "Our Heritage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl md:text-5xl text-navy text-balance leading-[1.1]", children: "The taste you grew up with — delivered fresh." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground text-base md:text-lg leading-relaxed", children: "What started in Renuka's home kitchen is now a small family-run obsession. We stone-grind premium urad dal and idli rice every single day, ferment it slowly overnight, and hand-pack it before sunrise." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-base md:text-lg leading-relaxed", children: "No preservatives. No additives. Just real batter, the way it's supposed to taste." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-3 gap-3 md:gap-4", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "p-5 rounded-2xl bg-secondary/30 border border-border/50 group hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-orange grid place-items-center text-navy shadow-lg shadow-orange/20 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display font-black text-navy text-sm uppercase tracking-tight", children: f.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[10px] md:text-xs text-muted-foreground font-medium leading-relaxed", children: f.text })
              ]
            },
            f.title
          )) })
        ]
      }
    )
  ] }) });
}
function Reviews() {
  const reviews = useSiteSettings((s) => s.reviews);
  if (!reviews || reviews.length === 0) return null;
  const slides = [...reviews, ...reviews];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "reviews", className: "py-12 md:py-20 bg-navy text-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,26,0.1),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container-px mx-auto max-w-7xl mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "max-w-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3", children: "Customer Love" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl md:text-6xl text-balance leading-none tracking-tight", children: "Loved by 10,000+ homes." })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex overflow-hidden w-full group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 md:gap-6 py-4 animate-scroll whitespace-nowrap px-4 hover:[animation-play-state:paused]", children: slides.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.figure,
      {
        className: "w-[280px] md:w-[380px] bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shrink-0 transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-2xl shadow-black/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "size-6 md:size-8 text-orange opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `size-3 md:size-4 ${idx < r.rating ? "fill-orange text-orange" : "text-white/10"}`
              },
              idx
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-white/90 text-sm md:text-base leading-relaxed whitespace-normal italic font-medium", children: [
            '"',
            r.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 pt-6 border-t border-white/10 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-orange/20 grid place-items-center text-orange font-black text-xs uppercase tracking-widest border border-orange/10", children: r.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-sm uppercase tracking-tight", children: r.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-white/40 font-bold uppercase tracking-widest", children: r.city })
            ] })
          ] })
        ]
      },
      `${r.id}-${i}`
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }
      ` })
  ] });
}
function Contact() {
  const [sending, setSending] = reactExports.useState(false);
  const { contactPhone, contactEmail, contactAddress } = useSiteSettings();
  const addEnquiry = useSiteSettings((s) => s.addEnquiry);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    try {
      addEnquiry({
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        message: form.get("message")
      });
      toast.success("Message sent! We'll get back to you soon.");
      e.target.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "py-12 md:py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl grid lg:grid-cols-5 gap-10 lg:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "lg:col-span-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3", children: "Get In Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl md:text-5xl text-navy text-balance leading-tight", children: "We'd love to hear from you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground leading-relaxed text-sm md:text-base", children: "Questions about our batters, bulk orders, or feedback — drop us a message and we'll get back within a few hours." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-3", children: [
            { icon: Phone, label: "Call us", value: contactPhone },
            { icon: Mail, label: "Email", value: contactEmail },
            { icon: MapPin, label: "Address", value: contactAddress }
          ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: 0.2 + i * 0.1 },
              className: "flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:bg-secondary/50 hover:border-border transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-secondary grid place-items-center text-navy shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-navy", children: item.value })
                ] })
              ]
            },
            item.label
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay: 0.2 },
        onSubmit: handleSubmit,
        className: "lg:col-span-3 bg-secondary/30 rounded-[2.5rem] p-6 md:p-10 border border-border shadow-2xl shadow-navy/5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", name: "name", type: "text", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", name: "phone", type: "tel", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-2", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                name: "message",
                required: true,
                rows: 5,
                className: "w-full bg-white border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange/10 focus:border-orange/50 resize-none transition-all placeholder:text-muted-foreground/30",
                placeholder: "Tell us how we can help..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: sending,
              className: "mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-navy/20 hover:bg-orange hover:text-navy hover:shadow-orange/20 transition-all disabled:opacity-60 active:scale-95",
              children: [
                sending ? "Sending..." : "Send Message",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
              ]
            }
          )
        ]
      }
    )
  ] }) });
}
function Field({
  label,
  name,
  type,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        name,
        type,
        required,
        className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
      }
    )
  ] });
}
function Footer() {
  const {
    contactPhone,
    contactEmail,
    contactAddress,
    footerDescription,
    footerCopyright,
    mapsLink,
    mapsLabel,
    socialLinks
  } = useSiteSettings();
  const socials = [
    { key: "instagram", icon: Instagram, href: socialLinks?.instagram, label: "Instagram" },
    { key: "facebook", icon: Facebook, href: socialLinks?.facebook, label: "Facebook" },
    { key: "whatsapp", icon: MessageCircle, href: socialLinks?.whatsapp ? `https://wa.me/${(socialLinks.whatsapp || "").replace(/\D/g, "")}` : "", label: "WhatsApp" },
    { key: "youtube", icon: Youtube, href: socialLinks?.youtube, label: "YouTube" },
    { key: "twitter", icon: Twitter, href: socialLinks?.twitter, label: "Twitter / X" }
  ].filter((s) => s.href);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-ink text-white/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl py-12 md:py-16 grid md:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-black text-xl text-white tracking-tight", children: "H2 Batters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-white/40 font-black", children: "Healthy & Homemade" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-sm text-white/50 leading-relaxed", children: footerDescription || "Stone-ground, naturally fermented batter delivered to your door every morning." }),
        socials.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3 flex-wrap", children: socials.map(({ key, icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": label,
            className: "size-10 grid place-items-center rounded-full bg-white/5 hover:bg-orange hover:text-navy transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" })
          },
          key
        )) }),
        mapsLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: mapsLink,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-5 inline-flex items-center gap-2 text-xs text-orange hover:underline font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
              mapsLabel || "Find us on Maps"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-orange font-semibold", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm", children: ["Home", "Products", "About", "Reviews", "Contact"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `#${l.toLowerCase()}`,
            className: "hover:text-orange transition-colors",
            children: l
          }
        ) }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-orange font-semibold", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm", children: [
          contactPhone && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3.5 text-orange shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${contactPhone}`, className: "hover:text-orange transition-colors", children: contactPhone })
          ] }),
          contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-3.5 text-orange shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${contactEmail}`, className: "hover:text-orange transition-colors", children: contactEmail })
          ] }),
          contactAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 text-orange shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: contactAddress })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-px mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        footerCopyright || "Renuka's H2 Batters. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 font-medium text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", className: "hover:text-orange transition-colors", children: "Admin Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/delivery", className: "hover:text-orange transition-colors", children: "Delivery Login" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Made by ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange font-semibold", children: "WEBDEN" })
      ] })
    ] }) })
  ] });
}
function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const total = cartTotal(items);
  const totalWeight = cartWeight(items);
  const isMinWeightMet = totalWeight >= 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: close,
        className: "fixed inset-0 z-[10001] bg-navy/80 backdrop-blur-md"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.aside,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: "fixed right-0 top-0 bottom-0 z-[10002] w-full sm:w-[480px] bg-background shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-orange grid place-items-center text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg text-navy", children: "Your Cart" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  items.length,
                  " ",
                  items.length === 1 ? "item" : "items",
                  " · ",
                  totalWeight,
                  " KG"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: close,
                className: "size-9 grid place-items-center rounded-full hover:bg-secondary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full grid place-items-center text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-12 mx-auto opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "Your cart is empty" })
          ] }) }) : items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-secondary/50 rounded-2xl p-3 flex gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: it.image,
                    alt: it.name,
                    className: "size-20 rounded-xl object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-navy text-sm leading-tight", children: it.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => remove(it.productId),
                        className: "text-muted-foreground hover:text-destructive text-xs",
                        children: "Remove"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      QtyMini,
                      {
                        label: "KG",
                        value: it.kg,
                        onChange: (v) => setQty(it.productId, v, it.halfKg)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      QtyMini,
                      {
                        label: "½ KG",
                        value: it.halfKg,
                        onChange: (v) => setQty(it.productId, it.kg, v)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                      "₹",
                      it.pricePerKg,
                      "/KG · ₹",
                      it.pricePerHalfKg,
                      "/½KG"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-navy", children: [
                      "₹",
                      lineTotal(it)
                    ] })
                  ] })
                ] })
              ]
            },
            it.productId
          )) }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-5 bg-background space-y-4", children: [
            !isMinWeightMet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-orange/10 border border-orange/20 rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-orange animate-pulse", children: "Minimum order weight is 1 KG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground mt-0.5", children: [
                "Current weight: ",
                totalWeight,
                " KG. Please add more to proceed."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-3xl text-navy", children: [
                "₹",
                total
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                disabled: !isMinWeightMet,
                onClick: () => {
                  close();
                  navigate({ to: "/checkout" });
                },
                className: `w-full py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all group ${isMinWeightMet ? "bg-navy text-white hover:bg-orange hover:text-navy shadow-xl shadow-navy/20" : "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"}`,
                children: [
                  isMinWeightMet ? "Proceed to Checkout" : "Minimum 1 KG Required",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover:translate-x-1 transition-transform" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function QtyMini({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-lg flex items-center justify-between p-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onChange(Math.max(0, value - 1)),
        className: "size-7 grid place-items-center rounded-md hover:bg-secondary",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center leading-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm text-navy", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onChange(value + 1),
        className: "size-7 grid place-items-center rounded-md bg-orange text-navy",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" })
      }
    )
  ] });
}
function FloatingCart() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const isOpen = useCart((s) => s.isOpen);
  const count = cartCount(items);
  const total = cartTotal(items);
  const totalWeight = cartWeight(items);
  const isMinMet = totalWeight >= 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: count > 0 && !isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { y: 120, opacity: 0, scale: 0.9 },
      animate: { y: 0, opacity: 1, scale: 1 },
      exit: { y: 120, opacity: 0, scale: 0.9 },
      transition: { type: "spring", damping: 25, stiffness: 400 },
      className: "fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[480px] z-[9999]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-orange/20 blur-3xl -z-10 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 p-2.5 flex items-center justify-between gap-3 group/cart", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pl-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-12 rounded-2xl bg-orange grid place-items-center text-navy shadow-lg shadow-orange/20 transition-transform ${isMinMet ? "animate-bounce-subtle" : "scale-95 grayscale"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  className: "absolute -top-1.5 -right-1.5 bg-white text-navy text-[10px] font-black size-5 rounded-full grid place-items-center border-2 border-navy shadow-lg",
                  children: count
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white font-display font-black text-xl leading-none flex items-center gap-1.5", children: [
                "₹",
                total
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/40 text-[10px] font-black uppercase tracking-widest mt-1", children: [
                totalWeight,
                " KG · ",
                count,
                " Items"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: open,
              className: `h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95 overflow-hidden relative ${isMinMet ? "bg-orange text-navy shadow-xl shadow-orange/20" : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"}`,
              children: [
                isMinMet && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500 skew-x-12" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative flex items-center gap-2", children: isMinMet ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "View Cart",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover/cart:translate-x-1 transition-transform" })
                ] }) : "Add Min. 1 KG" })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TodayMenu, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Products, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reviews, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingCart, {})
  ] });
}
export {
  Index as component
};
