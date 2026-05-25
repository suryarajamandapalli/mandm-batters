import { create } from "zustand";
import {
  ref,
  onValue,
  set as fbSet,
  remove as fbRemove,
  update as fbUpdate,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";

export type DeliveryPartner = {
  id: string; // The Partner ID used for login
  passcode: string;
  name: string;
  phone: string;
  image: string;
  address: string;
  externalWork?: string;
};

type DeliveryPartnerState = {
  partners: DeliveryPartner[];
  loading: boolean;
  addPartner: (partner: DeliveryPartner) => void;
  updatePartner: (id: string, updates: Partial<DeliveryPartner>) => void;
  deletePartner: (id: string) => void;
  _setPartners: (partners: DeliveryPartner[]) => void;
};

export const useDeliveryPartners = create<DeliveryPartnerState>()((set) => ({
  partners: [],
  loading: true,

  _setPartners: (partners) => set({ partners, loading: false }),

  addPartner: (partner) => {
    set((state) => ({ partners: [...state.partners, partner] }));
    fbSet(ref(rtdb, `deliveryPartners/${partner.id}`), partner);
  },

  updatePartner: (id, updates) => {
    set((state) => ({
      partners: state.partners.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    fbUpdate(ref(rtdb, `deliveryPartners/${id}`), updates);
  },

  deletePartner: (id) => {
    set((state) => ({ partners: state.partners.filter((p) => p.id !== id) }));
    fbRemove(ref(rtdb, `deliveryPartners/${id}`));
  },
}));

// ── Real-time listener ──
const partnersRef = ref(rtdb, "deliveryPartners");
onValue(partnersRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const partners: DeliveryPartner[] = Object.values(data);
    useDeliveryPartners.getState()._setPartners(partners);
  } else {
    useDeliveryPartners.getState()._setPartners([]);
  }
});
