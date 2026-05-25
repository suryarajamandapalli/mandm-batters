export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  pricePerKg: number;
  pricePerHalfKg: number;
  category: string;
  stockQuantity: number;
  inStock: boolean; // This will act as the "Live/Off" toggle
};

export const products: Product[] = [
  {
    id: "idli",
    name: "Idli Batter",
    description: "Soft, fluffy, fermented overnight with premium urad dal & idli rice.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG",
    pricePerKg: 120,
    pricePerHalfKg: 65,
    category: "Classic",
    stockQuantity: 50,
    inStock: true,
  },
  {
    id: "dosa",
    name: "Dosa Batter",
    description: "Crispy golden dosas every time. Stone-ground, naturally fermented.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg",
    pricePerKg: 130,
    pricePerHalfKg: 70,
    category: "Classic",
    stockQuantity: 40,
    inStock: true,
  },
  {
    id: "rava",
    name: "Rava Idli Mix",
    description: "Quick and soft rava idlis with the perfect tang. Ready in minutes.",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900&auto=format&fit=crop",
    pricePerKg: 140,
    pricePerHalfKg: 75,
    category: "Mixes",
    stockQuantity: 30,
    inStock: true,
  },
  {
    id: "ragi",
    name: "Ragi Dosa Batter",
    description: "Wholesome finger millet batter, naturally rich in iron and fibre.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/74/Special_Ragi_Masala_Dosa.JPG",
    pricePerKg: 150,
    pricePerHalfKg: 80,
    category: "Healthy",
    stockQuantity: 25,
    inStock: true,
  },
  {
    id: "uttapam",
    name: "Uttapam Batter",
    description: "Thick, soft, and perfect for loaded veggie uttapams.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Mini_Uttappam.jpg",
    pricePerKg: 130,
    pricePerHalfKg: 70,
    category: "Classic",
    stockQuantity: 35,
    inStock: true,
  },
  {
    id: "paniyaram",
    name: "Paniyaram Batter",
    description: "Spiced and ready to pour. Crispy outside, soft inside.",
    image:
      "/paniyaram.png",
    pricePerKg: 140,
    pricePerHalfKg: 75,
    category: "Classic",
    stockQuantity: 20,
    inStock: true,
  },
];

export type Banner = {
  id: string;
  image: string;
  orientation: "landscape" | "portrait";
  title: string;
  caption: string;
};

export const banners: Banner[] = [
  {
    id: "b1",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1400&auto=format&fit=crop",
    orientation: "landscape",
    title: "Festive Special",
    caption: "Order ahead for Pongal & Sankranti",
  },
  {
    id: "b2",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&auto=format&fit=crop",
    orientation: "portrait",
    title: "Free Delivery",
    caption: "On orders above ₹299",
  },
  {
    id: "b3",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1400&auto=format&fit=crop",
    orientation: "landscape",
    title: "Made Fresh Daily",
    caption: "Stone-ground every morning",
  },
];

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  city: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Priya Nair",
    rating: 5,
    text: "The fluffiest idlis I've made at home. Tastes exactly like my amma's recipe.",
    city: "Bengaluru",
  },
  {
    id: "r2",
    name: "Karthik R",
    rating: 5,
    text: "Crispy dosas every single time. Delivery was on time and packaging was great.",
    city: "Chennai",
  },
  {
    id: "r3",
    name: "Anjali Iyer",
    rating: 4,
    text: "Love the ragi batter — feels healthier and the kids actually enjoy it.",
    city: "Coimbatore",
  },
  {
    id: "r4",
    name: "Suresh Menon",
    rating: 5,
    text: "Switched from store-bought packets months ago. Never going back.",
    city: "Hyderabad",
  },
];
