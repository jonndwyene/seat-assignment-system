import { create } from "zustand";

export interface ZoomStore{
  zoom: number
  setZoom: (zoom: number) => void
}

export const useZoomStore = create<ZoomStore>((set) => ({
  zoom: 10,
  setZoom: (zoom) => set({zoom})
}))