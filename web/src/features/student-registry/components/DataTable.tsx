'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, getCoreRowModel, TableMeta, useReactTable } from '@tanstack/react-table'
import React from 'react'
import useDataTable from '../hooks/useDataTable'
import { Data } from './Columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function DataTable<TData extends Data, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const { setData } = useDataTable()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        const newData = [...data]
        newData[rowIndex] = {...newData[rowIndex], [columnId]: value}
        setData(newData)
      },
      removeRow: (rowIndex: number) => {
        const setFilterData = (old: TData[]) => old.filter((_row, index) => index !== rowIndex)
        setData(setFilterData(data))
      }
    }
  })

  return (
    <div className='overflow-hidden rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ): (
            <TableRow>
              <TableCell colSpan={columns.length}>
                No Results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
