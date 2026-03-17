import { useDataTableStore } from "../store/useDataTableStore";


export default function useDataTable() {
 const data = useDataTableStore((s) => s.data)
 const setData = useDataTableStore((s) => s.setData)
 const addRow = useDataTableStore((s) => s.addRow)
 const updateCell = useDataTableStore((s) => s.updateCell)


 return {data, setData, addRow, updateCell}
}