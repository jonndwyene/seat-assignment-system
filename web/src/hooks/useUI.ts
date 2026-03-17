import { useUIStore } from "@/store/useUIStore";

export default function useUI() {
  const selectedTab = useUIStore((s) => s.selectedTab)
  const setSelectedTab = useUIStore((s) => s.setSelectedTab)

  return { selectedTab, setSelectedTab}
}