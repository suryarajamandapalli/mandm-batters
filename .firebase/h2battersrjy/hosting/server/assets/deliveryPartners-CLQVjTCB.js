import { d as create, r as remove, e as ref, f as rtdb, g as update, s as set, o as onValue } from "./router-Bieu8wEH.js";
const useDeliveryPartners = create()((set$1) => ({
  partners: [],
  loading: true,
  _setPartners: (partners) => set$1({ partners, loading: false }),
  addPartner: (partner) => {
    set$1((state) => ({ partners: [...state.partners, partner] }));
    set(ref(rtdb, `deliveryPartners/${partner.id}`), partner);
  },
  updatePartner: (id, updates) => {
    set$1((state) => ({
      partners: state.partners.map((p) => p.id === id ? { ...p, ...updates } : p)
    }));
    update(ref(rtdb, `deliveryPartners/${id}`), updates);
  },
  deletePartner: (id) => {
    set$1((state) => ({ partners: state.partners.filter((p) => p.id !== id) }));
    remove(ref(rtdb, `deliveryPartners/${id}`));
  }
}));
const partnersRef = ref(rtdb, "deliveryPartners");
onValue(partnersRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const partners = Object.values(data);
    useDeliveryPartners.getState()._setPartners(partners);
  } else {
    useDeliveryPartners.getState()._setPartners([]);
  }
});
export {
  useDeliveryPartners as u
};
