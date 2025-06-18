import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (itemIndex: number) => void;
  updateQuantity: (itemIndex: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: (product, quantity, size, color) => {
    set((state) => {
      // Check if item already exists with same product, size and color
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { items: updatedItems };
      } else {
        // Add new item
        return { items: [...state.items, { product, quantity, size, color }] };
      }
    });
  },
  
  removeItem: (itemIndex) => {
    set((state) => ({
      items: state.items.filter((_, index) => index !== itemIndex)
    }));
  },
  
  updateQuantity: (itemIndex, quantity) => {
    set((state) => {
      const updatedItems = [...state.items];
      if (updatedItems[itemIndex]) {
        updatedItems[itemIndex].quantity = quantity;
      }
      return { items: updatedItems };
    });
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}));
