import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense, type FormEvent } from "react";
import { ArrowLeft, ShoppingBag, Info, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, cartTotal, lineTotal } from "@/store/cart";
import { useOrders } from "@/store/orders";
import type { Location } from "@/components/checkout/MapPicker";
import { VoiceRecorder } from "@/components/checkout/VoiceRecorder";
import { toast } from "sonner";

import { uploadFile } from "@/lib/cloudinary";
import { MapPicker } from "@/components/checkout/MapPicker";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — M and M Batters" },
      { name: "description", content: "Complete your batter order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const total = cartTotal(items);

  const [location, setLocation] = useState<Location | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [voiceNote, setVoiceNote] = useState<Blob | null>(null);
  const [payment, setPayment] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const addOrder = useOrders((s) => s.addOrder);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Starting order submission...");

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!payment) {
      toast.error("Please select a payment method.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const form = new FormData(e.currentTarget);
      const address = {
        apartment: form.get("apartment") as string,
        street: form.get("street") as string,
        door: form.get("door") as string,
        floor: (form.get("floor") as string) || "",
      };

      let voiceNoteUrl = "";
      if (voiceNote) {
        console.log("Uploading voice note to ImageKit...");
        try {
          // Cloudinary handles Blobs/Files directly in the browser
          const uploadResult = await uploadFile(voiceNote as File, "voice_notes");
          voiceNoteUrl = uploadResult.secure_url;
          console.log("Voice note uploaded:", voiceNoteUrl);
        } catch (err) {
          console.error("Voice note upload failed:", err);
          // Continue without voice note if upload fails
        }
      }

      const orderData = {
        customerName: form.get("name") as string,
        phone: form.get("phone") as string,
        address,
        mapsLocation: location ? `${location.lat},${location.lng}` : "",
        mapsLink: location ? `https://www.google.com/maps?q=${location.lat},${location.lng}` : "",
        voiceNote: !!voiceNote,
        voiceNoteUrl,
        paymentMethod: payment === "cod" ? "Cash" as const : "UPI" as const,
        items,
        totalAmount: total,
      };

      console.log("Sending order to database...");
      
      // Add a timeout to the order submission
      const orderPromise = addOrder(orderData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out. Please try again.")), 10000)
      );

      const newOrder = (await Promise.race([orderPromise, timeoutPromise])) as any;
      console.log("Order saved successfully:", newOrder.id);
      
      toast.success("Order placed successfully!");
      clear(); 

      navigate({ 
        to: "/order-success/$id", 
        params: { id: newOrder.id } 
      });
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary/30 grid place-items-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="size-16 mx-auto text-muted-foreground/50" />
          <h1 className="mt-4 font-display text-3xl text-navy">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some delicious batter before checking out.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-semibold hover:bg-orange hover:text-navy transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-navy text-white">
        <div className="container-px mx-auto max-w-7xl py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-orange text-sm">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <div className="font-display font-bold text-lg">Checkout</div>
          <div className="w-16" />
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="container-px mx-auto max-w-7xl py-8 lg:py-12 grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <Section title="Customer Details" step="1">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
            </div>
          </Section>

          <Section title="Delivery Address" step="2">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Apartment / Home Name" name="apartment" required />
              <Field label="Street" name="street" required />
              <Field label="Door Number" name="door" required />
              <Field label="Floor" name="floor" />
            </div>
          </Section>

          <Section title="Pin Your Location" step="3">
            {mounted ? (
              <Suspense
                fallback={
                  <div className="h-[280px] rounded-2xl bg-secondary/60 grid place-items-center">
                    <Loader2 className="size-6 animate-spin text-orange" />
                  </div>
                }
              >
                <MapPicker location={location} onChange={setLocation} />
              </Suspense>
            ) : (
              <div className="h-[280px] rounded-2xl bg-secondary/60 grid place-items-center">
                <Loader2 className="size-6 animate-spin text-orange" />
              </div>
            )}
          </Section>

          <Section title="Voice Note for Delivery" step="4">
            <VoiceRecorder onChange={setVoiceNote} />
          </Section>

          <Section title="Payment Method" step="5">
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  payment === "cod"
                    ? "border-orange bg-orange/5"
                    : "border-border hover:border-orange/40"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-orange"
                />
                <div className="flex-1">
                  <div className="font-semibold text-navy">Cash on Delivery</div>
                  <div className="text-xs text-muted-foreground">
                    Pay with cash when your order arrives.
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                  payment === "upi"
                    ? "border-orange bg-orange/5"
                    : "border-border hover:border-orange/40"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === "upi"}
                  onChange={(e) => setPayment(e.target.value)}
                  className="accent-orange"
                />
                <div className="flex-1">
                  <div className="font-semibold text-navy">UPI</div>
                  <div className="text-xs text-muted-foreground">
                    Pay via UPI — our team will share payment details after order confirmation.
                  </div>
                </div>
              </label>

              {payment && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-navy/5 border border-navy/10"
                >
                  <Info className="size-5 text-navy flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-navy">
                    Our team will contact you shortly to{" "}
                    <span className="font-semibold">confirm the order</span>.
                  </div>
                </motion.div>
              )}
            </div>
          </Section>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-6 h-fit">
          <div className="bg-card rounded-3xl border border-border p-6">
            <div className="font-display font-bold text-xl text-navy">
              Order Summary
            </div>

            <div className="mt-5 space-y-3 max-h-[300px] overflow-y-auto">
              {items.map((it) => (
                <div key={it.productId} className="flex gap-3">
                  <img
                    src={it.image}
                    alt={it.name}
                    className="size-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-navy leading-tight">
                      {it.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {it.kg > 0 && `${it.kg} × 1KG`}
                      {it.kg > 0 && it.halfKg > 0 && " · "}
                      {it.halfKg > 0 && `${it.halfKg} × ½KG`}
                    </div>
                  </div>
                  <div className="font-semibold text-navy text-sm">
                    ₹{lineTotal(it)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <Row label="Subtotal" value={`₹${total}`} />
              <Row label="Delivery" value="Free" />
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="font-display font-bold text-navy">Total</span>
                <span className="font-display font-bold text-2xl text-navy">
                  ₹{total}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-orange text-navy py-4 rounded-full font-bold hover:shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                "Placing order..."
              ) : (
                <>
                  <CheckCircle2 className="size-5" /> Complete Order
                </>
              )}
            </button>
            <p className="mt-3 text-[11px] text-center text-muted-foreground">
              By placing this order you agree to our terms.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-3xl border border-border p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="size-8 rounded-full bg-navy text-white grid place-items-center text-sm font-bold">
          {step}
        </div>
        <h2 className="font-display font-bold text-xl text-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2">
        {label} {required && <span className="text-orange">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
