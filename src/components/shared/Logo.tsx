import { useSiteSettings } from "@/store/siteSettings";
import { getImageKitUrl } from "@/lib/imagekit";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, variant = "light", size = "md" }: LogoProps) {
  const { logoUrl: storeLogoUrl } = useSiteSettings();
  const [error, setError] = useState(false);
  
  // Reset error state if logoUrl changes
  useEffect(() => {
    setError(false);
  }, [storeLogoUrl]);

  const sizes = {
    sm: "size-8",
    md: "size-10",
    lg: "size-16",
    xl: "size-24",
  };

  // Cache buster to ensure realtime updates only when the URL actually changes
  const logoUrl = useMemo(() => {
    if (!storeLogoUrl) return null;
    return getImageKitUrl(storeLogoUrl, size === 'sm' ? 100 : 300) + `?v=${new Date().setMinutes(0,0,0)}`;
  }, [storeLogoUrl, size]);

  if (error || !logoUrl) {
    return (
      <div className={cn(
        "rounded-xl bg-orange grid place-items-center font-display font-black text-navy shadow-lg shadow-orange/20 select-none",
        sizes[size],
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-3xl',
        className
      )}>
        H2
      </div>
    );
  }

  return (
    <div className={cn("relative group shrink-0", sizes[size], className)}>
      <img
        src={logoUrl}
        alt="M and M Batters"
        className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
        onError={() => setError(true)}
      />
    </div>
  );
}
