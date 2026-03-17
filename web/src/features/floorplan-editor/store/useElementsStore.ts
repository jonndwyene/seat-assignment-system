import { create } from "zustand";

interface Position {
  x: number
  y: number
}

export interface ElementsStore {
  addElements: (position: Position) => void
  past: any[][]
  present: any[]
  future: any[][]
  undo: () => void
  redo: () => void
}

export const useElementsStore = create<ElementsStore>((set) => ({
  elements: [],
  addElements: (position: Position) =>
    set((s) => {
      // 1. Check if an element already exists at this exact X and Y
      const isOccupied = s.present.some(
        (el) => el.x === position.x && el.y === position.y
      );

      let newPresent;
      if (isOccupied) {
        // 2. DELETE: If it exists, filter it out
        newPresent = s.present.filter(
          (el) => !(el.x === position.x && el.y === position.y)
        );
      } else {
        // 3. ADD: If it's a new spot, append it
        newPresent = [...s.present, { ...position }];
      }

      return {
        past: [...s.past, s.present],
        present: newPresent,
        future: [], // Clear redo history on new action
      };
    }),
  past: [],
  present: [
    {x:10, y:40},
    {x:20, y:30},
    {x:30, y:40},
    {x:20, y:50}
  ],
  future: [],
  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state
      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, state.past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future]
      }
    }),
  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state
      const next = state.future[0]
      const newFuture = state.future.slice(1)

      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture
      }
    }),
}))