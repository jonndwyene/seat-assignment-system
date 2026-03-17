import { useResultsStore } from "../store";

export function useResults() {
  const results = useResultsStore((s) => s.results)
  const updateResults = useResultsStore((s) => s.updateResults)

  return { results, updateResults }
}
