import { create } from "zustand";

interface Position {
  x: number
  y: number
}

export interface PanStore{
  position: Position
  setPosition: (position: Position) => void
}

export const usePanStore = create<PanStore>((set) => ({
  position: {x: 60, y: 150},
  setPosition: (position) => set({position})
}))