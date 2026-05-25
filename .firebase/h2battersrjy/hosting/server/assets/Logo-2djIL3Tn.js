import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { c as useSiteSettings } from "./router-Bieu8wEH.js";
import { g as getImageKitUrl } from "./imagekit-0b8ZklfH.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
function Logo({ className, variant = "light", size = "md" }) {
  const { logoUrl: storeLogoUrl } = useSiteSettings();
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setError(false);
  }, [storeLogoUrl]);
  const sizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-16",
    xl: "size-24"
  };
  const logoUrl = reactExports.useMemo(() => {
    if (!storeLogoUrl) return null;
    return getImageKitUrl(storeLogoUrl, size === "sm" ? 100 : 300) + `?v=${(/* @__PURE__ */ new Date()).setMinutes(0, 0, 0)}`;
  }, [storeLogoUrl, size]);
  if (error || !logoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "rounded-xl bg-orange grid place-items-center font-display font-black text-navy shadow-lg shadow-orange/20 select-none",
      sizes[size],
      size === "sm" ? "text-xs" : size === "md" ? "text-lg" : "text-3xl",
      className
    ), children: "H2" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("relative group shrink-0", sizes[size], className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: logoUrl,
      alt: "H2 Batters",
      className: "w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300",
      onError: () => setError(true)
    }
  ) });
}
export {
  Logo as L
};
