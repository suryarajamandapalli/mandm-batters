import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { c as cn } from "./utils-Bz4m9VPB.js";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const openWhatsApp = (phone, message) => {
  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }
  if (cleanPhone.length < 10) {
    console.error("Invalid phone number for WhatsApp:", phone);
    return;
  }
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "whatsapp_window");
};
export {
  Input as I,
  openWhatsApp as o
};
