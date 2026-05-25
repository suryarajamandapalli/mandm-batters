import { useAdminAuth } from "@/store/adminAuth";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

export function AdminLogin() {
  const login = useAdminAuth((s) => s.login);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;

    // Artificial delay to prevent brute-force feeling and show loading
    setTimeout(() => {
      const success = login(password);
      setLoading(false);

      if (success) {
        toast.success("Access Granted. Welcome, Admin.");
        router.navigate({ to: "/admin/dashboard" });
      } else {
        toast.error("Invalid Administrative Password.");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden my-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-navy/5 rounded-full -ml-16 -mb-16 blur-2xl" />

        <div className="relative">
          <div className="flex justify-center mb-8">
            <Logo size="xl" className="rotate-3" />
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display font-black text-3xl text-navy tracking-tight">Admin Terminal</h1>
            <p className="text-muted-foreground mt-2 font-medium">Enter secure password to continue</p>
          </div>

          <form 
            onSubmit={handleLogin} 
            className="space-y-6"
            autoComplete="off"
          >
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-navy/40 ml-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  name="password"
                  type="password"
                  required
                  autoFocus
                  autoComplete="new-password"
                  className="w-full bg-secondary/50 border-2 border-transparent rounded-2xl px-12 py-4 text-navy font-bold focus:outline-none focus:border-orange focus:bg-white transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange hover:text-navy hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-navy/20 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Authorize Access"
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-50">
              M and M Batters — Internal System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
