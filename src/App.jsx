import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PortfolioSurface } from "./components/PortfolioSurface.jsx";
import { ThemeSplash } from "./components/ThemeSplash.jsx";
import { typingIntro } from "./data/profile.js";
import { useBirthdayStats } from "./hooks/useBirthdayStats.js";
import { useConfetti } from "./hooks/useConfetti.js";
import { useCursorGlow } from "./hooks/useCursorGlow.js";
import { usePageTransition } from "./hooks/usePageTransition.js";
import { useThemeTransition } from "./hooks/useThemeTransition.js";
import { useTypingIntro } from "./hooks/useTypingIntro.js";

function getPageIdFromPath(pathname) {
  // Variables
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  // Functions
  return normalizedPath === "/projects" ? "projects-page" : "home-page";
}

export default function App() {
  // Variables
  const [theme, setTheme] = useState("dark");
  const location = useLocation();
  const themeRef = useRef(theme);
  const cursorGlowRef = useCursorGlow();
  const typingState = useTypingIntro(typingIntro);
  const pageTransition = usePageTransition(getPageIdFromPath(location.pathname));
  const confetti = useConfetti();
  const birthdayStats = useBirthdayStats(confetti.launchConfetti);
  const { transition, startTransition } = useThemeTransition();

  // Functions
  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const swapTheme = useCallback(() => {
    const currentTheme = themeRef.current;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    startTransition(currentTheme, nextTheme, () => {
      themeRef.current = nextTheme;
      setTheme(nextTheme);
    });
  }, [startTransition]);

  return (
    <>
      <PortfolioSurface
        theme={theme}
        onToggleTheme={swapTheme}
        cursorGlowRef={cursorGlowRef}
        pageTransition={pageTransition}
        typingState={typingState}
        birthdayStats={birthdayStats}
        confetti={confetti}
      />

      <ThemeSplash transition={transition} />
    </>
  );
}
