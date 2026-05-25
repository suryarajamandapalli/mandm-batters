import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart, cartCount, cartWeight } from "@/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/Logo";

const links = [
  { href: "/#products", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const count = cartCount(items);
  const totalWeight = cartWeight(items);
  const isMinMet = totalWeight >= 1;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo size="md" className="size-11 md:size-12" />
          <div className="leading-tight">
            <div
              className={`font-display font-black text-lg md:text-xl tracking-tight ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              M and M Batters
            </div>
            <div
              className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black ${
                scrolled ? "text-muted-foreground" : "text-white/60"
              }`}
            >
              Healthy & Homemade
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-orange ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className={`relative grid place-items-center size-10 rounded-full transition-all duration-500 ${
              isMinMet 
                ? "bg-orange text-navy scale-110 shadow-[0_0_20px_rgba(255,122,26,0.4)] ring-4 ring-orange/20 animate-bounce-subtle" 
                : scrolled
                  ? "bg-secondary text-foreground hover:bg-navy hover:text-white"
                  : "bg-white/15 text-white hover:bg-orange hover:text-navy backdrop-blur"
            }`}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className={`absolute -top-1 -right-1 text-navy text-[10px] font-black size-5 rounded-full grid place-items-center transition-colors ${isMinMet ? "bg-white" : "bg-orange"}`}>
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden grid place-items-center size-10 rounded-full ${
              scrolled
                ? "bg-secondary text-foreground"
                : "bg-white/15 text-white backdrop-blur"
            }`}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container-px py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-3 rounded-lg hover:bg-secondary text-foreground font-medium"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
