import { create } from "zustand";

interface HeaderState {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (loggedIn: boolean) => void;
  currentUser: CurrentUser | undefined;
  setCurrentUser: (user: CurrentUser | undefined) => void;
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
}

export interface CurrentUser {
  id: string;
  image: string;
  name: string;
  surname: string;
  email: string;
  type: string;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (loggedIn) => set({ isUserLoggedIn: loggedIn }),
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
  isSideBarOpen: false,
  setIsSideBarOpen: (open) => set({ isSideBarOpen: open }),
}));
