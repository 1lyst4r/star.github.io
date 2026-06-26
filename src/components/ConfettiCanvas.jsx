export function ConfettiCanvas({ canvasRef, isActive }) {
  // Variables
  const className = `confetti-canvas${isActive ? " active" : ""}`;

  // Functions
  return <canvas className={className} id="confetti-canvas" ref={canvasRef} />;
}
