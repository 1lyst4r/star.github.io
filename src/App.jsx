import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { BackgroundMedia } from "./components/BackgroundMedia.jsx";
import { BirthdayOverlay } from "./components/BirthdayOverlay.jsx";
import { ConfettiCanvas } from "./components/ConfettiCanvas.jsx";
import { DockNav } from "./components/DockNav.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { typingIntro } from "./data/profile.js";
import { useBirthdayStats } from "./hooks/useBirthdayStats.js";
import { useConfetti } from "./hooks/useConfetti.js";
import { useCursorGlow } from "./hooks/useCursorGlow.js";
import { usePageTransition } from "./hooks/usePageTransition.js";
import { useTypingIntro } from "./hooks/useTypingIntro.js";
import { HomePage } from "./pages/HomePage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";

function getPageIdFromPath(pathname) {
  // Variables
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  // Functions
  return normalizedPath === "/projects" ? "projects-page" : "home-page";
}

function PortfolioRoutes({ pageTransition, typingState, birthdayStats }) {
  // Functions
  return (
    <>
      <Outlet />
      <div className="pages-container">
        {pageTransition.shouldRenderPage("home-page") && (
          <HomePage className={pageTransition.getPageClassName("home-page")} intro={typingState} birthdayStats={birthdayStats} />
        )}
        {pageTransition.shouldRenderPage("projects-page") && <ProjectsPage className={pageTransition.getPageClassName("projects-page")} />}
      </div>
    </>
  );
}

export default function App() {
  // Variables
  const [theme, setTheme] = useState("dark");
  const location = useLocation();
  const darkVideoRef = useRef(null);
  const lightVideoRef = useRef(null);
  const cursorGlowRef = useCursorGlow();
  const typingState = useTypingIntro(typingIntro);
  const pageTransition = usePageTransition(getPageIdFromPath(location.pathname));
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

      <Routes>
        <Route element={<PortfolioRoutes pageTransition={pageTransition} typingState={typingState} birthdayStats={birthdayStats} />}>
          <Route index element={null} />
          <Route path="projects" element={null} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <DockNav
        birthdayNoteAvailable={birthdayStats.birthdayNoteAvailable}
        birthdayNoteVisible={birthdayStats.birthdayNoteVisible}
        onOpenBirthdayMessage={birthdayStats.openBirthdayMessage}
      />
    </>
  );
}
