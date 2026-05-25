import { create } from "zustand";
import {
  ref,
  onValue,
  set as fbSet,
  remove as fbRemove,
  update as fbUpdate,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { reviews as initialReviews, Review } from "@/data/site";

export type TodayMenuItem = {
  id: string;
  image: string;
};

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  date: string;
  isRead: boolean;
};

type SiteSettingsData = {
  logoUrl: string;
  faviconUrl: string;
  heroHeading: string;
  heroTagline: string;
  heroButtonText: string;
  heroVideoDesktop: string;
  heroVideoMobile: string;
  todayMenu: TodayMenuItem[];
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  footerDescription: string;
  footerCopyright: string;
  mapsLink: string;
  mapsLabel: string;
  whatsappChannelUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
    youtube: string;
    twitter: string;
  };
  reviews: Review[];
  enquiries: Enquiry[];
};

type SiteSettingsState = SiteSettingsData & {
  loading: boolean;
  updateSetting: (key: keyof Omit<SiteSettingsData, "todayMenu" | "reviews" | "enquiries" | "socialLinks">, value: string) => void;
  updateSocialLink: (platform: keyof SiteSettingsData["socialLinks"], url: string) => void;
  addTodayMenu: (item: TodayMenuItem) => void;
  removeTodayMenu: (id: string) => void;
  addReview: (review: Review) => void;
  removeReview: (id: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "date" | "isRead">) => void;
  removeEnquiry: (id: string) => void;
  updateEnquiryStatus: (id: string, isRead: boolean) => void;
  clearAllEnquiries: () => void;
  _setSettings: (settings: Partial<SiteSettingsData>) => void;
};

const defaultSettings: SiteSettingsData = {
  logoUrl: "/Logo.jpeg",
  faviconUrl: "/Logo.jpeg",
  heroHeading: "M and M Batters",
  heroTagline: "The Taste of Home, Delivered Fresh.",
  heroButtonText: "Order Now",
  heroVideoDesktop: "https://youtu.be/9OquUp6x5IU?si=Tf00tvnsv0ANagbC",
  heroVideoMobile: "",
  todayMenu: [],
  contactPhone: "+91 97035 44888 or +91 78935 56888",
  contactEmail: "mandmcloudkitchen@gmail.com",
  contactAddress: "Rajahmundry, Andhra Pradesh",
  footerDescription: "Stone-ground, naturally fermented batter delivered to your door every morning.",
  footerCopyright: "M and M Batters. All rights reserved.",
  mapsLink: "https://www.google.com/maps/place/16%C2%B059'57.8%22N+81%C2%B048'01.0%22E/@16.9993808,81.7977034,17z/",
  mapsLabel: "Visit Our Kitchen",
  whatsappChannelUrl: "",
  socialLinks: { instagram: "", facebook: "", whatsapp: "", youtube: "", twitter: "" },
  reviews: initialReviews,
  enquiries: [],
};

export const useSiteSettings = create<SiteSettingsState>()((set, get) => ({
  ...defaultSettings,
  loading: true,

  _setSettings: (settings) => set({ ...settings, loading: false }),

  updateSetting: (key, value) => {
    set({ [key]: value });
    fbUpdate(ref(rtdb, "siteSettings"), { [key]: value });
  },

  updateSocialLink: (platform, url) => {
    const current = (get() as any).socialLinks || {};
    const updated = { ...current, [platform]: url };
    set({ socialLinks: updated });
    fbUpdate(ref(rtdb, "siteSettings/socialLinks"), { [platform]: url });
  },

  addTodayMenu: (item) => {
    const currentMenu = get().todayMenu || [];
    if (currentMenu.length >= 3) return;
    const newMenu = [...currentMenu, item];
    set({ todayMenu: newMenu });
    fbSet(ref(rtdb, "siteSettings/todayMenu"), newMenu);
  },

  removeTodayMenu: (id) => {
    const newMenu = (get().todayMenu || []).filter((i) => i.id !== id);
    set({ todayMenu: newMenu });
    fbSet(ref(rtdb, "siteSettings/todayMenu"), newMenu);
  },

  addReview: (review) => {
    const newReviews = [...get().reviews, review];
    set({ reviews: newReviews });
    fbSet(ref(rtdb, "siteSettings/reviews"), newReviews);
  },

  removeReview: (id) => {
    const newReviews = get().reviews.filter((r) => r.id !== id);
    set({ reviews: newReviews });
    fbSet(ref(rtdb, "siteSettings/reviews"), newReviews);
  },

  addEnquiry: (enquiryData) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id,
      date: new Date().toISOString(),
      isRead: false,
    };
    const newEnquiries = [newEnquiry, ...get().enquiries];
    set({ enquiries: newEnquiries });
    fbSet(ref(rtdb, "siteSettings/enquiries"), newEnquiries);
  },

  updateEnquiryStatus: (id, isRead) => {
    const newEnquiries = get().enquiries.map((e) =>
      e.id === id ? { ...e, isRead } : e,
    );
    set({ enquiries: newEnquiries });
    fbSet(ref(rtdb, "siteSettings/enquiries"), newEnquiries);
  },

  removeEnquiry: (id) => {
    const newEnquiries = get().enquiries.filter((e) => e.id !== id);
    set({ enquiries: newEnquiries });
    fbSet(ref(rtdb, "siteSettings/enquiries"), newEnquiries);
  },
  clearAllEnquiries: () => {
    set({ enquiries: [] });
    fbRemove(ref(rtdb, "siteSettings/enquiries"));
  },
}));

// ── Real-time listener ──
const settingsRef = ref(rtdb, "siteSettings");
onValue(settingsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    let logoUrl = data.logoUrl ?? defaultSettings.logoUrl;
    let faviconUrl = data.faviconUrl ?? defaultSettings.faviconUrl;
    let heroVideoDesktop = data.heroVideoDesktop ?? defaultSettings.heroVideoDesktop;
    let heroHeading = data.heroHeading ?? defaultSettings.heroHeading;
    let heroTagline = data.heroTagline ?? defaultSettings.heroTagline;
    let footerCopyright = data.footerCopyright ?? defaultSettings.footerCopyright;
    let contactPhone = data.contactPhone ?? defaultSettings.contactPhone;
    let contactEmail = data.contactEmail ?? defaultSettings.contactEmail;
    let contactAddress = data.contactAddress ?? defaultSettings.contactAddress;
    let mapsLink = data.mapsLink ?? defaultSettings.mapsLink;

    // Auto-update outdated assets stored in RTDB
    let needsUpdate = false;
    if (logoUrl.includes("h2batters/logo-h2.png") || logoUrl.includes("ik.imagekit.io/h2batters")) {
      logoUrl = "/Logo.jpeg";
      needsUpdate = true;
    }
    if (faviconUrl.includes("h2batters/logo-h2.png") || faviconUrl.includes("ik.imagekit.io/h2batters")) {
      faviconUrl = "/Logo.jpeg";
      needsUpdate = true;
    }
    // Automatically rewrite domain for Vimeo video and update to the new YouTube video
    if (!heroVideoDesktop || heroVideoDesktop.trim() === "" || heroVideoDesktop.includes("406634811.sd.mp4")) {
      heroVideoDesktop = "https://youtu.be/9OquUp6x5IU?si=Tf00tvnsv0ANagbC";
      needsUpdate = true;
    }

    // Auto-update heading / copyright in RTDB if it contains "Renuka" or "H2 Batters"
    if (heroHeading.includes("Renuka") || heroHeading.includes("Renukas") || heroHeading.includes("H2 Batters")) {
      heroHeading = "M and M Batters";
      needsUpdate = true;
    }
    if (footerCopyright.includes("Renuka") || footerCopyright.includes("Renukas") || footerCopyright.includes("H2 Batters")) {
      footerCopyright = "M and M Batters. All rights reserved.";
      needsUpdate = true;
    }

    // Auto-update tagline if it is the old default or empty
    if (!heroTagline || heroTagline === "Add related tagline below" || heroTagline.trim() === "") {
      heroTagline = "The Taste of Home, Delivered Fresh.";
      needsUpdate = true;
    }

    // Auto-update contact info if it's the old default
    if (!contactPhone || contactPhone === "+91 90000 12345" || contactPhone.includes("90000")) {
      contactPhone = "+91 97035 44888 or +91 78935 56888";
      needsUpdate = true;
    }
    if (!contactEmail || contactEmail === "hello@mandmbatters.in" || contactEmail.includes("hello@mandmbatters") || contactEmail.includes("renuka") || contactEmail.includes("renukas")) {
      contactEmail = "mandmcloudkitchen@gmail.com";
      needsUpdate = true;
    }
    if (!contactAddress || contactAddress === "Bengaluru, Karnataka" || contactAddress.includes("Bengaluru")) {
      contactAddress = "Rajahmundry, Andhra Pradesh";
      needsUpdate = true;
    }
    if (!mapsLink || mapsLink.trim() === "" || mapsLink.includes("12.9716") || mapsLink.includes("Bengaluru")) {
      mapsLink = "https://www.google.com/maps/place/16%C2%B059'57.8%22N+81%C2%B048'01.0%22E/@16.9993808,81.7977034,17z/";
      needsUpdate = true;
    }

    if (needsUpdate) {
      const updates: Record<string, string> = {};
      if (logoUrl !== data.logoUrl) updates.logoUrl = logoUrl;
      if (faviconUrl !== data.faviconUrl) updates.faviconUrl = faviconUrl;
      if (heroVideoDesktop !== data.heroVideoDesktop) updates.heroVideoDesktop = heroVideoDesktop;
      if (heroHeading !== data.heroHeading) updates.heroHeading = heroHeading;
      if (heroTagline !== data.heroTagline) updates.heroTagline = heroTagline;
      if (footerCopyright !== data.footerCopyright) updates.footerCopyright = footerCopyright;
      if (contactPhone !== data.contactPhone) updates.contactPhone = contactPhone;
      if (contactEmail !== data.contactEmail) updates.contactEmail = contactEmail;
      if (contactAddress !== data.contactAddress) updates.contactAddress = contactAddress;
      if (mapsLink !== data.mapsLink) updates.mapsLink = mapsLink;

      if (Object.keys(updates).length > 0) {
        fbUpdate(settingsRef, updates);
      }
    }

    let enquiries = data.enquiries ?? defaultSettings.enquiries;
    if (enquiries && !Array.isArray(enquiries)) {
      enquiries = Object.values(enquiries);
    }

    let todayMenu = data.todayMenu ?? defaultSettings.todayMenu;
    if (todayMenu && !Array.isArray(todayMenu)) {
      todayMenu = Object.values(todayMenu);
    }

    let reviews = data.reviews ?? defaultSettings.reviews;
    if (reviews && !Array.isArray(reviews)) {
      reviews = Object.values(reviews);
    }

    useSiteSettings.getState()._setSettings({
      logoUrl,
      faviconUrl,
      heroHeading,
      heroTagline,
      heroButtonText: data.heroButtonText ?? defaultSettings.heroButtonText,
      heroVideoDesktop,
      heroVideoMobile: data.heroVideoMobile ?? defaultSettings.heroVideoMobile,
      todayMenu,
      contactPhone,
      contactEmail,
      contactAddress,
      footerDescription: data.footerDescription ?? defaultSettings.footerDescription,
      footerCopyright,
      mapsLink,
      mapsLabel: data.mapsLabel ?? defaultSettings.mapsLabel,
      whatsappChannelUrl: data.whatsappChannelUrl ?? defaultSettings.whatsappChannelUrl,
      socialLinks: data.socialLinks ?? defaultSettings.socialLinks,
      reviews,
      enquiries,
    });
  } else {
    // First time: seed Firebase with defaults
    fbSet(settingsRef, defaultSettings);
  }
});
