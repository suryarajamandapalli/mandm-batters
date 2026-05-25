import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSiteSettings } from "@/store/siteSettings";
import { getImageKitUrl } from "@/lib/imagekit";

/** Extracts a YouTube video ID from any common YouTube URL format */
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function Hero() {
  const { heroVideoDesktop, heroVideoMobile, heroTagline, heroHeading, heroButtonText } = useSiteSettings();

  const desktopYoutubeId = getYouTubeId(heroVideoDesktop);
  const mobileYoutubeId = getYouTubeId(heroVideoMobile);

  const desktopEmbedUrl = desktopYoutubeId
    ? `https://www.youtube.com/embed/${desktopYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${desktopYoutubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    : null;

  const mobileEmbedUrl = mobileYoutubeId
    ? `https://www.youtube.com/embed/${mobileYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${mobileYoutubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-navy text-white flex items-center justify-center text-center"
    >
      {/* Background Videos Container */}
      <div className="absolute inset-0 z-0">
        {/* DESKTOP VIDEO (Hidden on Mobile) */}
        <div className="hidden md:block absolute inset-0">
          {desktopEmbedUrl ? (
            <iframe
              src={desktopEmbedUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              style={{ border: "none", transform: "scale(1.2)", width: '100vw', height: '100vh' }}
              allow="autoplay; encrypted-media"
              title="Hero desktop video"
            />
          ) : (
            <video
              key={heroVideoDesktop}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              poster={getImageKitUrl("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1600&auto=format&fit=crop", 1600)}
            >
              <source src={heroVideoDesktop} type="video/mp4" />
            </video>
          )}
        </div>

        {/* MOBILE VIDEO (Hidden on Desktop) */}
        <div className="block md:hidden absolute inset-0">
          {mobileEmbedUrl ? (
            <iframe
              src={mobileEmbedUrl}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              style={{ border: "none", transform: "scale(1.5)", width: '100vw', height: '100vh' }}
              allow="autoplay; encrypted-media"
              title="Hero mobile video"
            />
          ) : (
            <video
              key={heroVideoMobile || heroVideoDesktop}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              poster={getImageKitUrl("https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1600&auto=format&fit=crop", 1600)}
            >
              <source src={heroVideoMobile || heroVideoDesktop} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.15),transparent_70%)] z-10" />
      
      {/* Bottom Gradient - Fix for the "white broken area" */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-navy via-navy/80 to-transparent z-10 pointer-events-none" />

      <div className="relative container-px mx-auto max-w-5xl z-20 flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs uppercase tracking-[0.25em] font-black text-orange mb-8 shadow-2xl"
        >
          <Sparkles className="size-3.5 fill-orange" />
          Authentic · Traditional · Fresh
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black fluid-h1 text-balance leading-[0.9] tracking-tighter"
        >
          {heroHeading || "M and M Batters"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 max-w-2xl text-lg md:text-2xl text-white/80 text-balance font-medium leading-relaxed px-4"
        >
          {heroTagline || "Fresh, hand-crafted idli & dosa batter — fermented to perfection and delivered to your door each morning."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6"
        >
          <a
            href="#products"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-orange text-navy px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange/30 hover:shadow-orange/50 hover:scale-105 active:scale-95 transition-all"
          >
            {heroButtonText || "Order Now"}
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-md"
          >
            Our Story
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-8 md:gap-24 pt-12 border-t border-white/10 w-full"
        >
          {[
            { v: "10K+", l: "Happy homes" },
            { v: "100%", l: "Natural" },
            { v: "Daily", l: "Fresh" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center">
              <div className="font-display font-black text-2xl md:text-4xl text-orange leading-none mb-2">
                {s.v}
              </div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/30 whitespace-nowrap">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
