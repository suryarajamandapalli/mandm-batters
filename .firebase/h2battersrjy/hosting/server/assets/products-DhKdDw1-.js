import { d as create, r as remove, e as ref, f as rtdb, s as set, g as update, o as onValue, h as products } from "./router-Bieu8wEH.js";
const generateId = () => Math.random().toString(36).substr(2, 9);
const useProductsStore = create()((set$1, get) => ({
  products: [],
  categories: [],
  loading: true,
  _setProducts: (products2) => set$1({ products: products2, loading: false }),
  _setCategories: (categories) => set$1({ categories }),
  addProduct: (productData) => {
    const id = generateId();
    const newProduct = { ...productData, id };
    set$1((state) => ({ products: [...state.products, newProduct] }));
    set(ref(rtdb, `products/${id}`), newProduct);
  },
  updateProduct: (id, updates) => {
    set$1((state) => ({
      products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
    }));
    update(ref(rtdb, `products/${id}`), updates);
  },
  updateProductStock: (id, quantity) => {
    const product = get().products.find((p) => p.id === id);
    if (!product) return;
    const updates = {
      stockQuantity: quantity,
      inStock: quantity > 0 && product.inStock
      // Automatically disable if stock is 0, but keep "Live" status if possible
    };
    set$1((state) => ({
      products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
    }));
    update(ref(rtdb, `products/${id}`), updates);
  },
  toggleStock: (id) => {
    const product = get().products.find((p) => p.id === id);
    if (!product) return;
    const newStockStatus = !product.inStock;
    set$1((state) => ({
      products: state.products.map(
        (p) => p.id === id ? { ...p, inStock: newStockStatus } : p
      )
    }));
    set(ref(rtdb, `products/${id}/inStock`), newStockStatus);
  },
  deleteProduct: (id) => {
    set$1((state) => ({ products: state.products.filter((p) => p.id !== id) }));
    remove(ref(rtdb, `products/${id}`));
  },
  addCategory: (name) => {
    const id = generateId();
    const newCategory = { id, name };
    set$1((state) => ({ categories: [...state.categories, newCategory] }));
    set(ref(rtdb, `categories/${id}`), newCategory);
  },
  removeCategory: (id) => {
    set$1((state) => ({ categories: state.categories.filter((c) => c.id !== id) }));
    remove(ref(rtdb, `categories/${id}`));
  }
}));
const productsRef = ref(rtdb, "products");
onValue(productsRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const products2 = Object.values(data);
    useProductsStore.getState()._setProducts(products2);
  } else {
    const seedData = {};
    products.forEach((p) => {
      seedData[p.id] = p;
    });
    set(productsRef, seedData);
  }
});
const categoriesRef = ref(rtdb, "categories");
onValue(categoriesRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const categories = Object.values(data);
    useProductsStore.getState()._setCategories(categories);
  } else {
    const initialCategories = ["Idly Batter", "Dosa Batter", "Special Mixes", "Instant Mixes"];
    initialCategories.forEach((name) => {
      useProductsStore.getState().addCategory(name);
    });
  }
});
export {
  useProductsStore as u
};
