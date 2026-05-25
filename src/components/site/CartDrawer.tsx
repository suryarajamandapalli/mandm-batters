import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCart, cartTotal, lineTotal, cartWeight } from "@/store/cart";
import { useEffect } from "react";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const navigate = useNavigate();

  // Body scroll lock
  useEffect(() => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[10001] bg-navy/80 backdrop-blur-md"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[10002] w-full sm:w-[480px] bg-background shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-orange grid place-items-center text-navy">
                  <ShoppingBag className="size-4" />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-navy">
                    Your Cart
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {items.length} {items.length === 1 ? "item" : "items"} · {totalWeight} KG
                  </div>
                </div>
              </div>
              <button
                onClick={close}
                className="size-9 grid place-items-center rounded-full hover:bg-secondary"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full grid place-items-center text-center text-muted-foreground">
                  <div>
                    <ShoppingBag className="size-12 mx-auto opacity-30" />
                    <p className="mt-3 text-sm">Your cart is empty</p>
                  </div>
                </div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.productId}
                    className="bg-secondary/50 rounded-2xl p-3 flex gap-3"
                  >
                    <img
                      src={it.image}
                      alt={it.name}
                      className="size-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-display font-semibold text-navy text-sm leading-tight">
                          {it.name}
                        </div>
                        <button
                          onClick={() => remove(it.productId)}
                          className="text-muted-foreground hover:text-destructive text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <QtyMini
                          label="KG"
                          value={it.kg}
                          onChange={(v) => setQty(it.productId, v, it.halfKg)}
                        />
                        <QtyMini
                          label="½ KG"
                          value={it.halfKg}
                          onChange={(v) => setQty(it.productId, it.kg, v)}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-[10px] text-muted-foreground">
                          ₹{it.pricePerKg}/KG · ₹{it.pricePerHalfKg}/½KG
                        </div>
                        <div className="font-display font-bold text-navy">
                          ₹{lineTotal(it)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 bg-background space-y-4">
                {!isMinWeightMet && (
                  <div className="bg-orange/10 border border-orange/20 rounded-xl p-3 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange animate-pulse">
                      Minimum order weight is 1 KG
                    </p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Current weight: {totalWeight} KG. Please add more to proceed.
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display font-bold text-3xl text-navy">
                    ₹{total}
                  </span>
                </div>
                
                <button
                  disabled={!isMinWeightMet}
                  onClick={() => {
                    close();
                    navigate({ to: "/checkout" });
                  }}
                  className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all group ${
                    isMinWeightMet 
                      ? "bg-navy text-white hover:bg-orange hover:text-navy shadow-xl shadow-navy/20" 
                      : "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
                  }`}
                >
                  {isMinWeightMet ? "Proceed to Checkout" : "Minimum 1 KG Required"}
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function QtyMini({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-background rounded-lg flex items-center justify-between p-1">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="size-7 grid place-items-center rounded-md hover:bg-secondary"
      >
        <Minus className="size-3" />
      </button>
      <div className="text-center leading-none">
        <div className="font-bold text-sm text-navy">{value}</div>
        <div className="text-[9px] uppercase text-muted-foreground">{label}</div>
      </div>
      <button
        onClick={() => onChange(value + 1)}
        className="size-7 grid place-items-center rounded-md bg-orange text-navy"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
