import { create } from "zustand";

type Tabs = 'students' | 'room' | 'output'

interface UIStoreState {
 selectedTab: Tabs
 setSelectedTab: (selectedTab: Tabs) => void
}

export const useUIStore = create<UIStoreState>((set) => ({
  selectedTab: 'students',
  setSelectedTab: (selectedTab) => set({selectedTab})
}))