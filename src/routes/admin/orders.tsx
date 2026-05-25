import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
import { useOrders, Order, OrderStatus, AddressGrid } from "@/store/orders";
import { useDeliveryPartners } from "@/store/deliveryPartners";
import { useProductsStore } from "@/store/products";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Edit, 
  CheckCircle, 
  Truck, 
  PackageCheck, 
  User, 
  Loader2,
  Volume2,
  Download,
  Play,
  Pause,
  X,
  Save,
  CreditCard,
  Wallet,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { openWhatsApp } from "@/lib/whatsapp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/orders")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: OrdersPage,
});

import { useAdminFilter } from "@/store/adminFilter";

function OrdersPage() {
  const { orders, loading, addOrder, updateOrderStatus, assignPartner } = useOrders();
  const { selectedDate } = useAdminFilter();
  const [isAddOpen, setIsAddOpen] = useState(false);
  
  if (loading || !orders) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-orange" />
          <p className="text-muted-foreground animate-pulse">Syncing orders...</p>
        </div>
      </div>
    );
  }

  // GLOBAL FILTER: Only show orders from the selected date
  const safeOrders = (Array.isArray(orders) ? orders : []).filter(o => {
    if (!o.date) return false;
    return o.date.split("T")[0] === selectedDate;
  });

  const columns: { id: OrderStatus; label: string; icon: any }[] = [
    { id: "new", label: "New Orders", icon: PackageCheck },
    { id: "confirmed", label: "Confirmed", icon: CheckCircle },
    { id: "dispatched", label: "Dispatched", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy">Order Management</h1>
            <p className="text-muted-foreground mt-1">Manage order workflow and assign delivery partners.</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-orange text-navy px-6 py-3 rounded-full font-black text-sm hover:bg-orange/80 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange/20 self-start sm:self-auto"
          >
            <Plus className="size-4" /> Create Manual Order
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 min-h-[calc(100vh-220px)]">
          {columns.map((col) => (
            <div key={col.id} className="bg-secondary/30 rounded-3xl p-4 border border-border flex flex-col min-h-[400px]">
              <div className="flex items-center gap-2 mb-4 px-2">
                <col.icon className="size-5 text-orange" />
                <h2 className="font-bold text-lg text-navy">{col.label}</h2>
                <span className="ml-auto bg-white/50 text-navy font-semibold text-xs px-2 py-1 rounded-full">
                  {safeOrders.filter((o) => o.status === col.id).length}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {safeOrders
                  .filter((o) => o.status === col.id)
                  .map((order) => (
                    <OrderCard key={order.uid} order={order} />
                  ))}
                {safeOrders.filter((o) => o.status === col.id).length === 0 && (
                  <div className="text-center py-12 bg-white/40 rounded-2xl border border-dashed border-secondary/50">
                    <PackageCheck className="size-8 mx-auto text-muted-foreground/20 mb-2" />
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">No {col.label}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <AddManualOrderModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSave={async (orderPayload, partnerId, externalDriverName) => {
            try {
              const newOrder = await addOrder(orderPayload);
              if (partnerId) {
                const updates: any = { status: "confirmed", assignedPartnerId: partnerId };
                if (partnerId === "external" && externalDriverName) {
                  updates.externalDeliveryName = externalDriverName;
                }
                updateOrderDetails(newOrder.uid, updates);
              }
              toast.success(`Order #${newOrder.id} created successfully!`);
            } catch (err) {
              console.error("Failed to create manual order:", err);
              toast.error("Failed to create manual order.");
            }
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

function VoiceNotePlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
  };

  return (
    <div className="mt-3 bg-navy/5 rounded-xl p-2 flex items-center gap-3 border border-navy/10">
      <button 
        onClick={toggle}
        className="size-8 rounded-full bg-navy text-white grid place-items-center flex-shrink-0"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
      </button>
      <div className="flex-1">
        <div className="text-[10px] font-bold text-navy uppercase tracking-wider">Voice Note</div>
        <div className="h-1 bg-navy/10 rounded-full mt-1 overflow-hidden">
          {playing && <div className="h-full bg-orange animate-progress" />}
        </div>
      </div>
      <a 
        href={url} 
        download 
        target="_blank"
        className="size-8 rounded-full bg-white hover:bg-orange hover:text-white grid place-items-center transition-colors shadow-sm"
      >
        <Download className="size-4" />
      </a>
      <audio 
        ref={audioRef} 
        src={url} 
        onPlay={() => setPlaying(true)} 
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="hidden" 
      />
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const { updateOrderStatus, assignPartner, updateOrderPaymentStatus, updateOrderDetails } = useOrders();
  const partners = useDeliveryPartners((s) => s.partners);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleConfirm = () => {
    updateOrderStatus(order.uid, "confirmed");
    toast.success("Order confirmed!");
    openWhatsApp(order.phone, `Hello ${order.customerName}, your order ${order.id} from M and M Batters is confirmed!`);
  };

  const handleDispatch = () => {
    updateOrderStatus(order.uid, "dispatched");
    toast.success("Order dispatched!");
    openWhatsApp(order.phone, `Hello ${order.customerName}, your order ${order.id} has been dispatched and will reach you soon!`);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Date unavailable";
      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return "Date unavailable";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border relative group hover:border-orange/30 transition-all">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-navy text-xs flex items-center gap-2">
            Order #{order.id}
            <button 
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
            >
              <Edit className="size-3 text-muted-foreground" />
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
            {formatDate(order.date)}
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-orange text-sm">₹{order.totalAmount || 0}</div>
          <div className={`text-[10px] font-bold ${order.isPaid ? "text-green-600" : "text-orange-600"}`}>
            {order.isPaid ? "PAID" : "UNPAID"}
          </div>
        </div>
      </div>

      <div className="py-2 border-y border-secondary/50 my-2">
        <div className="font-semibold text-navy text-sm mb-1">{order.customerName}</div>
        <div className="flex items-center gap-3">
          <a href={`tel:${order.phone}`} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            <Phone className="size-2.5" /> Call
          </a>
          <button 
            onClick={() => openWhatsApp(order.phone, `Hello ${order.customerName}, about your order ${order.id}...`)} 
            className="flex items-center gap-1 text-[10px] font-bold text-green-600 hover:bg-green-50 px-2 py-0.5 rounded-full border border-green-100"
          >
            <MessageCircle className="size-2.5" /> WhatsApp
          </button>
        </div>
        
        <div className="mt-2 text-[11px] text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-secondary shadow-inner">
          <div className="font-bold text-navy text-[10px] uppercase mb-1 flex items-center gap-1.5">
            <MapPin className="size-3 text-orange" />
            Delivery Address & Location
          </div>
          {order.address ? (
            <div className="leading-tight text-navy/70">
              {order.address.door && <span className="font-bold">{order.address.door}, </span>}
              {order.address.apartment && <span>{order.address.apartment}, </span>}
              {order.address.floor && <span>Fl {order.address.floor}, </span>}
              {order.address.street}
            </div>
          ) : (
            <span className="text-red-500 font-bold">Address missing</span>
          )}
          {(order.mapsLink || order.mapsLocation) && (
             <div className="mt-2">
               <a 
                 href={order.mapsLink || `https://maps.google.com/?q=${order.mapsLocation}`} 
                 target="_blank" 
                 className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition-all text-[9px] uppercase tracking-wider shadow-sm"
               >
                 <MapPin className="size-2.5" /> Open Google Maps
               </a>
             </div>
          )}
        </div>

        {order.voiceNoteUrl && (
          <div className="mt-2 p-1 bg-orange/5 border border-orange/10 rounded-2xl">
            <VoiceNotePlayer url={order.voiceNoteUrl} />
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3">
        {(order.items || []).map((it, idx) => (
          <div key={`${order.uid}-${it.productId}-${idx}`} className="text-[11px] flex justify-between">
            <span className="text-navy font-medium">
              {it.kg > 0 ? `${it.kg}kg ` : ""}
              {it.halfKg > 0 ? `${it.halfKg}x0.5kg ` : ""}
              {it.name}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-secondary/30">
          <div className="flex items-center gap-1.5">
            {order.paymentMethod === "Cash" ? <Wallet className="size-3 text-green-600" /> : <CreditCard className="size-3 text-blue-600" />}
            <span className="text-[10px] font-bold text-navy uppercase">{order.paymentMethod}</span>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={order.isPaid}
              onChange={(e) => updateOrderPaymentStatus(order.uid, e.target.checked, "Admin")}
              className="size-3 rounded border-gray-300 text-orange focus:ring-orange"
            />
            <span className="text-[10px] font-bold text-navy uppercase">Mark Paid</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {order.status === "new" && (
          <button onClick={handleConfirm} className="w-full bg-navy text-white text-[10px] font-bold py-2.5 rounded-xl hover:bg-orange transition-colors uppercase tracking-wider">
            Confirm Order
          </button>
        )}

        {order.status === "confirmed" && (
          <>
            <select 
              className="w-full text-[10px] font-semibold p-2 rounded-xl border border-border bg-white"
              value={order.assignedPartnerId || ""}
              onChange={(e) => assignPartner(order.uid, e.target.value)}
            >
              <option value="" disabled>Assign Delivery Partner</option>
              {(partners || []).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              <option value="external">External / Custom Driver</option>
            </select>

            {order.assignedPartnerId === "external" && (
              <input
                type="text"
                placeholder="Driver details (e.g. Dunzo, Rapido)"
                className="w-full text-[10px] font-semibold p-2.5 rounded-xl border border-border bg-white mt-1 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30"
                value={order.externalDeliveryName || ""}
                onChange={(e) => updateOrderDetails(order.uid, { externalDeliveryName: e.target.value })}
              />
            )}

            <div className="space-y-1 mt-1.5">
              <div className="text-[8px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">External Work / Delivery Notes (Optional)</div>
              <input
                type="text"
                placeholder="e.g. Call before reaching, deliver by 8 AM"
                className="w-full text-[10px] font-semibold p-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30"
                value={order.deliveryNotes || ""}
                onChange={(e) => {
                  updateOrderDetails(order.uid, { deliveryNotes: e.target.value });
                }}
              />
            </div>

            <button 
              onClick={handleDispatch} 
              disabled={!order.assignedPartnerId || (order.assignedPartnerId === "external" && !order.externalDeliveryName?.trim())}
              className="w-full bg-orange text-navy text-[10px] font-bold py-2.5 rounded-xl hover:bg-orange/80 transition-colors disabled:opacity-50 uppercase tracking-wider mt-1.5"
            >
              Mark Dispatched
            </button>
          </>
        )}

        {(order.status === "dispatched" || order.status === "delivered") && (
          <div className="flex items-center gap-2 text-[10px] font-bold text-navy bg-secondary/50 p-2 rounded-xl border border-secondary">
             <User className="size-3.5 text-orange" /> 
             {order.assignedPartnerId === "external" 
               ? (order.externalDeliveryName || "External Delivery") 
               : (partners.find(p => p.id === order.assignedPartnerId)?.name || "Unassigned")}
          </div>
        )}
      </div>

      <EditOrderModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)} 
        order={order} 
        onSave={(updates) => {
          updateOrderDetails(order.uid, updates);
          toast.success("Order details updated.");
        }}
      />
    </div>
  );
}

function EditOrderModal({ 
  isOpen, 
  onClose, 
  order, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  order: Order;
  onSave: (updates: Partial<Order>) => void;
}) {
  const [formData, setFormData] = useState({
    customerName: order.customerName,
    phone: order.phone,
    apartment: order.address?.apartment || "",
    street: order.address?.street || "",
    door: order.address?.door || "",
    floor: order.address?.floor || "",
    mapsLocation: order.mapsLocation || "",
    paymentMethod: order.paymentMethod
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      customerName: formData.customerName,
      phone: formData.phone,
      address: {
        apartment: formData.apartment,
        street: formData.street,
        door: formData.door,
        floor: formData.floor
      },
      mapsLocation: formData.mapsLocation,
      paymentMethod: formData.paymentMethod as "Cash" | "UPI"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-bold text-navy">Edit Order Details</DialogTitle>
          <DialogDescription className="sr-only">Update customer information and delivery address for order {order.id}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Address Details</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Door #" value={formData.door} onChange={e => setFormData({...formData, door: e.target.value})} />
              <Input placeholder="Floor" value={formData.floor} onChange={e => setFormData({...formData, floor: e.target.value})} />
            </div>
            <Input placeholder="Apartment" value={formData.apartment} onChange={e => setFormData({...formData, apartment: e.target.value})} />
            <Input placeholder="Street" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maps">Maps Location (Lat,Lng)</Label>
            <Input id="maps" value={formData.mapsLocation} onChange={e => setFormData({...formData, mapsLocation: e.target.value})} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select value={formData.paymentMethod} onValueChange={v => setFormData({...formData, paymentMethod: v as "Cash" | "UPI"})}>
              <SelectTrigger id="payment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-xl border border-border font-bold text-navy hover:bg-secondary">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-navy text-white px-4 py-2 rounded-xl font-bold hover:bg-orange transition-colors flex items-center justify-center gap-2">
              <Save className="size-4" /> Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddManualOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderData: any, partnerId?: string, externalDriverName?: string) => void;
}

function AddManualOrderModal({ isOpen, onClose, onSave }: AddManualOrderModalProps) {
  const products = useProductsStore((s) => s.products);
  const partners = useDeliveryPartners((s) => s.partners);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    apartment: "",
    street: "",
    door: "",
    floor: "",
    paymentMethod: "Cash" as "Cash" | "UPI"
  });

  const [selectedPartner, setSelectedPartner] = useState<string>("");
  const [externalDriverName, setExternalDriverName] = useState<string>("");
  const [deliveryNotes, setDeliveryNotes] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<string, { kg: number; halfKg: number }>>({});

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setFormData({
        customerName: "",
        phone: "",
        apartment: "",
        street: "",
        door: "",
        floor: "",
        paymentMethod: "Cash"
      });
      setSelectedPartner("");
      setExternalDriverName("");
      setDeliveryNotes("");
      setQuantities({});
    }
  }, [isOpen]);

  const handleQtyChange = (productId: string, type: 'kg' | 'halfKg', delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || { kg: 0, halfKg: 0 };
      const nextVal = Math.max(0, current[type] + delta);
      return {
        ...prev,
        [productId]: {
          ...current,
          [type]: nextVal
        }
      };
    });
  };

  const selectedItems = useMemo(() => {
    const items: any[] = [];
    Object.entries(quantities).forEach(([productId, qtys]) => {
      if (qtys.kg > 0 || qtys.halfKg > 0) {
        const prod = products.find(p => p.id === productId);
        if (prod) {
          items.push({
            productId: prod.id,
            name: prod.name,
            image: prod.image,
            pricePerKg: prod.pricePerKg,
            pricePerHalfKg: prod.pricePerHalfKg,
            kg: qtys.kg,
            halfKg: qtys.halfKg
          });
        }
      }
    });
    return items;
  }, [quantities, products]);

  const totalAmount = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      return sum + (item.kg * item.pricePerKg) + (item.halfKg * item.pricePerHalfKg);
    }, 0);
  }, [selectedItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.street) {
      toast.error("Please fill in customer name, phone and street address.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    const orderPayload = {
      customerName: formData.customerName,
      phone: formData.phone,
      address: {
        apartment: formData.apartment,
        street: formData.street,
        door: formData.door,
        floor: formData.floor
      },
      mapsLocation: "",
      mapsLink: "",
      voiceNote: false,
      voiceNoteUrl: "",
      paymentMethod: formData.paymentMethod,
      items: selectedItems,
      totalAmount,
      deliveryNotes: deliveryNotes.trim() || ""
    };

    onSave(orderPayload, selectedPartner, externalDriverName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto rounded-3xl custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-bold text-navy flex items-center gap-2">
             <Plus className="size-5 text-orange" /> Create Manual Order
          </DialogTitle>
          <DialogDescription>
            Enter order details for orders taken via phone calls or WhatsApp messages.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="custName">Customer Name *</Label>
              <Input 
                id="custName" 
                placeholder="e.g. John Doe"
                value={formData.customerName} 
                onChange={e => setFormData({ ...formData, customerName: e.target.value })} 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="custPhone">Phone Number *</Label>
              <Input 
                id="custPhone" 
                type="tel"
                placeholder="e.g. +91 9876543210"
                value={formData.phone} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                required 
              />
            </div>
          </div>

          {/* Address Info */}
          <div className="space-y-2 border-t border-border pt-3">
            <Label className="text-xs uppercase font-black tracking-wider text-muted-foreground">Delivery Address</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                placeholder="Door #" 
                value={formData.door} 
                onChange={e => setFormData({ ...formData, door: e.target.value })} 
                required
              />
              <Input 
                placeholder="Floor" 
                value={formData.floor} 
                onChange={e => setFormData({ ...formData, floor: e.target.value })} 
              />
            </div>
            <Input 
              placeholder="Apartment / Landmark *" 
              value={formData.apartment} 
              onChange={e => setFormData({ ...formData, apartment: e.target.value })} 
              required
            />
            <Input 
              placeholder="Street Address *" 
              value={formData.street} 
              onChange={e => setFormData({ ...formData, street: e.target.value })} 
              required
            />
          </div>

          {/* Product Selection */}
          <div className="space-y-2 border-t border-border pt-3">
            <Label className="text-xs uppercase font-black tracking-wider text-muted-foreground">Select Products</Label>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 border border-border rounded-xl p-3 bg-secondary/10">
              {products.map(p => {
                const qty = quantities[p.id] || { kg: 0, halfKg: 0 };
                return (
                  <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2.5 border-b border-border last:border-b-0 gap-2">
                    <div>
                      <div className="font-semibold text-navy text-xs">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        ₹{p.pricePerKg}/kg · ₹{p.pricePerHalfKg}/½kg
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      {/* 1KG controls */}
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase mb-0.5">1KG</span>
                        <div className="flex items-center gap-1.5 bg-white border rounded-lg px-1.5 py-0.5 shadow-sm">
                          <button type="button" onClick={() => handleQtyChange(p.id, 'kg', -1)} className="text-navy hover:text-orange font-bold text-xs p-0.5">-</button>
                          <span className="text-xs font-black min-w-4 text-center">{qty.kg}</span>
                          <button type="button" onClick={() => handleQtyChange(p.id, 'kg', 1)} className="text-navy hover:text-orange font-bold text-xs p-0.5">+</button>
                        </div>
                      </div>

                      {/* 0.5KG controls */}
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase mb-0.5">½KG</span>
                        <div className="flex items-center gap-1.5 bg-white border rounded-lg px-1.5 py-0.5 shadow-sm">
                          <button type="button" onClick={() => handleQtyChange(p.id, 'halfKg', -1)} className="text-navy hover:text-orange font-bold text-xs p-0.5">-</button>
                          <span className="text-xs font-black min-w-4 text-center">{qty.halfKg}</span>
                          <button type="button" onClick={() => handleQtyChange(p.id, 'halfKg', 1)} className="text-navy hover:text-orange font-bold text-xs p-0.5">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {products.length === 0 && (
                <div className="text-center text-xs text-muted-foreground py-4">
                  No products registered in the database.
                </div>
              )}
            </div>
          </div>

          {/* Payment & Assignment */}
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="manualPayment">Payment Method</Label>
              <Select 
                value={formData.paymentMethod} 
                onValueChange={v => setFormData({ ...formData, paymentMethod: v as "Cash" | "UPI" })}
              >
                <SelectTrigger id="manualPayment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash (COD)</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="manualPartner">Assign Delivery Partner</Label>
              <Select value={selectedPartner} onValueChange={setSelectedPartner}>
                <SelectTrigger id="manualPartner">
                  <SelectValue placeholder="Assign later" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Assign later (Pending)</SelectItem>
                  {partners.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                  <SelectItem value="external">External / Custom Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPartner === "external" && (
            <div className="space-y-1.5 pt-2">
              <Label htmlFor="extDriverName">External Driver Name *</Label>
              <Input 
                id="extDriverName" 
                placeholder="e.g. Dunzo - Suresh, Rapido, Prasad"
                value={externalDriverName} 
                onChange={e => setExternalDriverName(e.target.value)} 
                required 
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="manualNotes">Delivery Notes (Optional)</Label>
            <Input 
              id="manualNotes" 
              placeholder="e.g. Call before reaching, deliver by 8 AM"
              value={deliveryNotes} 
              onChange={e => setDeliveryNotes(e.target.value)} 
            />
          </div>

          {/* Total display and buttons */}
          <div className="bg-secondary/40 p-4 rounded-2xl flex items-center justify-between border border-border mt-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Order Total Amount</div>
              <div className="text-2xl font-black text-navy">₹{totalAmount}</div>
            </div>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 border border-border bg-white text-navy font-bold text-xs rounded-xl hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-navy text-white px-5 py-2.5 font-bold text-xs rounded-xl hover:bg-orange hover:text-navy transition-all shadow-md flex items-center gap-1.5"
              >
                Save Order
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


