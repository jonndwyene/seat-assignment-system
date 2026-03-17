'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ColumnDef, RowData } from "@tanstack/react-table"
import useDataTable from "../hooks/useDataTable"

import '@tanstack/react-table'


export type Data = {
  name: string
  visionIssues: boolean
  hearingImpairment: boolean
  medicalNeeds: boolean
  physicalNeeds: boolean
  learningNeeds: boolean
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (index: number, id: string, value: any) => void
    removeRow: (index: number) => void
  }
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({getValue, row: {index}, column: {id}, table}) => {
      return <Input
      className="w-30 h-8"
      value={String(getValue())}
      onChange={(e) => {
        table.options.meta?.updateData(index, id, e.target.value)
      }}
      />
    }
  },
  {
    accessorKey: 'visionIssues',
    header: 'Vision Issues',
    cell: ({row: { index }, column: { id }, table, getValue}) => {
      return <Switch
      checked={!!getValue()}
      onCheckedChange={(checked) => {
        table.options.meta?.updateData(index, id, checked)
      }}
      />
    }
  },
  {
    accessorKey: 'hearingImpairment',
    header: 'Hearing Impairment',
    cell: ({row: { index }, column: { id }, table, getValue}) => {
      return <Switch
      checked={!!getValue()}
      onCheckedChange={(checked) => {
        table.options.meta?.updateData(index, id, checked)
      }}
      />
    }
  },
  {
    accessorKey: 'medicalNeeds',
    header: 'Medical Needs',
    cell: ({row: { index }, column: { id }, table, getValue}) => {
      return <Switch
      checked={!!getValue()}
      onCheckedChange={(checked) => {
        table.options.meta?.updateData(index, id, checked)
      }}
      />
    }
  },
  {
    accessorKey: 'physicalNeeds',
    header: 'Physical Needs',
    cell: ({row: { index }, column: { id }, table, getValue}) => {
      return <Switch
      checked={!!getValue()}
      onCheckedChange={(checked) => {
        table.options.meta?.updateData(index, id, checked)
      }}
      />
    }
  },
  {
    accessorKey: 'learningNeeds',
    header: 'Learning Needs',
    cell: ({row: { index }, column: { id }, table, getValue}) => {
      return <Switch
      checked={!!getValue()}
      onCheckedChange={(checked) => {
        table.options.meta?.updateData(index, id, checked)
      }}
      />
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({row: {index}, table}) => {
      return <Button 
      className="w-15"
      variant={'destructive'} 
      size={'icon'}
      onClick={(e) => {
        table.options.meta?.removeRow(index)
      }}>Delete</Button>
    }
  },
]