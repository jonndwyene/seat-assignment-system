import { create } from "zustand";
import { Data } from "../components/Columns";


interface DataTableState {
  data: Data[]
  setData: (data: Data[]) => void
  addRow: (row: Data) => void
  updateCell: (rowIndex: number, columnId: number, value: any) => void
}

export const useDataTableStore = create<DataTableState>((set) => ({
  data: [
    {
      name: 'Abad',
      visionIssues: false,
      hearingImpairment: false,
      medicalNeeds: false,
      physicalNeeds: false,
      learningNeeds: false
    },
    {
      name: 'Bautista',
      visionIssues: false,
      hearingImpairment: false,
      medicalNeeds: false,
      physicalNeeds: false,
      learningNeeds: false
    },
    {
      name: 'Caballero',
      visionIssues: false,
      hearingImpairment: false,
      medicalNeeds: false,
      physicalNeeds: false,
      learningNeeds: false
    },
    {
      name: 'Dela Cruz',
      visionIssues: false,
      hearingImpairment: false,
      medicalNeeds: false,
      physicalNeeds: false,
      learningNeeds: false
    },
  ],
  setData: (data) => set({data}),
  addRow: (row) => set((s) => ({ data: [...s.data, row]})),
  updateCell: (rowIndex, columnId, value) => set((s) => ({
    data: s.data.map((row, id) => 
      id === rowIndex ? 
    { ...row, [columnId]: value} : row)
  }))
}))