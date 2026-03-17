import { RefObject, useRef } from "react";
import { usePinch } from "@use-gesture/react";

export function usePinchHandler(
  ref: RefObject<HTMLDivElement | null>,
  pos: { x: number, y: number },
  scale: number,
  handler: ({ x, y, scale }: { x: number, y: number, scale: number }) => void,
) {
  const firstOrigin = useRef({ x: 0, y: 0 })
  const firstPan = useRef({ x: 0, y: 0 })
  const firstDistance = useRef(0)
  const firstScale = useRef(0)

  usePinch(({ da: [distance], origin: [ox, oy], first }) => {
    if (first) {
      firstDistance.current = distance
      firstOrigin.current = { x: ox, y: oy }
      firstPan.current = pos
      firstScale.current = scale
    }
    const scaleFactor = distance / firstDistance.current
    const newScale = Math.min(20, Math.max(0.5,(firstScale.current * scaleFactor)))
    const ratio = newScale / firstScale.current

    const dx = ox - (firstOrigin.current.x - firstPan.current.x) * ratio
    const dy = oy - (firstOrigin.current.y - firstPan.current.y) * ratio

    handler({
      x: dx,
      y: dy,
      scale: newScale
    })
  }, { target: ref })
}