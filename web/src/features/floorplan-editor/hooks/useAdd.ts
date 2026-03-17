import Konva from "konva";
import { RefObject, useEffect, useRef } from "react";
import { useElementsStore } from "../store";

export function useAdd(
  stageRef: RefObject<Konva.Stage | null>,
) {
  const pos = useRef({
    x: 0,
    y: 0
  })

  const { addElements } = useElementsStore()

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const handleAdd = (e: Konva.KonvaEventObject<TouchEvent>) => {
      const pointer = stage.getPointerPosition()
      if (!pointer) return
      if (e.evt.touches.length < 1) {

        const targetNode = stage.findOne('Group') || stage.getLayers()[0]
  
        const transform = targetNode.getAbsoluteTransform().copy().invert()
        const relativePos = transform.point(pointer)
  
        const snappedPos = {
          x: Math.round( (relativePos.x - 5) / 10 ) * 10,
          y: Math.round( (relativePos.y - 5) / 10 ) * 10
        }
        addElements(snappedPos)
      }
    }

    stage.on('touchend', handleAdd)
    return () => { stage.off('touchend', handleAdd) }
  }, [stageRef])

  return pos.current
}