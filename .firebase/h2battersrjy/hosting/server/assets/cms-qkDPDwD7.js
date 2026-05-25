import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { c as useSiteSettings, t as toast } from "./router-Bieu8wEH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { M as MediaUpload, L as Link } from "./MediaUpload-BCulELl0.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { S as Save } from "./save-C6UICAX1.js";
import { T as Trash2 } from "./trash-2-ISN0WQ3x.js";
import { P as Plus } from "./plus-Ci062b-n.js";
import { S as Star, M as Mail, I as Instagram, F as Facebook, Y as Youtube, T as Twitter } from "./youtube-C55lrTw0.js";
import { P as Phone } from "./phone-Dm_z08zP.js";
import { M as MapPin } from "./map-pin-DDPhWf0a.js";
import { M as MessageCircle } from "./message-circle-HnpO-44Z.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./x-Cj-DygLU.js";
import "./circle-check-big-D4WEICFP.js";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
];
const PanelsTopLeft = createLucideIcon("panels-top-left", __iconNode);
function CMSPage() {
  const settings = useSiteSettings();
  const [heroHeadingInput, setHeroHeadingInput] = reactExports.useState("");
  const [heroTaglineInput, setHeroTaglineInput] = reactExports.useState("");
  const [heroButtonInput, setHeroButtonInput] = reactExports.useState("");
  const [newBannerImage, setNewBannerImage] = reactExports.useState("");
  const [footerDesc, setFooterDesc] = reactExports.useState("");
  const [footerCopy, setFooterCopy] = reactExports.useState("");
  const [mapsLinkInput, setMapsLinkInput] = reactExports.useState("");
  const [mapsLabelInput, setMapsLabelInput] = reactExports.useState("");
  const [socialInputs, setSocialInputs] = reactExports.useState({});
  if (settings.loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin text-orange" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground animate-pulse", children: "Fetching site content..." })
    ] }) });
  }
  const handleSaveHeroText = () => {
    if (heroHeadingInput) settings.updateSetting("heroHeading", heroHeadingInput);
    if (heroTaglineInput) settings.updateSetting("heroTagline", heroTaglineInput);
    if (heroButtonInput) settings.updateSetting("heroButtonText", heroButtonInput);
    toast.success("✅ Hero section updated! Changes are now live on the website.");
  };
  const handleSaveFooter = () => {
    if (footerDesc) settings.updateSetting("footerDescription", footerDesc);
    if (footerCopy) settings.updateSetting("footerCopyright", footerCopy);
    if (mapsLinkInput) {
      let url = mapsLinkInput.trim();
      if (url && !url.startsWith("http")) {
        url = "https://" + url;
      }
      settings.updateSetting("mapsLink", url);
    }
    if (mapsLabelInput) settings.updateSetting("mapsLabel", mapsLabelInput);
    Object.entries(socialInputs).forEach(([key, value]) => {
      settings.updateSocialLink(key, value);
    });
    toast.success("✅ Footer settings updated!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10 max-w-5xl pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-navy", children: "Website Editor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm md:text-base", children: "Updates reflect live on the website instantly." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className: "size-5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Hero Section" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSaveHeroText, className: "bg-orange text-navy px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange/80 transition-colors flex items-center gap-2 shadow-lg shadow-orange/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
          " Save Changes"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 grid md:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-black uppercase tracking-widest text-navy/40 block mb-2", children: "Main Heading" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.heroHeading, onChange: (e) => setHeroHeadingInput(e.target.value), placeholder: "e.g. Renuka's H2 Batters", className: "w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-black uppercase tracking-widest text-navy/40 block mb-2", children: "Sub-heading / Tagline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: settings.heroTagline, onChange: (e) => setHeroTaglineInput(e.target.value), rows: 3, className: "w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all resize-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-black uppercase tracking-widest text-navy/40 block mb-2", children: "Button Text" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.heroButtonText, onChange: (e) => setHeroButtonInput(e.target.value), className: "w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Desktop Video", mediaType: "video", value: settings.heroVideoDesktop, onChange: (url) => settings.updateSetting("heroVideoDesktop", url), folder: "hero" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-center font-black uppercase tracking-widest text-muted-foreground", children: "16:9 Landscape" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Mobile Video", mediaType: "video", value: settings.heroVideoMobile, onChange: (url) => settings.updateSetting("heroVideoMobile", url), folder: "hero" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-center font-black uppercase tracking-widest text-muted-foreground", children: "9:16 Portrait" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-orange/5 rounded-2xl border border-dashed border-orange/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-navy/60 leading-relaxed font-bold italic", children: "💡 **Pro Tip**: Use a landscape video for Desktop and a portrait video for Mobile. This ensures your hero section remains cinematic and immersive on all screens." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-5 text-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Global Branding" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Official Logo (Platform Wide)", value: settings.logoUrl, onChange: (url) => settings.updateSetting("logoUrl", url), folder: "branding" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: [
              "💡 This logo appears in the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navbar, Admin Panel, Delivery App," }),
              " and all ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Login Screens" }),
              ". Use a high-resolution PNG with transparency for best results."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-8 bg-navy/5 rounded-[2rem] border border-dashed border-navy/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-widest text-navy/40 mb-6", children: "Logo Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-8 rounded-2xl shadow-xl shadow-navy/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: settings.logoUrl, alt: "Logo Preview", className: "h-24 w-auto object-contain" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 pt-10 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Browser Favicon / App Icon", value: settings.faviconUrl, onChange: (url) => settings.updateSetting("faviconUrl", url), folder: "branding" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: [
              "💡 This icon appears in the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Browser Tab, Mobile Shortcuts," }),
              " and ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "PWA Home Screen" }),
              ". A square 512x512px image is recommended."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-8 bg-orange/5 rounded-[2rem] border border-dashed border-orange/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase tracking-widest text-orange/60 mb-6", children: "Favicon Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 bg-white rounded-xl shadow-lg shadow-orange/10 overflow-hidden grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: settings.faviconUrl, alt: "Favicon Preview", className: "size-12 object-contain" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest", children: "Tab Preview Rendering" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Today's Menu Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 bg-white/50 rounded-full border border-border", children: [
          settings.todayMenu?.length || 0,
          " / 3 Items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-6", children: [...Array(3)].map((_, i) => {
          const item = settings.todayMenu?.[i];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-2xl border-2 border-dashed border-border bg-secondary/20 overflow-hidden relative group", children: item ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, className: "w-full h-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => settings.removeTodayMenu(item.id), className: "absolute top-2 right-2 size-8 rounded-xl bg-red-500 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "size-full flex flex-col items-center justify-center p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-8 text-muted-foreground/30 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest leading-tight", children: [
                "Slot ",
                i + 1,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Empty"
              ] })
            ] }) }),
            !item && /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: `Upload Menu ${i + 1}`, value: "", onChange: (url) => settings.addTodayMenu({
              id: Math.random().toString(36).substr(2, 9),
              image: url
            }), folder: "menu" })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground bg-orange/5 border border-orange/20 rounded-xl px-4 py-3", children: "💡 **Menu Strategy**: These images should be **Portrait (3:4)** ratio for a clean mobile display. Only 3 slots are available to maintain a high-quality, focused UI." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-5 text-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Customer Reviews" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: (settings.reviews || []).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-secondary/20 rounded-2xl border border-border relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `size-3 ${i < (r.rating || 0) ? "fill-orange text-orange" : "text-muted-foreground/30"}` }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-navy italic mb-2", children: [
            '"',
            r.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-navy", children: [
            r.name,
            ", ",
            r.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => settings.removeReview(r.id), className: "absolute top-4 right-4 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
        ] }, r.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "bg-secondary/30 p-6 rounded-2xl border border-border grid grid-cols-2 md:grid-cols-4 gap-4", onSubmit: (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          settings.addReview({
            id: Math.random().toString(36).substr(2, 9),
            name: form.get("name"),
            city: form.get("city"),
            rating: Number(form.get("rating")),
            text: form.get("text")
          });
          e.target.reset();
          toast.success("Review added!");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "text", required: true, placeholder: "Review Text", rows: 2, className: "w-full border rounded-xl p-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", required: true, placeholder: "Customer Name", className: "flex-1 border rounded-xl p-2.5 text-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "city", required: true, placeholder: "City", className: "flex-1 border rounded-xl p-2.5 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex flex-col justify-between col-span-2 md:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold uppercase text-muted-foreground", children: "Rating" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "rating", className: "w-full border rounded-xl p-2.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "5", children: "5 Stars" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "4", children: "4 Stars" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "3 Stars" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-orange transition-colors flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
              " Add Review"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-5 text-orange" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Contact Details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        settings.updateSetting("contactPhone", form.get("phone"));
        settings.updateSetting("contactEmail", form.get("email"));
        settings.updateSetting("contactAddress", form.get("address"));
        toast.success("Contact details updated!");
      }, className: "p-6 grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "phone", defaultValue: settings.contactPhone, className: "w-full border rounded-xl p-3 pl-10 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "email", defaultValue: settings.contactEmail, className: "w-full border rounded-xl p-3 pl-10 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "address", defaultValue: settings.contactAddress, className: "w-full border rounded-xl p-3 pl-10 text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-navy text-white px-6 rounded-xl font-bold hover:bg-orange transition-colors", children: "Save" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Footer Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSaveFooter, className: "bg-navy text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange transition-colors flex items-center gap-2 shadow-lg shadow-navy/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
          " Update Footer"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-navy uppercase tracking-widest mb-4", children: "Footer Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Footer Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: settings.footerDescription, onChange: (e) => setFooterDesc(e.target.value), rows: 3, placeholder: "Short description shown below the logo", className: "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Copyright Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.footerCopyright, onChange: (e) => setFooterCopy(e.target.value), placeholder: "e.g. Renuka's H2 Batters. All rights reserved.", className: "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 text-orange" }),
            " Office Location & Maps"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Maps Link Label" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.mapsLabel, onChange: (e) => setMapsLabelInput(e.target.value), placeholder: "e.g. Visit Our Kitchen", className: "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block mb-1.5", children: "Google Maps Link" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.mapsLink, onChange: (e) => setMapsLinkInput(e.target.value), placeholder: "https://maps.google.com/...", className: "flex-1 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none" }),
                settings.mapsLink && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: settings.mapsLink, target: "_blank", className: "bg-secondary px-4 rounded-xl text-xs font-bold text-navy hover:bg-orange hover:text-white transition-colors flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
                  " Preview"
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "size-4 text-orange" }),
            " Social Media Links"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-4", children: [{
            key: "instagram",
            icon: Instagram,
            label: "Instagram",
            placeholder: "https://instagram.com/...",
            color: "text-pink-500"
          }, {
            key: "facebook",
            icon: Facebook,
            label: "Facebook",
            placeholder: "https://facebook.com/...",
            color: "text-blue-600"
          }, {
            key: "whatsapp",
            icon: MessageCircle,
            label: "WhatsApp Number",
            placeholder: "+91 99999 00000",
            color: "text-green-500"
          }, {
            key: "youtube",
            icon: Youtube,
            label: "YouTube",
            placeholder: "https://youtube.com/...",
            color: "text-red-500"
          }, {
            key: "twitter",
            icon: Twitter,
            label: "Twitter / X",
            placeholder: "https://x.com/...",
            color: "text-sky-500"
          }].map(({
            key,
            icon: Icon,
            label,
            placeholder,
            color
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-3.5 ${color}` }),
              " ",
              label
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: settings.socialLinks?.[key] || "", onChange: (e) => setSocialInputs((prev) => ({
              ...prev,
              [key]: e.target.value
            })), placeholder, className: "w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none" })
          ] }, key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] text-muted-foreground bg-orange/5 border border-orange/20 rounded-xl px-3 py-2", children: "💡 Leave a field blank to hide that social icon in the footer. For WhatsApp, enter just the phone number (e.g. +919999900000)." })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CMSPage as component
};
