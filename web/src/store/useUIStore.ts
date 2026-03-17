import { create } from "zustand";

interface UIStoreState {
 selectedTab: any
 setSelectedTab: (selectedTab: any) => void
}

export const useUIStore = create<UIStoreState>((set) => ({
  selectedTab: 'students',
  setSelectedTab: (selectedTab) => set({selectedTab})
}))