import { RefObject, useEffect } from "react";

interface Handler {
  handler: (rect: DOMRect) => void
}

interface Config {
  target: RefObject<any>
}

export function useContentRect(
  ref: RefObject<HTMLElement | null>,
  onResize: (rect: DOMRect) => void
) {
  useEffect(() => {
    if (!ref.current) return

    const observer = new ResizeObserver(([entities]) => {
      onResize(entities.contentRect)
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}