'use client'

import { useRef } from 'react'
import { usePan, useStageContainer, useZoom } from '../hooks'
import StageContainer from './StageContainer'
import { Group, Layer, Rect, Stage, Text, Image } from 'react-konva'
import { useResults } from '../hooks/useResults'
import useImage from 'use-image'

export default function OutputStageCanvas() {
  const stageContainer = useStageContainer()
  const zoom = useZoom()
  const pan = usePan()


  const { results } = useResults()
  const [image] = useImage('/chair.png')

  return (
    <StageContainer>
      <Stage
        width={stageContainer.dimensions?.width}
        height={stageContainer.dimensions?.height}
      >
        <Layer>
          <Group
            x={pan.position.x}
            y={pan.position.y}
            scale={{ x: zoom.zoom, y: zoom.zoom }}
          >
            {results?.map((entry, index) => (
              <Group key={index}>
                <Image x={entry.x} y={entry.y} image={image} width={10} height={10}/>
                <Text x={entry.x} y={entry.y - 1} fontSize={1.5} text={entry.name}></Text>
              </Group>
            ))}
          </Group>
        </Layer>
      </Stage>
    </StageContainer>
  )
}
