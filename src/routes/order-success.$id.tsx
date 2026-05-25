import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/store/siteSettings";

export const Route = createFileRoute("/order-success/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.id} Confirmed — M and M Batters` },
      { name: "description", content: "Your order has been placed." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useParams();
  const { whatsappChannelUrl } = useSiteSettings();

  return (
    <div className="min-h-screen bg-navy text-white relative overflow-hidden grid place-items-center px-5 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,149,36,0.18),transparent_55%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 200,
            delay: 0.15,
          }}
          className="size-24 rounded-full bg-orange grid place-items-center mx-auto shadow-2xl shadow-orange/40"
        >
          <CheckCircle2 className="size-12 text-navy" strokeWidth={2.5} />
        </motion.div>

        <h1 className="mt-8 font-display font-bold text-4xl md:text-5xl">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-white/80 text-lg">
          Thank you for ordering with us. Our team will contact you shortly to
          confirm the details.
        </p>

        <div className="mt-8 inline-block bg-white/10 backdrop-blur border border-white/15 rounded-2xl px-6 py-4">
          <div className="text-xs uppercase tracking-[0.18em] text-orange font-semibold">
            Your Order ID
          </div>
          <div className="mt-1 font-display font-bold text-3xl tracking-wider">
            {id}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-white/70">
          <div className="flex items-center gap-3">
            <Phone className="size-4 text-orange" />
            We'll call you within 30 minutes to confirm.
          </div>
          <div className="text-xs text-white/50">
            For urgent queries, call us at: <a href="tel:+919703544888" className="text-orange hover:underline font-bold">+91 97035 44888</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 items-center justify-center">
          <a
            href={whatsappChannelUrl || "https://wa.me/919703544888"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange text-navy px-8 py-4.5 rounded-full font-extrabold text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-orange/30 hover:scale-[1.02] transition-all duration-300 animate-bounce-subtle"
          >
            Join our channel to get daily updates
            <ArrowRight className="size-4" />
          </a>
          
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 px-8 py-4 rounded-full font-bold text-sm transition-all"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
