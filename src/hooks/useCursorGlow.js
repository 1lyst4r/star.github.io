import { useEffect, useRef } from "react";

export function useCursorGlow() {
  // Variables
  const cursorGlowRef = useRef(null);

  // Functions
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let animationFrameId = null;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${glowX}px`;
        cursorGlowRef.current.style.top = `${glowY}px`;
      }

      animationFrameId = requestAnimationFrame(animateGlow);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(animateGlow);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return cursorGlowRef;
}
