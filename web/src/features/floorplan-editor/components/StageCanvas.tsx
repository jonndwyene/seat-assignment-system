'use client'

import { useRef } from 'react'
import { usePan, useStageContainer, useZoom } from '../hooks'
import StageContainer from './StageContainer'
import { Group, Layer, Rect, Stage, Text, Image} from 'react-konva'
import { useAddElement } from '@/features/floorplan-output/hooks/useAdd'
import { useElementsStore } from '../store'
import useImage from 'use-image'
import Konva from 'konva'

export default function StageCanvas() {
  const stageContainer = useStageContainer()
  const zoom = useZoom()
  const pan = usePan()

  const stageRef = useRef<Konva.Stage>(null)
  const { present, addElements } = useElementsStore()
  const [image] = useImage('/chair.png')

  useAddElement(
    stageRef
  )

  return (
    <StageContainer>
      <Stage
        ref={stageRef}
        width={stageContainer.dimensions?.width}
        height={stageContainer.dimensions?.height}>
        <Layer>
          <Group
            x={pan.position.x}
            y={pan.position.y}
            scale={{ x: zoom.zoom, y: zoom.zoom }}>
              {present.map((entry, index) => (
                <Image key={index} x={entry.x} y={entry.y} image={image} width={10} height={10}/>
              ))}
          </Group>
        </Layer>
      </Stage>
    </StageContainer>
  )
}
