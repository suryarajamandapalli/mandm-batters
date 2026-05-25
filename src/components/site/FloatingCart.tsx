import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart, cartCount, cartTotal, cartWeight } from "@/store/cart";

export function FloatingCart() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const isOpen = useCart((s) => s.isOpen);
  const count = cartCount(items);
  const total = cartTotal(items);
  const totalWeight = cartWeight(items);
  const isMinMet = totalWeight >= 1;

  return (
    <AnimatePresence>
      {count > 0 && !isOpen && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 400 }}
          className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[480px] z-[9999]"
        >
          {/* Outer Glow Effect */}
          <div className="absolute inset-0 bg-orange/20 blur-3xl -z-10 animate-pulse" />
          
          <div className="bg-navy/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 p-2.5 flex items-center justify-between gap-3 group/cart">
            <div className="flex items-center gap-4 pl-4">
              <div className="relative">
                <div className={`size-12 rounded-2xl bg-orange grid place-items-center text-navy shadow-lg shadow-orange/20 transition-transform ${isMinMet ? 'animate-bounce-subtle' : 'scale-95 grayscale'}`}>
                  <ShoppingBag className="size-6" />
                </div>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-white text-navy text-[10px] font-black size-5 rounded-full grid place-items-center border-2 border-navy shadow-lg"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col">
                <div className="text-white font-display font-black text-xl leading-none flex items-center gap-1.5">
                  ₹{total}
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">
                   {totalWeight} KG · {count} Items
                </div>
              </div>
            </div>

            <button
              onClick={open}
              className={`h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all active:scale-95 overflow-hidden relative ${
                isMinMet 
                  ? "bg-orange text-navy shadow-xl shadow-orange/20" 
                  : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
              }`}
            >
              {isMinMet && <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />}
              <span className="relative flex items-center gap-2">
                {isMinMet ? (
                  <>
                    View Cart
                    <ArrowRight className="size-4 group-hover/cart:translate-x-1 transition-transform" />
                  </>
                ) : (
                  "Add Min. 1 KG"
                )}
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
