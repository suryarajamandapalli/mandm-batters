import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/site";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  pricePerKg: number;
  pricePerHalfKg: number;
  kg: number; // count of 1KG units
  halfKg: number; // count of 1/2 KG units
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addKg: (p: Product) => void;
  addHalfKg: (p: Product) => void;
  setQty: (productId: string, kg: number, halfKg: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addKg: (p) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === p.id ? { ...i, kg: i.kg + 1 } : i,
              ),
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
                halfKg: 0,
              },
            ],
          };
        }),
      addHalfKg: (p) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === p.id ? { ...i, halfKg: i.halfKg + 1 } : i,
              ),
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
                halfKg: 1,
              },
            ],
          };
        }),
      setQty: (productId, kg, halfKg) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.productId === productId ? { ...i, kg, halfKg } : i))
            .filter((i) => i.kg > 0 || i.halfKg > 0),
        })),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "rhb-cart" },
  ),
);

export const lineTotal = (i: CartItem) =>
  i.kg * i.pricePerKg + i.halfKg * i.pricePerHalfKg;

export const cartTotal = (items: CartItem[]) =>
  items.reduce((acc, i) => acc + lineTotal(i), 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((acc, i) => acc + i.kg + i.halfKg, 0);

export const cartWeight = (items: CartItem[]) =>
  items.reduce((acc, i) => acc + i.kg + i.halfKg * 0.5, 0);
