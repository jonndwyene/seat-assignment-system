import { useStageContainerStore } from "../store";

export function useStageContainer() {
  const dimensions = useStageContainerStore((s) => s.dimensions)
  const setDimensions = useStageContainerStore((s) => s.setDimensions)

  return { dimensions, setDimensions }
}
