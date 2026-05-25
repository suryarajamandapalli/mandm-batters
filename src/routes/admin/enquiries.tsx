import { createFileRoute } from "@tanstack/react-router";
import { useSiteSettings } from "@/store/siteSettings";
import { format, parseISO } from "date-fns";
import { MessageSquare, Phone, User, Calendar, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import { redirect } from "@tanstack/react-router";
import { useAdminAuth } from "@/store/adminAuth";

export const Route = createFileRoute("/admin/enquiries")({
  beforeLoad: () => {
    const isAdmin = useAdminAuth.getState().isAdmin;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: EnquiriesPage,
});

import { useAdminFilter } from "@/store/adminFilter";

function EnquiriesPage() {
  const { enquiries, loading, removeEnquiry, updateEnquiryStatus } = useSiteSettings();
  const { selectedDate } = useAdminFilter();

  if (loading || !enquiries) {
    return (
      <div className="h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-10 animate-spin text-orange" />
          <p className="text-muted-foreground animate-pulse">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  // Sort enquiries newest first, show all of them so old unread enquiries are visible
  const safeEnquiries = (Array.isArray(enquiries) ? enquiries : []).slice().sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy">Customer Enquiries</h1>
            <p className="text-muted-foreground mt-1">Manage feedback and questions from the website.</p>
          </div>
          <div className="flex items-center gap-2 bg-orange/10 text-orange px-4 py-2 rounded-full border border-orange/20">
             <span className="text-xs font-bold uppercase tracking-widest">Unread:</span>
             <span className="font-display font-black">{safeEnquiries.filter(e => !e.isRead).length}</span>
          </div>
        </div>

        <div className="grid gap-6">
          {safeEnquiries.map((e) => (
            <div 
              key={e.id} 
              className={`bg-white rounded-3xl p-6 md:p-8 border-2 transition-all group relative shadow-sm ${
                e.isRead ? "border-border opacity-75" : "border-orange shadow-xl shadow-orange/5"
              }`}
            >
              {!e.isRead && (
                <div className="absolute -top-3 -left-3 bg-orange text-navy text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg z-10">
                  New Message
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner">
                         <User className="size-5" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Customer</div>
                         <div className="font-bold text-navy text-lg leading-none">{e.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner">
                         <Phone className="size-5" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Contact</div>
                         <a href={`tel:${e.phone}`} className="font-bold text-navy hover:text-orange hover:underline transition-colors">{e.phone}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-secondary grid place-items-center text-navy shadow-inner">
                         <Calendar className="size-5" />
                      </div>
                      <div>
                         <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Received On</div>
                         <div className="font-bold text-navy">{e.date ? format(parseISO(e.date), "PPP p") : "N/A"}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border relative ${e.isRead ? 'bg-secondary/20 border-border' : 'bg-orange/5 border-orange/20'}`}>
                    <MessageSquare className={`absolute -top-3 -left-3 size-8 opacity-10 rotate-12 ${e.isRead ? 'text-navy' : 'text-orange'}`} />
                    <p className={`text-navy leading-relaxed font-medium ${e.isRead ? '' : 'text-lg'}`}>{e.message}</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3">
                  <button 
                    onClick={() => updateEnquiryStatus(e.id, !e.isRead)}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                      e.isRead 
                        ? "bg-secondary text-muted-foreground hover:bg-orange/20 hover:text-orange" 
                        : "bg-navy text-white hover:bg-orange hover:text-navy shadow-lg shadow-navy/20"
                    }`}
                  >
                    {e.isRead ? "Mark Unread" : "Mark as Read"}
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm("Permanently delete this enquiry?")) {
                        removeEnquiry(e.id);
                        toast.success("Enquiry deleted.");
                      }
                    }}
                    className="size-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white grid place-items-center transition-all"
                    title="Delete enquiry"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {safeEnquiries.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-secondary shadow-inner">
              <MessageSquare className="size-16 mx-auto text-muted-foreground/10 mb-6" />
              <h3 className="text-2xl font-display font-bold text-navy">No messages found</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">When customers reach out through your website, their messages will appear here instantly.</p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
