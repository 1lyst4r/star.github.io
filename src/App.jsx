import { useCallback, useEffect, useRef, useState } from "react";
import { BackgroundMedia } from "./components/BackgroundMedia.jsx";
import { BirthdayOverlay } from "./components/BirthdayOverlay.jsx";
import { ConfettiCanvas } from "./components/ConfettiCanvas.jsx";
import { DockNav } from "./components/DockNav.jsx";
import { HomePage } from "./components/HomePage.jsx";
import { ProjectsPage } from "./components/ProjectsPage.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { typingIntro } from "./data/profile.js";
import { useBirthdayStats } from "./hooks/useBirthdayStats.js";
import { useConfetti } from "./hooks/useConfetti.js";
import { useCursorGlow } from "./hooks/useCursorGlow.js";
import { usePageTransition } from "./hooks/usePageTransition.js";
import { useTypingIntro } from "./hooks/useTypingIntro.js";

export default function App() {
  // Variables
  const [theme, setTheme] = useState("dark");
  const darkVideoRef = useRef(null);
  const lightVideoRef = useRef(null);
  const cursorGlowRef = useCursorGlow();
  const typingState = useTypingIntro(typingIntro);
  const pageTransition = usePageTransition("home-page");
  const confetti = useConfetti();
  const birthdayStats = useBirthdayStats(confetti.launchConfetti);

  // Functions
  useEffect(() => {
    const lightModeIsOn = theme === "light";
    document.documentElement.setAttribute("data-theme", theme);

    darkVideoRef.current?.play().catch(() => {});
    lightVideoRef.current?.play().catch(() => {});

    if (darkVideoRef.current) {
      darkVideoRef.current.classList.toggle("is-visible", !lightModeIsOn);
    }

    if (lightVideoRef.current) {
      lightVideoRef.current.classList.toggle("is-visible", lightModeIsOn);
    }
  }, [theme]);

  const swapTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }, []);

  return (
    <>
      <BackgroundMedia theme={theme} darkVideoRef={darkVideoRef} lightVideoRef={lightVideoRef} />
      <div className="cursor-glow" id="cursor-glow" ref={cursorGlowRef} />
      <ConfettiCanvas canvasRef={confetti.canvasRef} isActive={confetti.isActive} />

      <BirthdayOverlay isOpen={birthdayStats.birthdayMessageOpen} onClose={birthdayStats.closeBirthdayMessage} />
      <ThemeToggle theme={theme} onToggleTheme={swapTheme} />

      <div className="pages-container">
        <HomePage className={pageTransition.getPageClassName("home-page")} intro={typingState} birthdayStats={birthdayStats} />
        <ProjectsPage className={pageTransition.getPageClassName("projects-page")} />
      </div>

      <DockNav
        selectedPage={pageTransition.selectedPage}
        onSwitchPage={pageTransition.switchPage}
        birthdayNoteAvailable={birthdayStats.birthdayNoteAvailable}
        birthdayNoteVisible={birthdayStats.birthdayNoteVisible}
        onOpenBirthdayMessage={birthdayStats.openBirthdayMessage}
      />
    </>
  );
}
