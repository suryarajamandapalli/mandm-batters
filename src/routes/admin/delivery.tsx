import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useDeliveryPartners } from "@/store/deliveryPartners";
import { Plus, Trash2, Key, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { MediaUpload } from "@/components/shared/MediaUpload";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/delivery")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: DeliveryPartnersPage,
});

function DeliveryPartnersPage() {
  const partners = useDeliveryPartners((s) => s.partners);
  const addPartner = useDeliveryPartners((s) => s.addPartner);
  const deletePartner = useDeliveryPartners((s) => s.deletePartner);
  const updatePartner = useDeliveryPartners((s) => s.updatePartner);

  const [isAdding, setIsAdding] = useState(false);
  const [newPartnerImage, setNewPartnerImage] = useState("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop");

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy">Delivery Partners</h1>
            <p className="text-muted-foreground mt-1">Manage delivery personnel and access credentials.</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-navy text-white px-5 py-2.5 rounded-full font-semibold hover:bg-orange transition-colors flex items-center gap-2"
          >
            <Plus className="size-4" /> Add Partner
          </button>
        </div>

        {isAdding && (
          <form 
            className="bg-white p-8 rounded-[2rem] border border-border grid sm:grid-cols-2 gap-6 shadow-xl relative overflow-hidden"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              addPartner({
                id: form.get("id") as string,
                passcode: form.get("passcode") as string,
                name: form.get("name") as string,
                phone: form.get("phone") as string,
                image: newPartnerImage,
                address: form.get("address") as string,
                externalWork: form.get("externalWork") as string || "",
              });
              setIsAdding(false);
              setNewPartnerImage("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop");
              toast.success("Delivery partner created successfully!");
            }}
          >
            <div className="sm:col-span-2 flex items-center justify-between mb-2">
               <h3 className="font-bold text-navy">Partner Registration</h3>
               <button type="button" onClick={() => setIsAdding(false)} className="text-muted-foreground hover:text-navy"><Trash2 className="size-5" /></button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">Partner ID (Login)</label>
              <input name="id" required autoComplete="off" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" placeholder="e.g. DP001" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">Passcode (Login)</label>
              <input name="passcode" required type="password" autoComplete="new-password" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" placeholder="••••" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">Full Name</label>
              <input name="name" required autoComplete="off" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">Phone</label>
              <input name="phone" required type="tel" autoComplete="off" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" />
            </div>
            <div className="sm:col-span-2">
               <MediaUpload 
                 label="Profile Photo"
                 value={newPartnerImage}
                 onChange={setNewPartnerImage}
               />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">Address</label>
              <input name="address" required autoComplete="off" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">External Work (Optional)</label>
              <textarea name="externalWork" autoComplete="off" className="w-full border-2 border-secondary rounded-2xl p-4 text-sm font-bold text-navy focus:border-orange outline-none transition-all resize-none" rows={3} placeholder="e.g. Pick up general store order, collect cash from call orders..." />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3.5 rounded-xl font-bold text-navy/60 hover:bg-secondary transition-all">Cancel</button>
              <button type="submit" className="px-10 py-3.5 rounded-xl bg-navy text-white font-black uppercase tracking-widest hover:bg-orange hover:text-navy transition-all shadow-lg shadow-navy/10">Register Partner</button>
            </div>
          </form>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(partners || []).map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm relative group overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2">
                 <button onClick={() => deletePartner(p.id)} className="p-2 bg-white/80 backdrop-blur rounded-full text-red-500 hover:bg-red-50 hover:scale-110 transition-all"><Trash2 className="size-4" /></button>
              </div>
              
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="size-16 rounded-full object-cover border-2 border-orange/20" />
                <div>
                  <h3 className="font-display font-bold text-lg text-navy">{p.name}</h3>
                  <div className="text-xs font-medium text-orange flex items-center gap-1 mt-0.5"><Key className="size-3" /> ID: {p.id}</div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-secondary rounded-lg text-navy"><Phone className="size-4" /></div>
                  {p.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-secondary rounded-lg text-navy"><MapPin className="size-4" /></div>
                  {p.address}
                </div>
                <div className="space-y-1.5 pt-2.5 border-t border-secondary/60">
                  <label className="text-[10px] font-black uppercase text-navy/40 tracking-[0.2em] ml-1">External Work (Optional)</label>
                  <textarea
                    placeholder="e.g. Pick up general store order, collect cash from call orders..."
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange/30 resize-none"
                    rows={2}
                    value={p.externalWork || ""}
                    onChange={(e) => {
                      updatePartner(p.id, { externalWork: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {(partners || []).length === 0 && !isAdding && (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-3xl">
              No delivery partners added yet.
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
