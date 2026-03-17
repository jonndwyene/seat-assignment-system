import { useZoomStore } from "../store"

export function useZoom() {
  const zoom = useZoomStore((s) => s.zoom)
  const setZoom = useZoomStore((s) => s.setZoom)

  return { zoom, setZoom }
}
