import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Filter, LayoutGrid, Zap } from "lucide-react";
import type { Product } from "@/data/site";
import { useProductsStore } from "@/store/products";
import { useCart } from "@/store/cart";
import { getImageKitUrl } from "@/lib/imagekit";
import { toast } from "sonner";

function ProductCard({ p, i }: { p: Product; i: number }) {
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className={`group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-border/50 hover:border-orange/30 shadow-sm hover:shadow-2xl hover:shadow-navy/5 hover:-translate-y-1.5 transition-all duration-300 ${!p.inStock || p.stockQuantity <= 0 ? "opacity-75" : ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={getImageKitUrl(p.image, 600)}
          alt={p.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-navy text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-navy/5">
          {p.category}
        </div>
        <div className="absolute top-2 right-2 bg-orange text-navy shadow-lg px-3 py-1.5 rounded-xl border border-white/20 flex flex-col items-center leading-none">
          <div className="font-display font-black text-base flex items-center gap-0.5">
            <span className="text-[10px] font-bold mt-0.5">₹</span>{p.pricePerKg}
            <span className="text-[8px] font-black ml-0.5 opacity-60">/KG</span>
          </div>
        </div>
        {(!p.inStock || p.stockQuantity <= 0) && (
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px] grid place-items-center">
             <div className="bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-xl rotate-[-5deg] shadow-lg border-2 border-white/10 uppercase tracking-widest">OUT OF STOCK</div>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-display font-black text-base md:text-lg text-navy truncate flex-1 mr-2">
            {p.name}
          </h3>
          <div className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md border ${p.stockQuantity < 5 ? "text-red-500 bg-red-50 border-red-100" : "text-green-600 bg-green-50 border-green-100"}`}>
            {p.stockQuantity > 0 ? `${p.stockQuantity} Left` : "Sold Out"}
          </div>
        </div>

        {/* Quantity selectors */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <QtyControl
            label="1 KG"
            value={kg}
            disabled={!p.inStock || p.stockQuantity <= 0}
            onMinus={() => setQty(p.id, Math.max(0, kg - 1), halfKg)}
            onPlus={() => {
              addKg(p);
              toast.success(`1 KG ${p.name} added`);
            }}
          />
          <QtyControl
            label="½ KG"
            value={halfKg}
            disabled={!p.inStock || p.stockQuantity <= 0}
            onMinus={() => setQty(p.id, kg, Math.max(0, halfKg - 1))}
            onPlus={() => {
              addHalfKg(p);
              toast.success(`½ KG ${p.name} added`);
            }}
          />
        </div>

        <div className="mt-4 pt-3 border-t border-secondary flex flex-col gap-2">
          {totalKg > 0 && totalKg < 1 && (
            <div className="text-orange text-[9px] font-black uppercase tracking-[0.1em] text-center animate-pulse">
              Min. 1 KG Required
            </div>
          )}
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="text-[8px] uppercase tracking-widest text-muted-foreground font-black leading-none mb-1">
                Total
              </div>
              <div className="font-display font-black text-xl text-navy flex items-baseline gap-0.5">
                <span className="text-orange text-xs">₹</span>{total || 0}
              </div>
            </div>
            <button
              disabled={totalKg < 1 || !p.inStock || p.stockQuantity <= 0}
              onClick={open}
              className={`flex-1 h-10 rounded-xl text-[10px] uppercase tracking-widest font-black transition-all active:scale-95 shadow-md ${
                totalKg >= 1 
                  ? "bg-orange text-navy shadow-orange/10" 
                  : "bg-navy text-white shadow-navy/5 opacity-50 grayscale cursor-not-allowed"
              }`}
            >
              {totalKg < 1 && totalKg > 0 ? "Add more" : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function QtyControl({
  label,
  value,
  disabled,
  onMinus,
  onPlus,
}: {
  label: string;
  value: number;
  disabled?: boolean;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div className={`bg-secondary/40 rounded-xl p-1 flex items-center justify-between transition-opacity ${disabled ? "opacity-30 pointer-events-none" : ""}`}>
      <button
        type="button"
        onClick={onMinus}
        disabled={value === 0 || disabled}
        className="size-8 grid place-items-center rounded-lg bg-white text-navy shadow-sm hover:bg-navy hover:text-white disabled:opacity-30 transition-all active:scale-90"
      >
        <Minus className="size-3" />
      </button>
      <div className="text-center leading-none px-1">
        <div className="font-display font-black text-sm text-navy">
          {value}
        </div>
        <div className="text-[7px] font-black uppercase tracking-widest text-muted-foreground mt-0.5">
          {label}
        </div>
      </div>
      <button
        type="button"
        onClick={onPlus}
        disabled={disabled}
        className="size-8 grid place-items-center rounded-lg bg-orange text-navy shadow-sm hover:shadow-orange/20 transition-all active:scale-90 disabled:opacity-30"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}

export function Products() {
  const products = useProductsStore((s) => s.products);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
    return cats;
  }, [products]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    const catsToProcess = activeCategory === "All" 
      ? categories.filter(c => c !== "All")
      : [activeCategory];

    catsToProcess.forEach(cat => {
      groups[cat] = products.filter(p => p.category === cat);
    });
    return groups;
  }, [products, activeCategory, categories]);

  return (
    <section id="products" className="py-12 md:py-20 bg-secondary/30 relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-orange font-black px-3 py-1 rounded-full bg-orange/10 mb-3">
              <Zap className="size-3 fill-orange" />
              Our Batters
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-navy text-balance leading-tight">
              Freshly ground, <br className="hidden md:block" /> fermented for you.
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? "bg-navy text-white shadow-lg shadow-navy/20" 
                    : "bg-white text-navy hover:bg-orange/10 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12 pb-16">
          <AnimatePresence mode="popLayout">
            {Object.entries(groupedProducts).map(([category, catProducts]) => (
              catProducts.length > 0 && (
                <motion.div 
                  key={category}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="font-display font-black text-xl md:text-3xl text-navy whitespace-nowrap uppercase tracking-tight">
                      {category}
                    </h3>
                    <div className="h-px bg-navy/5 flex-1" />
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {catProducts.map((p, i) => (
                      <ProductCard key={p.id} p={p} i={i} />
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {Object.values(groupedProducts).every(g => g.length === 0) && (
           <div className="mt-20 text-center py-16 bg-white/50 rounded-3xl border border-dashed border-border">
              <LayoutGrid className="size-10 mx-auto text-muted-foreground/20 mb-3" />
              <h3 className="text-lg font-black text-navy">No products found</h3>
              <p className="text-xs text-muted-foreground">Try a different category.</p>
           </div>
        )}
      </div>
    </section>
  );
}

