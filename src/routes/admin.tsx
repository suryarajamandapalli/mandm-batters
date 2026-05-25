import { createFileRoute, Outlet, Link, redirect, useRouter } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";
import { useSiteSettings } from "@/store/siteSettings";
import { Logo } from "@/components/shared/Logo";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  IndianRupee, 
  MessageSquare,
  ExternalLink,
  Menu,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    
    // CRITICAL SECURITY GUARD: Redirect to login if not authenticated
    // and trying to access any admin route other than /admin/login
    if (!isAdmin && location.pathname !== "/admin/login") {
      throw redirect({ to: "/admin/login" });
    }
    
    // Automatic redirect from /admin or /admin/ to dashboard if authenticated
    if (isAdmin && (location.pathname === "/admin" || location.pathname === "/admin/")) {
      throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: AdminLayout,
});

import { useAdminFilter } from "@/store/adminFilter";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";

function AdminLayout() {
  const isAdmin = useAdminAuth((s) => s.isAdmin);
  const logout = useAdminAuth((s) => s.logout);
  const enquiries = useSiteSettings((s) => s.enquiries);
  const unreadEnquiries = enquiries.filter(e => !e.isRead).length;
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { selectedDate, setSelectedDate } = useAdminFilter();

  const navItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
    { label: "Payments", to: "/admin/payments", icon: IndianRupee },
    { label: "Expenses", to: "/admin/expenses", icon: Wallet },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Delivery Partners", to: "/admin/delivery", icon: Users },
    { label: "Enquiries", to: "/admin/enquiries", icon: MessageSquare, badge: unreadEnquiries },
    { label: "Website CMS", to: "/admin/cms", icon: Settings },
  ];

  // ABSOLUTE SECURITY GATE: If not admin, return ONLY the Login Screen.
  // This prevents the Sidebar, Header, and Main Content from even existing in the virtual DOM.
  if (!isAdmin) {
    return <AdminLogin />;
  }

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/admin/login" });
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      <div className={cn(
        "h-20 flex items-center px-8 border-b border-white/5",
        isMobile ? "px-4" : "px-8"
      )}>
        <div className="flex items-center gap-3">
           <Logo size="sm" />
           <div className="font-display font-bold text-xl tracking-tight text-white">Admin <span className="text-orange">HUB</span></div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Main Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            activeProps={{ className: "bg-white/10 text-orange border-l-4 border-orange" }}
            activeOptions={item.to === "/admin/dashboard" ? { exact: true } : {}}
            className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl hover:bg-white/5 transition-all text-white/70 hover:text-white font-bold text-sm group"
          >
            <div className="flex items-center gap-3">
              <item.icon className="size-5 group-hover:scale-110 transition-transform" />
              {item.label}
            </div>
            {item.badge > 0 && (
              <span className="bg-orange text-navy text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-3">
        <Link
          to="/"
          className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest"
        >
          <ExternalLink className="size-4" />
          Live Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-500/10 hover:bg-red-500 transition-all text-red-500 hover:text-white font-bold text-xs uppercase tracking-widest"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-navy text-white flex-col fixed inset-y-0 left-0 shadow-2xl z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden h-16 bg-navy text-white flex items-center justify-between px-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
           <Logo size="sm" />
           <div className="font-display font-bold text-lg tracking-tight">Admin <span className="text-orange">HUB</span></div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile Global Date Filter */}
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1 border border-white/5">
             <CalendarIcon className="size-3.5 text-orange" />
             <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent border-none text-[10px] font-bold text-white outline-none focus:ring-0 p-0"
             />
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Menu className="size-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-navy border-none w-[280px]">
              <SheetHeader className="sr-only">
                <SheetTitle>Admin Navigation</SheetTitle>
              </SheetHeader>
              <SidebarContent isMobile />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen relative flex flex-col">
        {/* Top bar (Desktop only) */}
        <div className="h-20 bg-white/80 backdrop-blur-md border-b border-border hidden lg:flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="font-bold text-navy flex items-center gap-2">
               <div className="size-2 bg-green-500 rounded-full animate-pulse" />
               System: <span className="text-muted-foreground font-medium ml-1">Live</span>
            </div>
            
            {/* GLOBAL DATE FILTER (Desktop) */}
            <div className="flex items-center gap-3 bg-secondary/50 rounded-2xl px-4 py-2 border border-border group hover:border-orange/30 transition-all">
              <CalendarIcon className="size-4 text-orange" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-0.5">Filtering Data For</span>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none text-sm font-black text-navy p-0 focus:ring-0 h-4"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-navy">Administrator</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Master Access</div>
             </div>
             <div className="size-10 rounded-2xl bg-secondary grid place-items-center text-navy font-black border border-border shadow-inner">AD</div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 p-4 md:p-6 lg:p-10 w-full max-w-[1600px] mx-auto">
          <Outlet />
        </div>

        {/* Footer for Admin */}
        <footer className="p-6 text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest border-t border-border mt-auto">
          M and M Batters — Internal Administrative Panel
        </footer>
      </main>
    </div>
  );
}
