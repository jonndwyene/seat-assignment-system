import useDataTable from "./useDataTable";
import { Data } from "../components/Columns";

const notAvailable = 'N/A'

const defaultData: Data = {
  name: notAvailable,
  visionIssues: false,
  hearingImpairment: false,
  medicalNeeds: false,
  physicalNeeds: false,
  learningNeeds: false
}

export default function useAdd() {
  const {data, setData, addRow} = useDataTable()
  
  return () => addRow(defaultData)
}
