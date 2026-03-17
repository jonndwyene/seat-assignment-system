import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

export default function Toolbar() {
  return (
    <ToggleGroup variant={'outline'} type='single' className='bg-white shadow-sm'>
      <ToggleGroupItem value='a'>+</ToggleGroupItem>
    </ToggleGroup>
  )
}
