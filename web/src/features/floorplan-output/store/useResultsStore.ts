import { create } from "zustand";

export interface ResultsStore{
  results: any[]
  updateResults: (results: any) => void
}

export const useResultsStore = create<ResultsStore>((set) => ({
  results: [],
  updateResults: (results) => set({results})
}))