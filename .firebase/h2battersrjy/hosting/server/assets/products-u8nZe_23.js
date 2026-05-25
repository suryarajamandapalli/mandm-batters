import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BqvgFAY5.js";
import { u as useProductsStore } from "./products-DhKdDw1-.js";
import { t as toast } from "./router-Bieu8wEH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-CnCGDhfW.js";
import { M as MediaUpload } from "./MediaUpload-BCulELl0.js";
import { L as LoaderCircle } from "./loader-circle-D-sdHygJ.js";
import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { T as Trash2 } from "./trash-2-ISN0WQ3x.js";
import { P as Plus } from "./plus-Ci062b-n.js";
import { X } from "./x-Cj-DygLU.js";
import { S as Save } from "./save-C6UICAX1.js";
import { S as SquarePen } from "./square-pen-BvaZFTz4.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./imagekit-0b8ZklfH.js";
import "./circle-check-big-D4WEICFP.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function ProductsPage() {
  const {
    products,
    categories,
    loading,
    toggleStock,
    deleteProduct,
    addProduct,
    updateProduct,
    addCategory,
    removeCategory
  } = useProductsStore();
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [isAddingCategory, setIsAddingCategory] = reactExports.useState(false);
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [newProductImage, setNewProductImage] = reactExports.useState("");
  const [editingProductImage, setEditingProductImage] = reactExports.useState("");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-10 animate-spin text-orange" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground animate-pulse", children: "Loading product catalog..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white rounded-3xl border border-border overflow-hidden shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border bg-secondary/30 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl text-navy", children: "Manage Categories" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsAddingCategory(!isAddingCategory), className: "text-xs font-bold uppercase tracking-widest text-navy hover:text-orange transition-colors", children: isAddingCategory ? "Close" : "+ Add New Category" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
        isAddingCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex gap-3 bg-secondary/20 p-4 rounded-2xl border border-border", onSubmit: (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const name = form.get("categoryName");
          if (!name) return;
          addCategory(name);
          setIsAddingCategory(false);
          toast.success(`Category "${name}" created!`);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "categoryName", placeholder: "e.g. Dosa Batter", required: true, className: "flex-1 bg-white border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "bg-navy text-white px-6 rounded-xl font-bold text-sm hover:bg-orange transition-colors", children: "Create" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          (categories || []).map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-xl group transition-all hover:border-orange/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-navy text-sm", children: cat.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm(`Remove category "${cat.name}"? Products in this category will remain but will be uncategorized.`)) {
                removeCategory(cat.id);
              }
            }, className: "text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }) })
          ] }, cat.id)),
          (categories || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No categories created yet. Create one to add products." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-5 text-orange" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-xl md:text-2xl text-navy", children: "Product Catalog" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          if ((categories || []).length === 0) {
            toast.error("Please create at least one category first.");
            setIsAddingCategory(true);
            return;
          }
          setEditingProduct(null);
          setIsAdding(!isAdding);
        }, className: "bg-navy text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10 active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
          " Add Product"
        ] })
      ] }),
      isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "bg-white p-8 rounded-3xl border-2 border-orange/20 grid sm:grid-cols-2 gap-6 shadow-xl relative", onSubmit: (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        addProduct({
          name: form.get("name"),
          description: form.get("description"),
          image: newProductImage,
          pricePerKg: Number(form.get("pricePerKg")),
          pricePerHalfKg: Number(form.get("pricePerHalfKg")),
          category: form.get("category"),
          stockQuantity: Number(form.get("stockQuantity")) || 0,
          inStock: true
        });
        setIsAdding(false);
        setNewProductImage("");
        toast.success("Product added successfully!");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-navy text-lg", children: "New Product Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsAdding(false), className: "text-muted-foreground hover:text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "category", required: true, className: "w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Category" }),
            (categories || []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Product Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", required: true, placeholder: "e.g. Special Dosa Batter", className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Product Image", value: newProductImage, onChange: setNewProductImage }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Initial Stock Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "stockQuantity", defaultValue: 50, required: true, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Price 1KG (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "pricePerKg", required: true, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Price ½KG (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "pricePerHalfKg", required: true, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "description", required: true, rows: 3, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsAdding(false), className: "px-6 py-3 rounded-full border border-border font-bold hover:bg-secondary transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "px-10 py-3 rounded-full bg-navy text-white font-bold hover:bg-orange hover:text-navy transition-all shadow-lg shadow-navy/10 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
            " Save & Publish"
          ] })
        ] })
      ] }),
      editingProduct && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "bg-white p-8 rounded-3xl border-2 border-blue-200 grid sm:grid-cols-2 gap-6 shadow-xl relative", onSubmit: (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        updateProduct(editingProduct.id, {
          name: form.get("name"),
          description: form.get("description"),
          image: editingProductImage || editingProduct.image,
          pricePerKg: Number(form.get("pricePerKg")),
          pricePerHalfKg: Number(form.get("pricePerHalfKg")),
          category: form.get("category"),
          stockQuantity: Number(form.get("stockQuantity")),
          inStock: form.get("inStock") === "true"
        });
        setEditingProduct(null);
        setEditingProductImage("");
        toast.success("✅ Product updated! Changes are live on the website.");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-navy text-lg", children: "Edit Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Editing: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-orange", children: editingProduct.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditingProduct(null), className: "text-muted-foreground hover:text-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { name: "category", defaultValue: editingProduct.category, className: "w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange", children: (categories || []).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.name, children: c.name }, c.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Product Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", required: true, defaultValue: editingProduct.name, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MediaUpload, { label: "Product Image", value: editingProductImage || editingProduct.image, onChange: setEditingProductImage }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Stock Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "stockQuantity", required: true, defaultValue: editingProduct.stockQuantity, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Price 1KG (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "pricePerKg", required: true, defaultValue: editingProduct.pricePerKg, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Price ½KG (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", name: "pricePerHalfKg", required: true, defaultValue: editingProduct.pricePerHalfKg, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "description", required: true, rows: 3, defaultValue: editingProduct.description, className: "w-full border rounded-xl p-3 outline-none focus:border-orange" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase text-muted-foreground", children: "Visibility" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "inStock", defaultValue: editingProduct.inStock ? "true" : "false", className: "w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "true", children: "🟢 Live (Visible on website)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "false", children: "🔴 Hidden (Not visible)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditingProduct(null), className: "px-6 py-3 rounded-full border border-border font-bold hover:bg-secondary transition-colors", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "px-10 py-3 rounded-full bg-orange text-navy font-bold hover:bg-orange/80 transition-all shadow-lg shadow-orange/10 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
            " Save Changes"
          ] })
        ] })
      ] }, editingProduct.id),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-3xl border border-border shadow-sm overflow-x-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs text-muted-foreground uppercase bg-secondary/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5", children: "Pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5", children: "Stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          (products || []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `hover:bg-secondary/30 transition-colors ${editingProduct?.id === p.id ? "bg-orange/5 border-l-4 border-orange" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, className: "size-14 rounded-2xl object-cover shadow-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-navy text-base", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground max-w-[200px] truncate", children: p.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-orange/10 text-orange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", children: p.category || "Uncategorized" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-navy", children: [
                "₹",
                p.pricePerKg,
                " / KG"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground font-semibold", children: [
                "₹",
                p.pricePerHalfKg,
                " / ½KG"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleStock(p.id), title: "Click to toggle visibility", className: `w-fit inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${p.inStock ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"}`, children: p.inStock ? "🟢 Live" : "🔴 Hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-navy", children: [
                p.stockQuantity,
                " units left"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                setEditingProduct(p);
                setIsAdding(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }, className: `p-2.5 rounded-xl transition-colors ${editingProduct?.id === p.id ? "bg-orange text-white" : "text-muted-foreground hover:text-navy hover:bg-secondary"}`, title: "Edit Product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
              }, className: "p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors", title: "Delete Product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
            ] }) })
          ] }, p.id)),
          (products || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-6 py-20 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-12 opacity-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold uppercase tracking-widest text-xs", children: "No products in catalog" })
          ] }) }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  ProductsPage as component
};
