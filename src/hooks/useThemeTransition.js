import { useCallback, useEffect, useRef, useState } from "react";

const TRANSITION_DURATION = 140;

export function useThemeTransition() {
  const [transition, setTransition] = useState(null);
  const frameRef = useRef(null);

  const cancelAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => cancelAnimation();
  }, [cancelAnimation]);

  const startTransition = useCallback((fromTheme, toTheme, onComplete) => {
    cancelAnimation();

    const startTime = performance.now();
    setTransition({ active: true, progress: 0, fromTheme, toTheme });

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / TRANSITION_DURATION);

      setTransition({ active: true, progress, fromTheme, toTheme });

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      setTransition(null);
      if (typeof onComplete === "function") {
        onComplete();
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);
  }, [cancelAnimation]);

  return {
    transition,
    startTransition
  };
}
