export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  sizes: string[];
  colors: {
    name: string;
    value: string;
  }[];
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  carInfo?: {
    model: string;
    year: string;
    engine: string;
    horsepower: string;
    topSpeed: string;
    acceleration: string;
    facts: string[];
    history: string;
    heroImage: string;
    gallery: string[];
  };
  collectionProducts?: string[]; // Product IDs that belong to this collection
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
