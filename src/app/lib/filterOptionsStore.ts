import { create } from "zustand";

interface FilterOptionsState {
  selectedDuration: string | null;
  explicit: string | null;
  isMobileFilterOptionsOpen: boolean;
  setIsMobileFilterOptionsOpen: (open: boolean) => void;
  setFilterOptions: (options: FilterOptions) => void;
  clearAllFilters: () => void;
}

interface FilterOptions {
  selectedDuration: string | null;
  explicit: string | null;
}

export const useFilterOptionsStore = create<FilterOptionsState>((set) => ({
  selectedDuration: null,
  explicit: null,
  isMobileFilterOptionsOpen: false,
  setIsMobileFilterOptionsOpen: (open) =>
    set({ isMobileFilterOptionsOpen: open }),
  setFilterOptions: (options) => set(options),
  clearAllFilters: () => set({ selectedDuration: null, explicit: null }),
}));
