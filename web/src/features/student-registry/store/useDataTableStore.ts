import { create } from "zustand";
import { Data } from "../components/Columns";


interface DataTableState {
  data: Data[]
  setData: (data: Data[]) => void
  addRow: (row: Data) => void
  updateCell: (rowIndex, columnId, value) => void
}

export const useDataTableStore = create<DataTableState>((set) => ({
  data: [],
  setData: (data) => set({data}),
  addRow: (row) => set((s) => ({ data: [...s.data, row]})),
  updateCell: (rowIndex, columnId, value) => set((s) => ({
    data: s.data.map((row, id) => 
      id === rowIndex ? 
    { ...row, [columnId]: value} : row)
  }))
}))