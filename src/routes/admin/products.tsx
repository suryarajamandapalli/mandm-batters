import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProductsStore } from "@/store/products";
import type { Product } from "@/data/site";
import { Plus, Edit, Trash2, Loader2, Tag, Layers, X, Save } from "lucide-react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { MediaUpload } from "@/components/shared/MediaUpload";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/products")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: ProductsPage,
});

function ProductsPage() {
  const { products, categories, loading, toggleStock, deleteProduct, addProduct, updateProduct, addCategory, removeCategory } = useProductsStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // States for MediaUpload
  const [newProductImage, setNewProductImage] = useState("");
  const [editingProductImage, setEditingProductImage] = useState("");

  if (loading) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-orange" />
          <p className="text-muted-foreground animate-pulse">Loading product catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-10">
        {/* Category Management */}
        <section className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="size-5 text-orange" />
              <h2 className="font-bold text-xl text-navy">Manage Categories</h2>
            </div>
            <button 
              onClick={() => setIsAddingCategory(!isAddingCategory)}
              className="text-xs font-bold uppercase tracking-widest text-navy hover:text-orange transition-colors"
            >
              {isAddingCategory ? "Close" : "+ Add New Category"}
            </button>
          </div>
          <div className="p-6 space-y-6">
            {isAddingCategory && (
              <form 
                className="flex gap-3 bg-secondary/20 p-4 rounded-2xl border border-border"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  const name = form.get("categoryName") as string;
                  if (!name) return;
                  addCategory(name);
                  setIsAddingCategory(false);
                  toast.success(`Category "${name}" created!`);
                }}
              >
                <input 
                  name="categoryName" 
                  placeholder="e.g. Dosa Batter" 
                  required 
                  className="flex-1 bg-white border border-border rounded-xl px-4 py-2 text-sm outline-none focus:border-orange"
                />
                <button type="submit" className="bg-navy text-white px-6 rounded-xl font-bold text-sm hover:bg-orange transition-colors">Create</button>
              </form>
            )}

            <div className="flex flex-wrap gap-3">
              {(categories || []).map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 bg-secondary/50 border border-border px-4 py-2 rounded-xl group transition-all hover:border-orange/50">
                  <span className="font-bold text-navy text-sm">{cat.name}</span>
                  <button 
                    onClick={() => {
                      if (confirm(`Remove category "${cat.name}"? Products in this category will remain but will be uncategorized.`)) {
                        removeCategory(cat.id);
                      }
                    }}
                    className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
              {(categories || []).length === 0 && (
                <p className="text-sm text-muted-foreground italic">No categories created yet. Create one to add products.</p>
              )}
            </div>
          </div>
        </section>

        {/* Product List */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Layers className="size-5 text-orange" />
              <h2 className="font-bold text-xl md:text-2xl text-navy">Product Catalog</h2>
            </div>
            <button
              onClick={() => {
                if ((categories || []).length === 0) {
                  toast.error("Please create at least one category first.");
                  setIsAddingCategory(true);
                  return;
                }
                setEditingProduct(null);
                setIsAdding(!isAdding);
              }}
              className="bg-navy text-white px-5 py-2.5 rounded-full font-bold hover:bg-orange transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/10 active:scale-95"
            >
              <Plus className="size-4" /> Add Product
            </button>
          </div>

          {/* Add Product Form */}
          {isAdding && (
            <form 
              className="bg-white p-8 rounded-3xl border-2 border-orange/20 grid sm:grid-cols-2 gap-6 shadow-xl relative"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                addProduct({
                  name: form.get("name") as string,
                  description: form.get("description") as string,
                  image: newProductImage,
                  pricePerKg: Number(form.get("pricePerKg")),
                  pricePerHalfKg: Number(form.get("pricePerHalfKg")),
                  category: form.get("category") as string,
                  stockQuantity: Number(form.get("stockQuantity")) || 0,
                  inStock: true,
                });
                setIsAdding(false);
                setNewProductImage("");
                toast.success("Product added successfully!");
              }}
            >
              <div className="sm:col-span-2 flex items-center justify-between mb-2">
                 <h3 className="font-bold text-navy text-lg">New Product Details</h3>
                 <button type="button" onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-navy"><X className="size-5" /></button>
              </div>
              
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
                 <select name="category" required className="w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange">
                    <option value="">Select Category</option>
                    {(categories || []).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Product Name</label>
                 <input name="name" required placeholder="e.g. Special Dosa Batter" className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="sm:col-span-2">
                 <MediaUpload 
                    label="Product Image"
                    value={newProductImage}
                    onChange={setNewProductImage}
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Initial Stock Quantity</label>
                 <input type="number" name="stockQuantity" defaultValue={50} required className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Price 1KG (₹)</label>
                    <input type="number" name="pricePerKg" required className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Price ½KG (₹)</label>
                    <input type="number" name="pricePerHalfKg" required className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
                 <textarea name="description" required rows={3} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-full border border-border font-bold hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="px-10 py-3 rounded-full bg-navy text-white font-bold hover:bg-orange hover:text-navy transition-all shadow-lg shadow-navy/10 flex items-center gap-2">
                  <Save className="size-4" /> Save & Publish
                </button>
              </div>
            </form>
          )}

          {/* Edit Product Form */}
          {editingProduct && (
            <form
              key={editingProduct.id}
              className="bg-white p-8 rounded-3xl border-2 border-blue-200 grid sm:grid-cols-2 gap-6 shadow-xl relative"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                updateProduct(editingProduct.id, {
                  name: form.get("name") as string,
                  description: form.get("description") as string,
                  image: editingProductImage || editingProduct.image,
                  pricePerKg: Number(form.get("pricePerKg")),
                  pricePerHalfKg: Number(form.get("pricePerHalfKg")),
                  category: form.get("category") as string,
                  stockQuantity: Number(form.get("stockQuantity")),
                  inStock: form.get("inStock") === "true",
                });
                setEditingProduct(null);
                setEditingProductImage("");
                toast.success("✅ Product updated! Changes are live on the website.");
              }}
            >
              <div className="sm:col-span-2 flex items-center justify-between mb-2">
                 <div>
                   <h3 className="font-bold text-navy text-lg">Edit Product</h3>
                   <p className="text-xs text-muted-foreground">Editing: <span className="font-bold text-orange">{editingProduct.name}</span></p>
                 </div>
                 <button type="button" onClick={() => setEditingProduct(null)} className="text-muted-foreground hover:text-navy"><X className="size-5" /></button>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Category</label>
                 <select name="category" defaultValue={editingProduct.category} className="w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange">
                    {(categories || []).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Product Name</label>
                 <input name="name" required defaultValue={editingProduct.name} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="sm:col-span-2">
                 <MediaUpload 
                    label="Product Image"
                    value={editingProductImage || editingProduct.image}
                    onChange={setEditingProductImage}
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Stock Quantity</label>
                 <input type="number" name="stockQuantity" required defaultValue={editingProduct.stockQuantity} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Price 1KG (₹)</label>
                    <input type="number" name="pricePerKg" required defaultValue={editingProduct.pricePerKg} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Price ½KG (₹)</label>
                    <input type="number" name="pricePerHalfKg" required defaultValue={editingProduct.pricePerHalfKg} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
                 <textarea name="description" required rows={3} defaultValue={editingProduct.description} className="w-full border rounded-xl p-3 outline-none focus:border-orange" />
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-muted-foreground">Visibility</label>
                 <select name="inStock" defaultValue={editingProduct.inStock ? "true" : "false"} className="w-full border rounded-xl p-3 bg-secondary/20 font-bold text-navy outline-none focus:border-orange">
                    <option value="true">🟢 Live (Visible on website)</option>
                    <option value="false">🔴 Hidden (Not visible)</option>
                 </select>
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-3 rounded-full border border-border font-bold hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="px-10 py-3 rounded-full bg-orange text-navy font-bold hover:bg-orange/80 transition-all shadow-lg shadow-orange/10 flex items-center gap-2">
                  <Save className="size-4" /> Save Changes
                </button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                <tr>
                  <th className="px-6 py-5">Product</th>
                  <th className="px-6 py-5">Category</th>
                  <th className="px-6 py-5">Pricing</th>
                  <th className="px-6 py-5">Stock</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(products || []).map((p) => (
                  <tr key={p.id} className={`hover:bg-secondary/30 transition-colors ${editingProduct?.id === p.id ? "bg-orange/5 border-l-4 border-orange" : ""}`}>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img src={p.image} className="size-14 rounded-2xl object-cover shadow-sm" />
                      <div>
                        <div className="font-bold text-navy text-base">{p.name}</div>
                        <div className="text-xs text-muted-foreground max-w-[200px] truncate">{p.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-orange/10 text-orange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {p.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy">₹{p.pricePerKg} / KG</div>
                      <div className="text-[10px] text-muted-foreground font-semibold">₹{p.pricePerHalfKg} / ½KG</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                         <button 
                          onClick={() => toggleStock(p.id)}
                          title="Click to toggle visibility"
                          className={`w-fit inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${p.inStock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                        >
                          {p.inStock ? "🟢 Live" : "🔴 Hidden"}
                        </button>
                        <div className="text-xs font-bold text-navy">{p.stockQuantity} units left</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setEditingProduct(p); setIsAdding(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`p-2.5 rounded-xl transition-colors ${editingProduct?.id === p.id ? "bg-orange text-white" : "text-muted-foreground hover:text-navy hover:bg-secondary"}`}
                          title="Edit Product"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id); }} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Delete Product">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(products || []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Layers className="size-12 opacity-10" />
                        <p className="font-bold uppercase tracking-widest text-xs">No products in catalog</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}