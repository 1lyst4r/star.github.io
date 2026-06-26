import { BackgroundMedia } from "./BackgroundMedia.jsx";
import { BirthdayOverlay } from "./BirthdayOverlay.jsx";
import { ConfettiCanvas } from "./ConfettiCanvas.jsx";
import { DockNav } from "./DockNav.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage.jsx";
import { ProjectsPage } from "../pages/ProjectsPage.jsx";

function getPageIdFromPath(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath === "/projects" ? "projects-page" : "home-page";
}

function PortfolioRoutes({ pageTransition, typingState, birthdayStats }) {
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

export function PortfolioSurface({
  theme,
  onToggleTheme,
  cursorGlowRef,
  pageTransition,
  typingState,
  birthdayStats,
  confetti
}) {
  return (
    <div className="portfolio-surface" data-theme={theme}>
      <BackgroundMedia />
      <div className="cursor-glow" ref={cursorGlowRef} />
      <ConfettiCanvas canvasRef={confetti.canvasRef} isActive={confetti.isActive} />
      <BirthdayOverlay isOpen={birthdayStats.birthdayMessageOpen} onClose={birthdayStats.closeBirthdayMessage} />
      <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

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
    </div>
  );
}
