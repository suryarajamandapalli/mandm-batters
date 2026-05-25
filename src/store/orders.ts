import { create } from "zustand";
import {
  ref,
  onValue,
  set as fbSet,
  remove as fbRemove,
  update as fbUpdate,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";
import type { CartItem } from "./cart";
import { toast } from "sonner";

export type OrderStatus = "new" | "confirmed" | "dispatched" | "delivered";

export type AddressGrid = {
  apartment: string;
  street: string;
  door: string;
  floor: string;
};

export type Order = {
  id: string; // Strictly 2-digit: 01, 02...
  uid: string; // Internal unique ID: YYYYMMDD-XX
  date: string; // ISO string
  customerName: string;
  phone: string;
  address: AddressGrid;
  mapsLocation: string;
  voiceNote: boolean;
  voiceNoteUrl?: string;
  paymentMethod: "Cash" | "UPI";
  isPaid: boolean;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  assignedPartnerId?: string;
  externalDeliveryName?: string;
  deliveryNotes?: string;
  paymentCollectedBy?: string;
  dailySequence: number;
};

type OrderState = {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, "id" | "uid" | "date" | "status" | "isPaid" | "dailySequence">) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  assignPartner: (id: string, partnerId: string) => void;
  updateOrderAddress: (id: string, address: AddressGrid, mapsLocation: string) => void;
  updateOrderPaymentStatus: (id: string, isPaid: boolean, collectedBy?: string) => void;
  updateOrderDetails: (id: string, updates: Partial<Order>) => void;
  clearAllData: () => void;
  _setOrders: (orders: Order[]) => void;
};

const getDailySequence = (orders: Order[], dateStr: string) => {
  if (!dateStr || typeof dateStr !== 'string') return 1;
  const today = dateStr.split("T")[0];
  const todaysOrders = orders.filter(o => o.date && typeof o.date === 'string' && o.date.startsWith(today));
  if (todaysOrders.length === 0) return 1;
  
  const sequences = todaysOrders.map(o => o.dailySequence);
  return Math.max(...sequences) + 1;
};

const formatOrderId = (sequence: number) => {
  return sequence.toString().padStart(2, "0");
};

export const useOrders = create<OrderState>()((set, get) => ({
  orders: [],
  loading: true,

  _setOrders: (orders) => set({ orders, loading: false }),

  addOrder: async (orderData) => {
    console.log("[Store] addOrder initiated:", orderData.customerName);
    const now = new Date().toISOString();
    const datePrefix = (now || "").split("T")[0]?.replace(/-/g, "") || "";
    const sequence = getDailySequence(get().orders, now);
    const shortId = formatOrderId(sequence);
    const uid = `${datePrefix}-${shortId}`;
    
    console.log("[Store] Generated IDs:", { shortId, uid, sequence });

    const newOrder: Order = {
      ...orderData,
      id: shortId,
      uid,
      date: now,
      status: "new",
      isPaid: false,
      dailySequence: sequence,
    };
    
    try {
      console.log("[Store] Attempting Firebase write for UID:", uid);
      await fbSet(ref(rtdb, `orders/${uid}`), newOrder);
      console.log("[Store] Firebase write success.");
      set((state) => ({ orders: [newOrder, ...state.orders] }));
      return newOrder;
    } catch (error) {
      console.error("[Store] Firebase order save error:", error);
      throw error;
    }
  },

  updateOrderStatus: (uid, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.uid === uid ? { ...o, status } : o)),
    }));
    fbUpdate(ref(rtdb, `orders/${uid}`), { status });
  },

  assignPartner: (uid, partnerId) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.uid === uid ? { ...o, assignedPartnerId: partnerId } : o,
      ),
    }));
    fbUpdate(ref(rtdb, `orders/${uid}`), { assignedPartnerId: partnerId });
  },

  updateOrderAddress: (uid, address, mapsLocation) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.uid === uid ? { ...o, address, mapsLocation } : o,
      ),
    }));
    fbUpdate(ref(rtdb, `orders/${uid}`), { address, mapsLocation });
  },

  updateOrderPaymentStatus: (uid, isPaid, collectedBy) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.uid === uid ? { ...o, isPaid, paymentCollectedBy: collectedBy } : o,
      ),
    }));
    fbUpdate(ref(rtdb, `orders/${uid}`), { isPaid, paymentCollectedBy: collectedBy });
  },

  updateOrderDetails: (uid, updates) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.uid === uid ? { ...o, ...updates } : o)),
    }));
    fbUpdate(ref(rtdb, `orders/${uid}`), updates);
  },

  clearAllData: () => {
    set({ orders: [] });
    fbRemove(ref(rtdb, "orders"));
    toast.success("All order data cleared!");
  },
}));

// ── Real-time listener ──
const ordersRef = ref(rtdb, "orders");
onValue(ordersRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const orders: Order[] = Object.values(data).filter(o => o && typeof o === 'object');
    // Sort by date, newest first, handle missing dates safely
    orders.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
    useOrders.getState()._setOrders(orders);
  } else {
    useOrders.getState()._setOrders([]);
  }
});
