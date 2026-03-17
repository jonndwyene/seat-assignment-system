import { create } from "zustand";

interface Dimensions{
  width: number
  height: number
}

interface StageContainerState {
  dimensions: Dimensions | null
  setDimensions: (width: number, height: number) => void
}

export const useStageContainerStore = create<StageContainerState>((set) => ({
  dimensions: null,
  setDimensions: (width, height) => set({dimensions: {width, height}})
}))