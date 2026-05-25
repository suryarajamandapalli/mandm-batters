import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DeliveryPartner } from "./deliveryPartners";

type DeliveryAuthState = {
  currentPartner: DeliveryPartner | null;
  login: (partner: DeliveryPartner) => void;
  logout: () => void;
};

export const useDeliveryAuth = create<DeliveryAuthState>()(
  persist(
    (set) => ({
      currentPartner: null,
      login: (partner) => set({ currentPartner: partner }),
      logout: () => set({ currentPartner: null }),
    }),
    { name: "rhb-delivery-auth" },
  ),
);
