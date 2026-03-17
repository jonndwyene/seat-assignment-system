import { useElementsStore } from '@/features/floorplan-editor/store';
import { useGesture } from '@use-gesture/react';
import Konva from 'konva';
import { RefObject } from 'react';

export function useAddElement(
  stageRef: RefObject<Konva.Stage | null>
) {
  const { addElements } = useElementsStore()
  useGesture(
    {
      onDrag: ({ tap, last, event }) => {
        // 'tap' is true if the pointer was released without moving 
        // 'last' ensures we only trigger this once on release
        if (tap && last) {
          const stage = stageRef.current;
          if (!stage) return;

          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const targetNode = stage.findOne('Group') || stage;
          const transform = targetNode.getAbsoluteTransform().copy().invert();
          const relativePos = transform.point(pointer);

          const snappedPos = {
            x: Math.round((relativePos.x - 5) / 10) * 10,
            y: Math.round((relativePos.y - 5) / 10) * 10,
          };

          addElements(snappedPos);
        }
      },
    },
    {
      target: stageRef,
      drag: {
        filterTaps: true,
        threshold: 0
      },
      eventOptions: { passive: false }
    }
  );
}