import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { t as toast } from "./router-Bieu8wEH.js";
import { u as uploadFile } from "./imagekit-0b8ZklfH.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { X } from "./x-Cj-DygLU.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { C as CircleCheckBig } from "./circle-check-big-D4WEICFP.js";
const __iconNode$2 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
function MediaUpload({
  value,
  onChange,
  label = "Media",
  mediaType = "image",
  className = "",
  onClear,
  folder = "cms"
}) {
  const [urlInput, setUrlInput] = reactExports.useState(value || "");
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const isVideo = mediaType === "video" || value && /\.(mp4|webm|mov|ogg)$/i.test(value) || value && value.includes("youtube.com");
  const handleUrlApply = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    toast.success(`${label} URL applied!`);
  };
  const handleClear = () => {
    onChange("");
    setUrlInput("");
    onClear?.();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (mediaType === "image" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    if (mediaType === "video" && !file.type.startsWith("video/")) {
      toast.error("Please upload a video file.");
      return;
    }
    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${label}...`);
    try {
      const result = await uploadFile(file, folder);
      onChange(result.secure_url);
      toast.success(`${label} uploaded successfully!`, { id: toastId });
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed: ${error.message || "Unknown error"}`, { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `space-y-3 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground block", children: label }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden bg-secondary border border-border group", children: [
      isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full bg-black flex items-center justify-center", children: value.includes("youtube.com") || value.includes("youtu.be") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-10 text-white/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: value,
          className: "w-full h-full object-cover",
          muted: true,
          loop: true,
          playsInline: true
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: value,
          alt: label,
          className: "w-full aspect-video object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleClear,
          className: "bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            " Remove"
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-2xl overflow-hidden bg-secondary/30 p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: isUploading,
            onClick: () => fileInputRef.current?.click(),
            className: "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border hover:border-orange hover:bg-orange/5 transition-all group",
            children: [
              isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 text-orange animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-6 text-muted-foreground group-hover:text-orange" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-navy", children: "Upload File" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  ref: fileInputRef,
                  onChange: handleFileChange,
                  className: "hidden",
                  accept: mediaType === "image" ? "image/*" : mediaType === "video" ? "video/*" : "*/*"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "size-6 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-navy", children: "Paste Link" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "url",
              value: urlInput,
              onChange: (e) => setUrlInput(e.target.value),
              placeholder: mediaType === "video" ? "YouTube or MP4 link" : "Image URL (PNG, JPG, etc.)",
              className: "w-full border rounded-xl p-3 pr-12 text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 bg-white",
              onKeyDown: (e) => e.key === "Enter" && handleUrlApply()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleUrlApply,
              disabled: !urlInput.trim() || isUploading,
              className: "absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-navy text-white rounded-lg flex items-center justify-center hover:bg-orange transition-colors disabled:opacity-40",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground text-center", children: [
          "Powered by ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "ImageKit.io" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Link as L,
  MediaUpload as M
};
