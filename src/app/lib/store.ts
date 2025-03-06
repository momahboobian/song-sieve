import { create } from "zustand";

interface AppState {
  backgroundImage: string;
  setBackgroundImage: (url: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  backgroundImage: "/background_images/back_1.webp",
  setBackgroundImage: (url) => set({ backgroundImage: url }),
}));
