import { RefObject, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";

export function usePinchHandler(
  ref: RefObject<HTMLDivElement | null>,
  pos: { x: number; y: number },
  scale: number,
  handler: ({ x, y, scale }: { x: number; y: number; scale: number }) => void
) {
  const firstOrigin = useRef({ x: 0, y: 0 });
  const firstPan = useRef({ x: 0, y: 0 });
  const firstDistance = useRef(0);
  const firstScale = useRef(1);

  // Prevent browser gesture zoom (Safari / trackpads)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prevent = (e: Event) => e.preventDefault();

    el.addEventListener("gesturestart", prevent);
    el.addEventListener("gesturechange", prevent);
    el.addEventListener("gestureend", prevent);

    return () => {
      el.removeEventListener("gesturestart", prevent);
      el.removeEventListener("gesturechange", prevent);
      el.removeEventListener("gestureend", prevent);
    };
  }, [ref]);

  const applyZoom = (distance: number, ox: number, oy: number, first: boolean) => {
    if (first) {
      firstDistance.current = distance;
      firstOrigin.current = { x: ox, y: oy };
      firstPan.current = pos;
      firstScale.current = scale;
    }

    const scaleFactor = distance / firstDistance.current;
    const newScale = Math.min(20, Math.max(0.5, firstScale.current * scaleFactor));
    const ratio = newScale / firstScale.current;

    const dx = ox - (firstOrigin.current.x - firstPan.current.x) * ratio;
    const dy = oy - (firstOrigin.current.y - firstPan.current.y) * ratio;

    handler({ x: dx, y: dy, scale: newScale });
  };

  useGesture(
    {
      onPinch: ({ da: [distance], origin: [ox, oy], first, event }) => {
        event.preventDefault();
        applyZoom(distance, ox, oy, first);
      },

      onWheel: ({ event, delta: [, dy], first }) => {
        const wheel = event as WheelEvent;

        if (!wheel.ctrlKey) return;

        event.preventDefault();

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const ox = wheel.clientX - rect.left;
        const oy = wheel.clientY - rect.top;

        const distance = firstDistance.current - dy;

        applyZoom(distance, ox, oy, first);
      },
    },
    {
      target: ref,
      eventOptions: { passive: false },
    }
  );
}