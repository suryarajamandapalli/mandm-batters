import { motion } from "framer-motion";
import { Leaf, Clock, Heart } from "lucide-react";
import { getImageKitUrl } from "@/lib/imagekit";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    text: "No preservatives, no shortcuts. Just rice, urad dal & patience.",
  },
  {
    icon: Clock,
    title: "Fermented Overnight",
    text: "Slow, traditional fermentation for that perfect tangy taste.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    text: "A family recipe passed down three generations.",
  },
];

export function About() {
  return (
    <section id="about" className="py-12 md:py-20 bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-secondary shadow-2xl shadow-navy/5 border border-border">
            <img
              src={getImageKitUrl("https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1000&auto=format&fit=crop", 800)}
              alt="Traditional batter preparation"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block absolute -bottom-6 -right-6 bg-orange text-navy p-8 rounded-[2rem] max-w-[240px] shadow-2xl shadow-orange/20 border-4 border-white"
          >
            <div className="font-display font-black text-4xl">3 Gen.</div>
            <div className="text-xs font-black uppercase tracking-widest mt-1 opacity-80 leading-tight">
              Of perfecting our secret recipe
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-4">
            Our Heritage
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-navy text-balance leading-[1.1]">
            The taste you grew up with — delivered fresh.
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            What started in M and M home kitchen is now a small family-run
            obsession. We stone-grind premium urad dal and idli rice every single
            day, ferment it slowly overnight, and hand-pack it before sunrise.
          </p>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            No preservatives. No additives. Just real batter, the way it's
            supposed to taste.
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-3 md:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-secondary/30 border border-border/50 group hover:bg-white hover:shadow-xl hover:shadow-navy/5 transition-all"
              >
                <div className="size-10 rounded-xl bg-orange grid place-items-center text-navy shadow-lg shadow-orange/20 group-hover:scale-110 transition-transform">
                  <f.icon className="size-5" />
                </div>
                <div className="mt-4 font-display font-black text-navy text-sm uppercase tracking-tight">
                  {f.title}
                </div>
                <div className="mt-1.5 text-[10px] md:text-xs text-muted-foreground font-medium leading-relaxed">
                  {f.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
