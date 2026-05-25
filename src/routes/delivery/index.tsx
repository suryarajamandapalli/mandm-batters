import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useOrders, Order } from "@/store/orders";
import { useDeliveryAuth } from "@/store/deliveryAuth";
import { useDeliveryPartners } from "@/store/deliveryPartners";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  Calendar as CalendarIcon,
  Wallet,
  CreditCard,
  Package,
  TrendingUp,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { format, isSameDay, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { openWhatsApp } from "@/lib/whatsapp";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export const Route = createFileRoute("/delivery/")({
  component: DeliveryDashboard,
});

function DeliveryDashboard() {
  const partner = useDeliveryAuth((s) => s.currentPartner);
  const partners = useDeliveryPartners((s) => s.partners);
  const livePartner = useMemo(() => {
    return (partners || []).find((p) => p.id === partner?.id);
  }, [partners, partner?.id]);
  const { orders, updateOrderStatus, updateOrderPaymentStatus, loading } = useOrders();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  // ✅ All hooks MUST be called before any early returns (Rules of Hooks)
  const filteredOrders = useMemo(() => {
    if (!partner?.id || !orders) return [];
    const selectedDateStr = selectedDate; // "yyyy-MM-dd"
    return (orders || []).filter((o) => {
      if (!o?.assignedPartnerId || o.assignedPartnerId !== partner.id) return false;
      if (!o?.date) return false;
      const oDateStr = o.date.split("T")[0];
      return oDateStr === selectedDateStr;
    });
  }, [orders, selectedDate, partner?.id]);

  const stats = useMemo(() => {
    const pending = filteredOrders.filter(o => o.status === "dispatched").length;
    const completed = filteredOrders.filter(o => o.status === "delivered").length;
    const cashCollected = filteredOrders
      .filter(o => o.paymentMethod === "Cash" && o.isPaid)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    const upiCollected = filteredOrders
      .filter(o => o.paymentMethod === "UPI" && o.isPaid)
      .reduce((acc, o) => acc + o.totalAmount, 0);
    return { pending, completed, cashCollected, upiCollected };
  }, [filteredOrders]);

  // Early returns come AFTER all hooks
  if (loading) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <Loader2 className="size-10 animate-spin text-orange" />
      </div>
    );
  }

  if (!partner) return null;

  const handleComplete = (order: Order) => {
    updateOrderStatus(order.uid, "delivered");
    toast.success("Order marked as delivered!");
    openWhatsApp(order.phone, `Thanks ${order.customerName}! Your order ${order.id} has been successfully delivered by M and M Batters. Enjoy!`);
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 pb-24">
        {/* Date Filter & Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-2xl text-navy">Partner Portal</h2>
            <div className="bg-white border border-border rounded-xl px-3 py-1 flex items-center gap-2">
              <CalendarIcon className="size-4 text-orange" />
              <Input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-none bg-transparent focus-visible:ring-0 h-8 text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-navy text-white rounded-[2rem] p-5 shadow-lg shadow-navy/10 relative overflow-hidden">
             <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold mb-1">Pending</div>
             <div className="text-3xl font-bold">{stats.pending || 0}</div>
             <Package className="absolute -bottom-2 -right-2 size-16 opacity-10 rotate-12" />
          </div>
          <div className="bg-orange text-navy rounded-[2rem] p-5 shadow-lg shadow-orange/10 relative overflow-hidden">
             <div className="text-[10px] uppercase tracking-wider text-navy/50 font-bold mb-1">Delivered</div>
             <div className="text-3xl font-bold">{stats.completed || 0}</div>
             <CheckCircle2 className="absolute -bottom-2 -right-2 size-16 opacity-10 rotate-12" />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-border shadow-sm">
          <h3 className="text-sm font-bold text-navy uppercase tracking-widest mb-4 flex items-center gap-2">
             <TrendingUp className="size-4 text-orange" />
             Collection Summary
          </h3>
          <div className="grid grid-cols-2 gap-6">
             <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-green-50 text-green-600 grid place-items-center"><Wallet className="size-5" /></div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Cash</div>
                  <div className="text-lg font-bold text-navy">₹{stats.cashCollected || 0}</div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-blue-50 text-blue-600 grid place-items-center"><CreditCard className="size-5" /></div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">UPI</div>
                  <div className="text-lg font-bold text-navy">₹{stats.upiCollected || 0}</div>
                </div>
             </div>
          </div>
        </div>

        {/* External Work / Custom Task */}
        {livePartner?.externalWork && (
          <div className="bg-orange/5 border-2 border-orange/20 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
            <h3 className="text-xs font-black text-orange uppercase tracking-[0.2em] mb-2">External Work (Optional)</h3>
            <p className="text-sm font-bold text-navy whitespace-pre-wrap">{livePartner.externalWork}</p>
          </div>
        )}

        {/* Assigned Orders */}
        <div>
          <h3 className="font-display font-bold text-lg text-navy mb-4">Assigned Routes</h3>
          <div className="space-y-4">
            {(filteredOrders || []).filter(o => o.status === "dispatched").map((order) => (
              <div key={order.id} className="bg-white rounded-3xl p-5 border-2 border-orange/20 shadow-xl shadow-orange/5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-black text-orange uppercase tracking-widest mb-1">Order {order.id}</div>
                    <div className="font-display font-bold text-xl text-navy">{order.customerName}</div>
                  </div>
                  <div className="text-right">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Collect</div>
                     <div className="font-bold text-navy text-xl">₹{order.totalAmount}</div>
                     <div className={`text-[10px] font-bold uppercase ${order.paymentMethod === "Cash" ? "text-green-600" : "text-blue-600"}`}>
                       {order.paymentMethod}
                     </div>
                  </div>
                </div>

                <div className="space-y-3 bg-secondary/30 p-4 rounded-2xl border border-secondary mb-5">
                   <div className="flex items-start gap-3">
                      <MapPin className="size-4 text-orange shrink-0 mt-1" />
                      <div className="text-sm text-navy font-medium leading-relaxed">
                        {order.address?.door}, {order.address?.apartment}, {order.address?.floor && `Floor ${order.address.floor}, `}{order.address?.street}
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Phone className="size-4 text-orange shrink-0" />
                      <div className="text-sm text-navy font-bold">{order.phone}</div>
                   </div>
                   {order.deliveryNotes && (
                      <div className="mt-2.5 pt-2.5 border-t border-secondary/60 text-xs font-semibold text-navy">
                        <span className="font-bold text-orange uppercase tracking-wider block mb-0.5">Delivery Notes (Optional)</span>
                        <p className="font-medium">{order.deliveryNotes}</p>
                      </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                   <div className="grid grid-cols-2 gap-2">
                      <a href={`tel:${order.phone}`} className="flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-secondary text-navy font-bold text-xs hover:bg-navy hover:text-white transition-all">
                        <Phone className="size-4" /> CALL
                      </a>
                      <button 
                        onClick={() => openWhatsApp(order.phone, `Hello ${order.customerName}, this is your delivery partner from M and M Batters...`)}
                        className="flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-green-500 text-white font-bold text-xs hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                      >
                        <MessageCircle className="size-4" /> WHATSAPP
                      </button>
                   </div>
                   
                   {order.mapsLocation && (
                      <a href={`https://maps.google.com/?q=${order.mapsLocation}`} target="_blank" className="flex justify-center items-center gap-2 py-3.5 rounded-2xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                        <Navigation className="size-4" /> NAVIGATE TO MAPS
                      </a>
                   )}

                   <div className="mt-2 pt-4 border-t border-secondary flex flex-col gap-3">
                      <label className="flex items-center justify-between p-4 rounded-2xl bg-green-50 border border-green-100 cursor-pointer select-none">
                         <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              checked={order.isPaid}
                              onChange={(e) => updateOrderPaymentStatus(order.uid, e.target.checked, partner.name)}
                              className="size-5 rounded border-green-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-xs font-bold text-green-900 uppercase">Payment Collected</span>
                         </div>
                         <div className="font-bold text-green-700">₹{order.totalAmount}</div>
                      </label>

                      <button 
                        disabled={!order.isPaid}
                        onClick={() => handleComplete(order)}
                        className="w-full bg-navy text-white py-5 rounded-[1.5rem] font-bold flex justify-center items-center gap-2 hover:bg-orange hover:text-navy transition-all disabled:opacity-20 disabled:grayscale"
                      >
                        <CheckCircle2 className="size-5" /> COMPLETE DELIVERY
                      </button>
                   </div>
                </div>
              </div>
            ))}

            {(filteredOrders || []).filter(o => o.status === "dispatched").length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-border text-muted-foreground shadow-sm">
                <Package className="size-12 mx-auto opacity-10 mb-4" />
                <p className="font-bold text-navy/40 uppercase tracking-widest text-xs">No pending deliveries</p>
              </div>
            )}
          </div>
        </div>
        
        {/* History */}
        {(filteredOrders || []).filter(o => o.status === "delivered").length > 0 && (
          <div className="mt-12">
            <h3 className="font-display font-bold text-lg text-navy mb-4 opacity-60">Delivered Today</h3>
            <div className="space-y-3">
               {(filteredOrders || []).filter(o => o.status === "delivered").map(order => (
                 <div key={order.id} className="bg-white/60 rounded-2xl p-4 border border-border flex justify-between items-center group">
                   <div>
                     <div className="font-bold text-navy text-sm">{order.customerName}</div>
                     <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{order.id} · {order.address?.apartment || 'Unknown'}</div>
                   </div>
                   <div className="text-right">
                      <div className="text-xs font-bold text-navy">₹{order.totalAmount}</div>
                      <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase">
                        <CheckCircle2 className="size-3" /> Delivered
                      </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

