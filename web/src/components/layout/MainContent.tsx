'use client'

import StageCanvas from '@/features/floorplan-editor/components/StageCanvas'
import DataTable from '@/features/student-registry/components/DataTable'
import DataTablePage from '@/features/student-registry/components/page'
import Toolbar from './Toolbar'
import { Button } from '../ui/button'
import useAdd from '@/features/student-registry/hooks/useAdd'
import { Data } from '@/features/student-registry/components/Columns'
import useDataTable from '@/features/student-registry/hooks/useDataTable'
import useUI from '@/hooks/useUI'
import OutputStageCanvas from '@/features/floorplan-output/components/StageCanvas'

export default function MainContent() {

  const { selectedTab, setSelectedTab } = useUI()

  return (
    <div
      className='
    flex flex-1 bg-gray-50
    overscroll-none touch-none
    '
    >
      {selectedTab === 'students' &&
        <div className='pt-70 px-5 w-full overflow-x-auto space-y-2'>
          <DataTablePage />
        </div>
      }
      {selectedTab === 'room' &&
        <StageCanvas />
      }
      {selectedTab === 'output' &&
        <OutputStageCanvas />
      }
    </div>
  )
}
