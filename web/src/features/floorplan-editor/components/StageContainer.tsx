'use client'

import { ReactNode, useMemo, useRef, useState } from "react"
import { usePan, useContentRect, useStageContainer, useZoom } from "../hooks"
import { usePinchHandler } from "../handlers"
import Toolbar from "@/components/layout/Toolbar"

export default function StageContainer({ children }: { children: ReactNode }) {
  const { setDimensions } = useStageContainer()
  const { position, setPosition } = usePan()
  const { zoom, setZoom } = useZoom()
  const containerRef = useRef<HTMLDivElement>(null)

  useContentRect(
    containerRef,
    (rect) => {
      setDimensions(rect.width, rect.height)
    }
  )

  usePinchHandler(
    containerRef, 
    position, 
    zoom, 
    ({x, y, scale}) => {
      setPosition({x, y})
      setZoom(scale)
    }
  )

  return (
    <div
      className="flex-1"
      ref={containerRef}
    >
      {children}
    </div>
  )
}
