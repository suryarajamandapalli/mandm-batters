import { d as create, r as remove, e as ref, f as rtdb, t as toast, g as update, s as set, o as onValue } from "./router-Bieu8wEH.js";
const getDailySequence = (orders, dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return 1;
  const today = dateStr.split("T")[0];
  const todaysOrders = orders.filter((o) => o.date && typeof o.date === "string" && o.date.startsWith(today));
  if (todaysOrders.length === 0) return 1;
  const sequences = todaysOrders.map((o) => o.dailySequence);
  return Math.max(...sequences) + 1;
};
const formatOrderId = (sequence) => {
  return sequence.toString().padStart(2, "0");
};
const useOrders = create()((set$1, get) => ({
  orders: [],
  loading: true,
  _setOrders: (orders) => set$1({ orders, loading: false }),
  addOrder: async (orderData) => {
    console.log("[Store] addOrder initiated:", orderData.customerName);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const datePrefix = (now || "").split("T")[0]?.replace(/-/g, "") || "";
    const sequence = getDailySequence(get().orders, now);
    const shortId = formatOrderId(sequence);
    const uid = `${datePrefix}-${shortId}`;
    console.log("[Store] Generated IDs:", { shortId, uid, sequence });
    const newOrder = {
      ...orderData,
      id: shortId,
      uid,
      date: now,
      status: "new",
      isPaid: false,
      dailySequence: sequence
    };
    try {
      console.log("[Store] Attempting Firebase write for UID:", uid);
      await set(ref(rtdb, `orders/${uid}`), newOrder);
      console.log("[Store] Firebase write success.");
      set$1((state) => ({ orders: [newOrder, ...state.orders] }));
      return newOrder;
    } catch (error) {
      console.error("[Store] Firebase order save error:", error);
      throw error;
    }
  },
  updateOrderStatus: (uid, status) => {
    set$1((state) => ({
      orders: state.orders.map((o) => o.uid === uid ? { ...o, status } : o)
    }));
    update(ref(rtdb, `orders/${uid}`), { status });
  },
  assignPartner: (uid, partnerId) => {
    set$1((state) => ({
      orders: state.orders.map(
        (o) => o.uid === uid ? { ...o, assignedPartnerId: partnerId } : o
      )
    }));
    update(ref(rtdb, `orders/${uid}`), { assignedPartnerId: partnerId });
  },
  updateOrderAddress: (uid, address, mapsLocation) => {
    set$1((state) => ({
      orders: state.orders.map(
        (o) => o.uid === uid ? { ...o, address, mapsLocation } : o
      )
    }));
    update(ref(rtdb, `orders/${uid}`), { address, mapsLocation });
  },
  updateOrderPaymentStatus: (uid, isPaid, collectedBy) => {
    set$1((state) => ({
      orders: state.orders.map(
        (o) => o.uid === uid ? { ...o, isPaid, paymentCollectedBy: collectedBy } : o
      )
    }));
    update(ref(rtdb, `orders/${uid}`), { isPaid, paymentCollectedBy: collectedBy });
  },
  updateOrderDetails: (uid, updates) => {
    set$1((state) => ({
      orders: state.orders.map((o) => o.uid === uid ? { ...o, ...updates } : o)
    }));
    update(ref(rtdb, `orders/${uid}`), updates);
  },
  clearAllData: () => {
    set$1({ orders: [] });
    remove(ref(rtdb, "orders"));
    toast.success("All order data cleared!");
  }
}));
const ordersRef = ref(rtdb, "orders");
onValue(ordersRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const orders = Object.values(data).filter((o) => o && typeof o === "object");
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
export {
  useOrders as u
};
