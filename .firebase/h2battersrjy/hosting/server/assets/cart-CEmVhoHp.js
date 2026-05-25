import { c as createLucideIcon } from "./createLucideIcon-D5w0REDj.js";
import { d as create, p as persist } from "./router-Bieu8wEH.js";
const __iconNode = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
const useCart = create()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addKg: (p) => set((s) => {
        const existing = s.items.find((i) => i.productId === p.id);
        if (existing) {
          return {
            items: s.items.map(
              (i) => i.productId === p.id ? { ...i, kg: i.kg + 1 } : i
            )
          };
        }
        return {
          items: [
            ...s.items,
            {
              productId: p.id,
              name: p.name,
              image: p.image,
              pricePerKg: p.pricePerKg,
              pricePerHalfKg: p.pricePerHalfKg,
              kg: 1,
              halfKg: 0
            }
          ]
        };
      }),
      addHalfKg: (p) => set((s) => {
        const existing = s.items.find((i) => i.productId === p.id);
        if (existing) {
          return {
            items: s.items.map(
              (i) => i.productId === p.id ? { ...i, halfKg: i.halfKg + 1 } : i
            )
          };
        }
        return {
          items: [
            ...s.items,
            {
              productId: p.id,
              name: p.name,
              image: p.image,
              pricePerKg: p.pricePerKg,
              pricePerHalfKg: p.pricePerHalfKg,
              kg: 0,
              halfKg: 1
            }
          ]
        };
      }),
      setQty: (productId, kg, halfKg) => set((s) => ({
        items: s.items.map((i) => i.productId === productId ? { ...i, kg, halfKg } : i).filter((i) => i.kg > 0 || i.halfKg > 0)
      })),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] })
    }),
    { name: "rhb-cart" }
  )
);
const lineTotal = (i) => i.kg * i.pricePerKg + i.halfKg * i.pricePerHalfKg;
const cartTotal = (items) => items.reduce((acc, i) => acc + lineTotal(i), 0);
const cartCount = (items) => items.reduce((acc, i) => acc + i.kg + i.halfKg, 0);
const cartWeight = (items) => items.reduce((acc, i) => acc + i.kg + i.halfKg * 0.5, 0);
export {
  ShoppingBag as S,
  cartCount as a,
  cartWeight as b,
  cartTotal as c,
  lineTotal as l,
  useCart as u
};
