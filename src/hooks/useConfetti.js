import { useCallback, useEffect, useRef, useState } from "react";

const confettiColors = ["#ffffff", "#5b9cf6", "#f59e0b", "#22c55e", "#ef4444", "#a855f7", "#f472b6"];

export function useConfetti() {
  // Variables
  const canvasRef = useRef(null);
  const piecesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const endTimeRef = useRef(0);
  const [isActive, setIsActive] = useState(false);

  // Functions
  const resizeConfettiCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
  }, []);

  const createConfettiPiece = useCallback(() => {
    return {
      x: Math.random() * window.innerWidth,
      y: -30 - Math.random() * window.innerHeight * 0.7,
      width: 5 + Math.random() * 8,
      height: 10 + Math.random() * 14,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      velocityX: -1.6 + Math.random() * 3.2,
      velocityY: 2 + Math.random() * 4.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.18 + Math.random() * 0.36,
      swing: Math.random() * Math.PI * 2
    };
  }, []);

  const animateConfetti = useCallback(
    (now) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        animationFrameRef.current = null;
        return;
      }

      const context = canvas.getContext("2d");
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (now < endTimeRef.current && piecesRef.current.length < 460) {
        for (let index = 0; index < 9; index += 1) {
          piecesRef.current.push(createConfettiPiece());
        }
      }

      piecesRef.current.forEach((piece) => {
        piece.x += piece.velocityX + Math.sin(now / 240 + piece.swing) * 0.7;
        piece.y += piece.velocityY;
        piece.velocityY += 0.015;
        piece.rotation += piece.rotationSpeed;

        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        context.restore();
      });

      piecesRef.current = piecesRef.current.filter((piece) => piece.y < window.innerHeight + 60);

      if (piecesRef.current.length || now < endTimeRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateConfetti);
        return;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      setIsActive(false);
      animationFrameRef.current = null;
    },
    [createConfettiPiece]
  );

  const launchConfetti = useCallback(() => {
    resizeConfettiCanvas();
    setIsActive(true);
    piecesRef.current = Array.from({ length: 260 }, createConfettiPiece);
    endTimeRef.current = performance.now() + 7200;

    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateConfetti);
    }
  }, [animateConfetti, createConfettiPiece, resizeConfettiCanvas]);

  useEffect(() => {
    resizeConfettiCanvas();
    window.addEventListener("resize", resizeConfettiCanvas);

    return () => {
      window.removeEventListener("resize", resizeConfettiCanvas);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeConfettiCanvas]);

  return {
    canvasRef,
    isActive,
    launchConfetti
  };
}
