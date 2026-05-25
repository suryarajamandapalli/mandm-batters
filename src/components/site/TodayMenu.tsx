import { useSiteSettings } from "@/store/siteSettings";
import { getImageKitUrl } from "@/lib/imagekit";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function TodayMenu() {
  const todayMenu = useSiteSettings((s) => s.todayMenu);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!todayMenu || todayMenu.length === 0) return null;

  return (
    <section id="menu" className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3">
            Today's Menu
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-navy">
            Freshly prepared today
          </h2>
        </motion.div>

        {/* Menu Grid - 3 items side by side on mobile */}
        <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-4xl mx-auto">
          {todayMenu.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(item.image)}
              className="relative aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden group cursor-zoom-in shadow-xl shadow-navy/5 border border-border bg-secondary/30 transition-all hover:shadow-2xl hover:shadow-orange/10 hover:-translate-y-1 active:scale-95"
            >
              <img
                src={getImageKitUrl(item.image, 600)}
                alt="Today's Menu Item"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <ZoomIn className="size-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="size-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageKitUrl(selectedImage, 1200)}
                alt="Full Menu Preview"
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
