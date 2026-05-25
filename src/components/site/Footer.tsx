import { Instagram, Facebook, Twitter, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { useSiteSettings } from "@/store/siteSettings";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const {
    contactPhone,
    contactEmail,
    contactAddress,
    footerDescription,
    footerCopyright,
    mapsLink,
    mapsLabel,
    socialLinks,
  } = useSiteSettings();

  const socials = [
    { key: "instagram", icon: Instagram, href: socialLinks?.instagram, label: "Instagram" },
    { key: "facebook",  icon: Facebook,  href: socialLinks?.facebook,  label: "Facebook" },
    { key: "whatsapp",  icon: MessageCircle, href: socialLinks?.whatsapp ? `https://wa.me/${(socialLinks.whatsapp || "").replace(/\D/g,"")}` : "", label: "WhatsApp" },
    { key: "youtube",   icon: Youtube,   href: socialLinks?.youtube,   label: "YouTube" },
    { key: "twitter",   icon: Twitter,   href: socialLinks?.twitter,   label: "Twitter / X" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink text-white/80">
      <div className="container-px mx-auto max-w-7xl py-12 md:py-16 grid md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            <Logo size="lg" className="size-14" />
            <div>
              <div className="font-display font-black text-xl text-white tracking-tight">
                M and M Batters
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black">
                Healthy & Homemade
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm text-white/50 leading-relaxed">
            {footerDescription || "Stone-ground, naturally fermented batter delivered to your door every morning."}
          </p>

          {/* Social icons */}
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3 flex-wrap">
              {socials.map(({ key, icon: Icon, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 grid place-items-center rounded-full bg-white/5 hover:bg-orange hover:text-navy transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          )}

          {/* Office location / Maps */}
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs text-orange hover:underline font-semibold"
            >
              <MapPin className="size-3.5" />
              {mapsLabel || "Find us on Maps"}
            </a>
          )}
        </div>

        {/* Explore links */}
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-orange font-semibold">
            Explore
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {["Home", "Products", "About", "Reviews", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="hover:text-orange transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-orange font-semibold">
            Contact
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {contactPhone && (
              <li className="flex items-start gap-2">
                <Phone className="size-3.5 text-orange shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  {contactPhone.split(/\s*or\s*|\s*,\s*|\s*\|\s*|\s*and\s*/i).map((part) => {
                    const trimmed = part.trim();
                    const cleaned = trimmed.replace(/[^\d+]/g, "");
                    return (
                      <a key={trimmed} href={`tel:${cleaned}`} className="hover:text-orange transition-colors block">
                        {trimmed}
                      </a>
                    );
                  })}
                </div>
              </li>
            )}
            {contactEmail && (
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 text-orange shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-orange transition-colors">{contactEmail}</a>
              </li>
            )}
            {contactAddress && (
              <li className="flex items-start gap-2">
                <MapPin className="size-3.5 text-orange shrink-0 mt-0.5" />
                <span className="text-white/60">{contactAddress}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {footerCopyright || "M and M Batters. All rights reserved."}</div>
          <div className="flex gap-4 font-medium text-white/70">
            <a href="/admin" className="hover:text-orange transition-colors">Admin Login</a>
            <a href="/delivery" className="hover:text-orange transition-colors">Delivery Login</a>
          </div>
          <div>Made by <span className="text-orange font-semibold">WEBDEN</span></div>
        </div>
      </div>
    </footer>
  );
}
