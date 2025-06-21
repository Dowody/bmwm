import { create } from 'zustand';

interface UIState {
  isContentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isContentVisible: false,
  setContentVisible: (visible) => set({ isContentVisible: visible }),
  isDarkTheme: true,
  toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
})); 