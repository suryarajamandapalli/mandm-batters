import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { useDeliveryAuth } from "@/store/deliveryAuth";
import { LogOut, Truck } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

export const Route = createFileRoute("/delivery")({
  beforeLoad: ({ location }) => {
    const isLogged = !!useDeliveryAuth.getState().currentPartner;
    if (!isLogged && location.pathname !== "/delivery/login") {
      throw redirect({ to: "/delivery/login" });
    }
  },
  component: DeliveryLayout,
});

function DeliveryLayout() {
  const currentPartner = useDeliveryAuth((s) => s.currentPartner);
  const logout = useDeliveryAuth((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/delivery/login" });
  };

  return (
    <div className="min-h-[100svh] bg-secondary/30 flex flex-col">
      {currentPartner && (
        <header className="bg-navy text-white sticky top-0 z-10 shadow-sm">
          <div className="container-px mx-auto max-w-3xl h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="font-display font-black tracking-tight">Partner <span className="text-orange">HUB</span></span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <img src={currentPartner.image} alt="" className="size-8 rounded-full border border-white/20 object-cover" />
                <span className="hidden sm:inline font-medium">{currentPartner.name}</span>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Logout">
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 w-full max-w-3xl mx-auto container-px py-6">
        <Outlet />
      </main>
    </div>
  );
}
