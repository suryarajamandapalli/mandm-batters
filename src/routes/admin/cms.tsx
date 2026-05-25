import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useSiteSettings } from "@/store/siteSettings";
import { 
  Save, 
  Plus, 
  Trash2, 
  Video, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2, 
  Layout, 
  Star, 
  Upload,
  Image as ImageIcon,
  Monitor,
  Smartphone,
  Edit2,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Twitter,
  Link as LinkIcon,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "@/lib/imagekit";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { MediaUpload } from "@/components/shared/MediaUpload";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/cms")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: CMSPage,
});

function CMSPage() {
  const settings = useSiteSettings();
  const [heroHeadingInput, setHeroHeadingInput] = useState<string>("");
  const [heroTaglineInput, setHeroTaglineInput] = useState<string>("");
  const [heroButtonInput, setHeroButtonInput] = useState<string>("");
  const [newBannerImage, setNewBannerImage] = useState("");
  
  // Footer local state
  const [footerDesc, setFooterDesc] = useState("");
  const [footerCopy, setFooterCopy] = useState("");
  const [mapsLinkInput, setMapsLinkInput] = useState("");
  const [mapsLabelInput, setMapsLabelInput] = useState("");
  const [whatsappChannelUrlInput, setWhatsappChannelUrlInput] = useState("");
  const [socialInputs, setSocialInputs] = useState<Record<string, string>>({});

  if (settings.loading) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-orange" />
          <p className="text-muted-foreground animate-pulse">Fetching site content...</p>
        </div>
      </div>
    );
  }

  const handleSaveHeroText = () => {
    if (heroHeadingInput) settings.updateSetting("heroHeading", heroHeadingInput);
    if (heroTaglineInput) settings.updateSetting("heroTagline", heroTaglineInput);
    if (heroButtonInput) settings.updateSetting("heroButtonText", heroButtonInput);
    toast.success("✅ Hero section updated! Changes are now live on the website.");
  };

  const handleSaveFooter = () => {
    if (footerDesc) settings.updateSetting("footerDescription", footerDesc);
    if (footerCopy) settings.updateSetting("footerCopyright", footerCopy);
    
    if (mapsLinkInput) {
      let url = mapsLinkInput.trim();
      if (url && !url.startsWith("http")) {
        url = "https://" + url;
      }
      settings.updateSetting("mapsLink", url);
    }
    
    if (mapsLabelInput) settings.updateSetting("mapsLabel", mapsLabelInput);

    if (whatsappChannelUrlInput !== undefined && whatsappChannelUrlInput !== "") {
      let url = whatsappChannelUrlInput.trim();
      if (url && !url.startsWith("http")) {
        url = "https://" + url;
      }
      settings.updateSetting("whatsappChannelUrl", url);
    }
    
    // Save social links
    Object.entries(socialInputs).forEach(([key, value]) => {
      settings.updateSocialLink(key as any, value);
    });
    
    toast.success("✅ Footer and channel settings updated!");
  };

  return (
    <ErrorBoundary>
      <div className="space-y-10 max-w-5xl pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-navy">Website Editor</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">Updates reflect live on the website instantly.</p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout className="size-5 text-orange" />
              <h2 className="font-bold text-xl text-navy">Hero Section</h2>
            </div>
            <button
              onClick={handleSaveHeroText}
              className="bg-orange text-navy px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange/80 transition-colors flex items-center gap-2 shadow-lg shadow-orange/20"
            >
              <Save className="size-4" /> Save Changes
            </button>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40 block mb-2">Main Heading</label>
                  <input 
                    defaultValue={settings.heroHeading} 
                    onChange={(e) => setHeroHeadingInput(e.target.value)}
                    placeholder="e.g. M and M Batters"
                    className="w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40 block mb-2">Sub-heading / Tagline</label>
                  <textarea 
                    defaultValue={settings.heroTagline} 
                    onChange={(e) => setHeroTaglineInput(e.target.value)}
                    rows={3} 
                    className="w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all resize-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-navy/40 block mb-2">Button Text</label>
                  <input 
                    defaultValue={settings.heroButtonText} 
                    onChange={(e) => setHeroButtonInput(e.target.value)}
                    className="w-full border rounded-xl p-3.5 text-sm focus:ring-4 focus:ring-orange/10 focus:border-orange outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <MediaUpload 
                    label="Desktop Video"
                    mediaType="video"
                    value={settings.heroVideoDesktop}
                    onChange={(url) => settings.updateSetting("heroVideoDesktop", url)}
                    folder="hero"
                  />
                  <p className="text-[9px] text-center font-black uppercase tracking-widest text-muted-foreground">16:9 Landscape</p>
                </div>
                <div className="space-y-2">
                  <MediaUpload 
                    label="Mobile Video"
                    mediaType="video"
                    value={settings.heroVideoMobile}
                    onChange={(url) => settings.updateSetting("heroVideoMobile", url)}
                    folder="hero"
                  />
                  <p className="text-[9px] text-center font-black uppercase tracking-widest text-muted-foreground">9:16 Portrait</p>
                </div>
              </div>
              <div className="p-4 bg-orange/5 rounded-2xl border border-dashed border-orange/20">
                <p className="text-[10px] text-navy/60 leading-relaxed font-bold italic">
                  💡 **Pro Tip**: Use a landscape video for Desktop and a portrait video for Mobile. This ensures your hero section remains cinematic and immersive on all screens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Branding */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-orange" />
              <h2 className="font-bold text-xl text-navy">Global Branding</h2>
            </div>
          </div>
          <div className="p-6 space-y-10">
            {/* Logo Management */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <MediaUpload 
                  label="Official Logo (Platform Wide)"
                  value={settings.logoUrl}
                  onChange={(url) => settings.updateSetting("logoUrl", url)}
                  folder="branding"
                />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  💡 This logo appears in the <strong>Navbar, Admin Panel, Delivery App,</strong> and all <strong>Login Screens</strong>. Use a high-resolution PNG with transparency for best results.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 bg-navy/5 rounded-[2rem] border border-dashed border-navy/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-navy/40 mb-6">Logo Preview</div>
                <div className="bg-white p-8 rounded-2xl shadow-xl shadow-navy/5">
                  <img src={settings.logoUrl} alt="Logo Preview" className="h-24 w-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Favicon / App Icon Management */}
            <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-border">
              <div className="space-y-4">
                <MediaUpload 
                  label="Browser Favicon / App Icon"
                  value={settings.faviconUrl}
                  onChange={(url) => settings.updateSetting("faviconUrl", url)}
                  folder="branding"
                />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  💡 This icon appears in the <strong>Browser Tab, Mobile Shortcuts,</strong> and <strong>PWA Home Screen</strong>. A square 512x512px image is recommended.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 bg-orange/5 rounded-[2rem] border border-dashed border-orange/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-orange/60 mb-6">Favicon Preview</div>
                <div className="size-16 bg-white rounded-xl shadow-lg shadow-orange/10 overflow-hidden grid place-items-center">
                  <img src={settings.faviconUrl} alt="Favicon Preview" className="size-12 object-contain" />
                </div>
                <p className="mt-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Tab Preview Rendering</p>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Menu Management */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ImageIcon className="size-5 text-orange" />
              <h2 className="font-bold text-xl text-navy">Today's Menu Management</h2>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3 py-1 bg-white/50 rounded-full border border-border">
              {settings.todayMenu?.length || 0} / 3 Items
            </div>
          </div>
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => {
                const item = settings.todayMenu?.[i];
                return (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-border bg-secondary/20 overflow-hidden relative group">
                      {item ? (
                        <>
                          <img src={item.image} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => settings.removeTodayMenu(item.id)} 
                            className="absolute top-2 right-2 size-8 rounded-xl bg-red-500 text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </>
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center p-4 text-center">
                          <Plus className="size-8 text-muted-foreground/30 mb-2" />
                          <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest leading-tight">Slot {i + 1}<br/>Empty</span>
                        </div>
                      )}
                    </div>
                    {!item && (
                      <MediaUpload 
                        label={`Upload Menu ${i + 1}`}
                        value=""
                        onChange={(url) => settings.addTodayMenu({ id: Math.random().toString(36).substr(2, 9), image: url })}
                        folder="menu"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-center text-muted-foreground bg-orange/5 border border-orange/20 rounded-xl px-4 py-3">
              💡 **Menu Strategy**: These images should be **Portrait (3:4)** ratio for a clean mobile display. Only 3 slots are available to maintain a high-quality, focused UI.
            </p>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center gap-3">
            <Star className="size-5 text-orange" />
            <h2 className="font-bold text-xl text-navy">Customer Reviews</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {(settings.reviews || []).map(r => (
                <div key={r.id} className="p-4 bg-secondary/20 rounded-2xl border border-border relative group">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`size-3 ${i < (r.rating || 0) ? "fill-orange text-orange" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-navy italic mb-2">"{r.text}"</p>
                  <div className="text-xs font-bold text-navy">{r.name}, {r.city}</div>
                  <button 
                    onClick={() => settings.removeReview(r.id)} 
                    className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>

            <form 
              className="bg-secondary/30 p-6 rounded-2xl border border-border grid grid-cols-2 md:grid-cols-4 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                settings.addReview({
                  id: Math.random().toString(36).substr(2, 9),
                  name: form.get("name") as string,
                  city: form.get("city") as string,
                  rating: Number(form.get("rating")),
                  text: form.get("text") as string,
                });
                (e.target as HTMLFormElement).reset();
                toast.success("Review added!");
              }}
            >
              <div className="space-y-4 col-span-2">
                <textarea name="text" required placeholder="Review Text" rows={2} className="w-full border rounded-xl p-3 text-sm" />
                <div className="flex gap-4">
                  <input name="name" required placeholder="Customer Name" className="flex-1 border rounded-xl p-2.5 text-sm" />
                  <input name="city" required placeholder="City" className="flex-1 border rounded-xl p-2.5 text-sm" />
                </div>
              </div>
              <div className="space-y-4 flex flex-col justify-between col-span-2 md:col-span-1">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Rating</label>
                  <select name="rating" className="w-full border rounded-xl p-2.5 text-sm">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-orange transition-colors flex items-center justify-center gap-2">
                  <Plus className="size-4" /> Add Review
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Contact Details */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center gap-3">
            <Phone className="size-5 text-orange" />
            <h2 className="font-bold text-xl text-navy">Contact Details</h2>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              settings.updateSetting("contactPhone", form.get("phone") as string);
              settings.updateSetting("contactEmail", form.get("email") as string);
              settings.updateSetting("contactAddress", form.get("address") as string);
              toast.success("Contact details updated!");
            }}
            className="p-6 grid md:grid-cols-3 gap-6"
          >
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input name="phone" defaultValue={settings.contactPhone} className="w-full border rounded-xl p-3 pl-10 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input name="email" defaultValue={settings.contactEmail} className="w-full border rounded-xl p-3 pl-10 text-sm" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Address</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input name="address" defaultValue={settings.contactAddress} className="w-full border rounded-xl p-3 pl-10 text-sm" />
                </div>
                <button type="submit" className="bg-navy text-white px-6 rounded-xl font-bold hover:bg-orange transition-colors">Save</button>
              </div>
            </div>
          </form>
        </section>

        {/* Footer Management */}
        <section className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="size-5 text-orange" />
              <h2 className="font-bold text-xl text-navy">Footer Management</h2>
            </div>
            <button
              onClick={handleSaveFooter}
              className="bg-navy text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange transition-colors flex items-center gap-2 shadow-lg shadow-navy/10"
            >
              <Save className="size-4" /> Update Footer
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Footer Content */}
            <div>
              <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4">Footer Content</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Footer Description</label>
                  <textarea
                    defaultValue={settings.footerDescription}
                    onChange={(e) => setFooterDesc(e.target.value)}
                    rows={3}
                    placeholder="Short description shown below the logo"
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Copyright Text</label>
                  <input
                    defaultValue={settings.footerCopyright}
                    onChange={(e) => setFooterCopy(e.target.value)}
                    placeholder="e.g. M and M Batters. All rights reserved."
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div>
              <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin className="size-4 text-orange" /> Office Location &amp; Maps
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Maps Link Label</label>
                  <input
                    defaultValue={settings.mapsLabel}
                    onChange={(e) => setMapsLabelInput(e.target.value)}
                    placeholder="e.g. Visit Our Kitchen"
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">Google Maps Link</label>
                  <div className="flex gap-2">
                    <input
                      defaultValue={settings.mapsLink}
                      onChange={(e) => setMapsLinkInput(e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="flex-1 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                    />
                    {settings.mapsLink && (
                      <a href={settings.mapsLink} target="_blank" className="bg-secondary px-4 rounded-xl text-xs font-bold text-navy hover:bg-orange hover:text-white transition-colors flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Updates Channel */}
            <div>
              <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe className="size-4 text-orange" /> Updates Channel
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold uppercase text-muted-foreground block mb-1.5">WhatsApp Updates Channel Link</label>
                  <input
                    defaultValue={settings.whatsappChannelUrl}
                    onChange={(e) => setWhatsappChannelUrlInput(e.target.value)}
                    placeholder="e.g. https://whatsapp.com/channel/..."
                    className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    This link is shown as the "Join our channel to get daily updates" button on the customer order success screen.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                <LinkIcon className="size-4 text-orange" /> Social Media Links
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {([
                  { key: "instagram" as const, icon: Instagram, label: "Instagram", placeholder: "https://instagram.com/...", color: "text-pink-500" },
                  { key: "facebook"  as const, icon: Facebook,  label: "Facebook",  placeholder: "https://facebook.com/...", color: "text-blue-600" },
                  { key: "whatsapp"  as const, icon: MessageCircle, label: "WhatsApp Number", placeholder: "+91 99999 00000", color: "text-green-500" },
                  { key: "youtube"   as const, icon: Youtube,   label: "YouTube",   placeholder: "https://youtube.com/...", color: "text-red-500" },
                  { key: "twitter"   as const, icon: Twitter,   label: "Twitter / X", placeholder: "https://x.com/...", color: "text-sky-500" },
                ] as const).map(({ key, icon: Icon, label, placeholder, color }) => (
                  <div key={key}>
                    <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5 mb-1.5">
                      <Icon className={`size-3.5 ${color}`} /> {label}
                    </label>
                    <input
                      defaultValue={settings.socialLinks?.[key] || ""}
                      onChange={(e) => setSocialInputs(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground bg-orange/5 border border-orange/20 rounded-xl px-3 py-2">
                💡 Leave a field blank to hide that social icon in the footer. For WhatsApp, enter just the phone number (e.g. +919999900000).
              </p>
            </div>
          </div>
        </section>

      </div>
    </ErrorBoundary>
  );
}

