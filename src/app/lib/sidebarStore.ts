import { create } from "zustand";

interface SidebarState {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (loggedIn: boolean) => void;
  isFavouriteTracksPage: boolean;
  setIsFavouriteTracksPage: (page: boolean) => void;
  isPopupLoginOpen: boolean;
  setIsPopupLoginOpen: (open: boolean) => void;
  popupLoginText: string;
  setPopupLoginText: (text: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSideBarOpen: true,
  setIsSideBarOpen: (open) => set({ isSideBarOpen: open }),
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedIn) => set({ isUserLoggedIn: loggedIn }),
  isFavouriteTracksPage: false,
  setIsFavouriteTracksPage: (page) => set({ isFavouriteTracksPage: page }),
  isPopupLoginOpen: false,
  setIsPopupLoginOpen: (open) => set({ isPopupLoginOpen: open }),
  popupLoginText: "",
  setPopupLoginText: (text) => set({ popupLoginText: text }),
}));
