'use client'

import useDataTable from "../hooks/useDataTable";
import { columns, Data } from "./Columns";
import DataTable from "./DataTable";


export default function DataTablePage() {
  const {data} = useDataTable()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data}/>
    </div>
  )
}
