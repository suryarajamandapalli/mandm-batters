import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useSiteSettings } from "@/store/siteSettings";

export function Contact() {
  const [sending, setSending] = useState(false);
  const { contactPhone, contactEmail, contactAddress } = useSiteSettings();

  const addEnquiry = useSiteSettings((s) => s.addEnquiry);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    
    try {
      addEnquiry({
        name: form.get("name") as string,
        phone: form.get("phone") as string,
        email: form.get("email") as string,
        message: form.get("message") as string,
      });

      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-background">
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-5 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-orange font-black mb-3">
            Get In Touch
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-navy text-balance leading-tight">
            We'd love to hear from you.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-sm md:text-base">
            Questions about our batters, bulk orders, or feedback — drop us a
            message and we'll get back within a few hours.
          </p>

          <div className="mt-10 space-y-3">
            {[
              { icon: Phone, label: "Call us", value: contactPhone },
              { icon: Mail, label: "Email", value: contactEmail },
              { icon: MapPin, label: "Address", value: contactAddress },
            ].map((item, i) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:bg-secondary/50 hover:border-border transition-all"
              >
                <div className="size-12 rounded-xl bg-secondary grid place-items-center text-navy shadow-sm">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground font-black mb-1">
                    {item.label}
                  </div>
                  {item.label === "Call us" ? (
                    <div className="font-bold text-navy flex flex-col">
                      {contactPhone.split(/\s*or\s*|\s*,\s*|\s*\|\s*|\s*and\s*/i).map((part) => {
                        const trimmed = part.trim();
                        const cleaned = trimmed.replace(/[^\d+]/g, "");
                        return (
                          <a key={trimmed} href={`tel:${cleaned}`} className="hover:text-orange transition-colors">
                            {trimmed}
                          </a>
                        );
                      })}
                    </div>
                  ) : item.label === "Email" ? (
                    <div className="font-bold text-navy">
                      <a href={`mailto:${contactEmail}`} className="hover:text-orange transition-colors">
                        {contactEmail}
                      </a>
                    </div>
                  ) : (
                    <div className="font-bold text-navy">{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-6 overflow-hidden rounded-[2rem] border border-border shadow-lg h-[220px] relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3815.494841844365!2d81.79770337515616!3d16.99938078382317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDU5JzU3LjgiTiA4McKwNDgnMDEuMCJF!5e0!3m2!1sen!2sin!4v1779501134183!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="M and M Store Location"
              className="absolute inset-0"
            />
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-secondary/30 rounded-[2.5rem] p-6 md:p-10 border border-border shadow-2xl shadow-navy/5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" type="text" required />
            <Field label="Phone" name="phone" type="tel" required />
          </div>
          <div className="mt-4">
            <Field label="Email" name="email" type="email" />
          </div>
          <div className="mt-4">
            <label className="block text-[10px] uppercase tracking-widest font-black text-muted-foreground mb-2">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full bg-white border border-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange/10 focus:border-orange/50 resize-none transition-all placeholder:text-muted-foreground/30"
              placeholder="Tell us how we can help..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-navy/20 hover:bg-orange hover:text-navy hover:shadow-orange/20 transition-all disabled:opacity-60 active:scale-95"
          >
            {sending ? "Sending..." : "Send Message"}
            <Send className="size-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
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
