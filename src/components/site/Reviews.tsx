import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useSiteSettings } from "@/store/siteSettings";

export function Reviews() {
  const reviews = useSiteSettings((s) => s.reviews);

  if (!reviews || reviews.length === 0) return null;

  // Double reviews for infinite scroll
  const slides = [...reviews, ...reviews];

  return (
    <section id="reviews" className="py-12 md:py-20 bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,26,0.1),transparent_60%)]" />

      <div className="relative container-px mx-auto max-w-7xl mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3">
            Customer Love
          </div>
          <h2 className="font-display font-black text-3xl md:text-6xl text-balance leading-none tracking-tight">
            Loved by 10,000+ homes.
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scroll Track */}
      <div className="relative flex overflow-hidden w-full group">
        <div className="flex gap-4 md:gap-6 py-4 animate-scroll whitespace-nowrap px-4 hover:[animation-play-state:paused]">
          {slides.map((r, i) => (
            <motion.figure
              key={`${r.id}-${i}`}
              className="w-[280px] md:w-[380px] bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shrink-0 transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] shadow-2xl shadow-black/20"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className="size-6 md:size-8 text-orange opacity-50" />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`size-3 md:size-4 ${
                        idx < r.rating
                          ? "fill-orange text-orange"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="text-white/90 text-sm md:text-base leading-relaxed whitespace-normal italic font-medium">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="size-10 rounded-full bg-orange/20 grid place-items-center text-orange font-black text-xs uppercase tracking-widest border border-orange/10">
                   {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-black text-sm uppercase tracking-tight">{r.name}</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{r.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
