import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useDeliveryPartners } from "@/store/deliveryPartners";
import { useDeliveryAuth } from "@/store/deliveryAuth";
import { Truck } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/delivery/login")({
  component: LoginPage,
});

function LoginPage() {
  const partners = useDeliveryPartners((s) => s.partners);
  const login = useDeliveryAuth((s) => s.login);
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const form = new FormData(e.currentTarget);
    const id = form.get("id") as string;
    const passcode = form.get("passcode") as string;

    setTimeout(() => {
      setLoading(false);
      const partner = partners.find((p) => p.id === id && p.passcode === passcode);
      if (partner) {
        login(partner);
        toast.success(`Welcome back, ${partner.name}!`);
        router.navigate({ to: "/delivery" });
      } else {
        toast.error("Invalid Partner ID or Passcode.");
      }
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm bg-card rounded-3xl border border-border p-8 shadow-xl shadow-navy/5">
        <div className="flex justify-center mb-8">
           <Logo size="xl" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-2xl text-navy">Partner Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to view your assigned deliveries.</p>
        </div>

        <form 
          onSubmit={handleLogin} 
          className="space-y-6"
          autoComplete="off"
        >
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] font-black text-navy/40 mb-2 ml-1">Partner ID</label>
            <input 
              name="id" 
              required 
              autoComplete="off"
              className="w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-navy focus:outline-none focus:border-orange focus:bg-white transition-all" 
              placeholder="e.g. DP001" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] font-black text-navy/40 mb-2 ml-1">Secure Passcode</label>
            <input 
              name="passcode" 
              type="password" 
              required 
              autoComplete="new-password"
              className="w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-navy focus:outline-none focus:border-orange focus:bg-white transition-all" 
              placeholder="••••" 
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange hover:text-navy hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 shadow-xl shadow-navy/10"
          >
            {loading ? "Authenticating..." : "Enter Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
