import { usePanStore } from "../store";

export function usePan() {
  const position = usePanStore((s) => s.position)
  const setPosition = usePanStore((s) => s.setPosition)

  return { position, setPosition }
}
