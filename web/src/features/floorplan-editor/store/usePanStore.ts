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
  position: {x: 0, y: 0},
  setPosition: (position) => set({position})
}))