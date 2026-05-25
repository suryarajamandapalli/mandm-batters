import { create } from "zustand";
import {
  ref,
  onValue,
  set as fbSet,
  remove as fbRemove,
  update as fbUpdate,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { products as initialProducts, Product } from "@/data/site";

export type Category = {
  id: string;
  name: string;
};

type ProductState = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, "id">>) => void;
  updateProductStock: (id: string, quantity: number) => void;
  toggleStock: (id: string) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string) => void;
  removeCategory: (id: string) => void;
  _setProducts: (products: Product[]) => void;
  _setCategories: (categories: Category[]) => void;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useProductsStore = create<ProductState>()((set, get) => ({
  products: [],
  categories: [],
  loading: true,

  _setProducts: (products) => set({ products, loading: false }),
  _setCategories: (categories) => set({ categories }),

  addProduct: (productData) => {
    const id = generateId();
    const newProduct: Product = { ...productData, id };
    // Optimistic update
    set((state) => ({ products: [...state.products, newProduct] }));
    // Push to Firebase
    fbSet(ref(rtdb, `products/${id}`), newProduct);
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    fbUpdate(ref(rtdb, `products/${id}`), updates);
  },

  updateProductStock: (id, quantity) => {
    const product = get().products.find(p => p.id === id);
    if (!product) return;
    
    const updates = { 
      stockQuantity: quantity,
      inStock: quantity > 0 && product.inStock // Automatically disable if stock is 0, but keep "Live" status if possible
    };

    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
    fbUpdate(ref(rtdb, `products/${id}`), updates);
  },

  toggleStock: (id) => {
    const product = get().products.find((p) => p.id === id);
    if (!product) return;
    const newStockStatus = !product.inStock;
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, inStock: newStockStatus } : p,
      ),
    }));
    fbSet(ref(rtdb, `products/${id}/inStock`), newStockStatus);
  },

  deleteProduct: (id) => {
    set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
    fbRemove(ref(rtdb, `products/${id}`));
  },

  addCategory: (name) => {
    const id = generateId();
    const newCategory = { id, name };
    set((state) => ({ categories: [...state.categories, newCategory] }));
    fbSet(ref(rtdb, `categories/${id}`), newCategory);
  },

  removeCategory: (id) => {
    set((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
    fbRemove(ref(rtdb, `categories/${id}`));
  },
}));

// ── Real-time listener: keeps Zustand in sync with Firebase ──
const productsRef = ref(rtdb, "products");
onValue(productsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const products: Product[] = Object.values(data);
    
    // Auto-migrate outdated or broken image URLs in the database
    let needsDbUpdate = false;
    const migratedProducts = products.map((p) => {
      let image = p.image;
      let pChanged = false;
      
      if (p.id === "dosa" && image !== "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg") {
        image = "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg";
        pChanged = true;
      }
      if (p.id === "idli" && image !== "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG") {
        image = "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG";
        pChanged = true;
      }
      if (p.id === "uttapam" && image !== "https://upload.wikimedia.org/wikipedia/commons/c/c6/Mini_Uttappam.jpg") {
        image = "https://upload.wikimedia.org/wikipedia/commons/c/c6/Mini_Uttappam.jpg";
        pChanged = true;
      }
      if (p.id === "ragi" && image !== "https://upload.wikimedia.org/wikipedia/commons/7/74/Special_Ragi_Masala_Dosa.JPG") {
        image = "https://upload.wikimedia.org/wikipedia/commons/7/74/Special_Ragi_Masala_Dosa.JPG";
        pChanged = true;
      }
      if (p.id === "paniyaram" && image !== "/paniyaram.png") {
        image = "/paniyaram.png";
        pChanged = true;
      }
      
      if (pChanged) {
        needsDbUpdate = true;
        return { ...p, image };
      }
      return p;
    });

    if (needsDbUpdate) {
      const seedData: Record<string, Product> = {};
      migratedProducts.forEach((p) => {
        seedData[p.id] = p;
      });
      fbSet(productsRef, seedData);
    }

    useProductsStore.getState()._setProducts(migratedProducts);
  } else {
    // First time: seed Firebase with initial products
    const seedData: Record<string, Product> = {};
    initialProducts.forEach((p) => {
      seedData[p.id] = p;
    });
    fbSet(productsRef, seedData);
  }
});

const categoriesRef = ref(rtdb, "categories");
onValue(categoriesRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const categories: Category[] = Object.values(data);
    useProductsStore.getState()._setCategories(categories);
  } else {
    // Initial categories
    const initialCategories = ["Idly Batter", "Dosa Batter", "Special Mixes", "Instant Mixes"];
    initialCategories.forEach(name => {
      useProductsStore.getState().addCategory(name);
    });
  }
});
