import { useCallback, useEffect, useRef, useState } from "react";

export function usePageTransition(initialPage) {
  // Variables
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [activePage, setActivePage] = useState(initialPage);
  const [exitingPage, setExitingPage] = useState(null);
  const timersRef = useRef([]);

  // Functions
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  const switchPage = useCallback(
    (nextPage) => {
      if (nextPage === selectedPage) {
        return;
      }

      const previousPage = activePage || selectedPage;
      clearTimers();
      setSelectedPage(nextPage);
      setActivePage(null);
      setExitingPage(previousPage);

      timersRef.current = [
        window.setTimeout(() => setActivePage(nextPage), 60),
        window.setTimeout(() => setExitingPage(null), 620)
      ];
    },
    [activePage, clearTimers, selectedPage]
  );

  const getPageClassName = useCallback(
    (pageId) => {
      return [
        "page",
        activePage === pageId ? "active" : "",
        exitingPage === pageId ? "exit-left" : ""
      ]
        .filter(Boolean)
        .join(" ");
    },
    [activePage, exitingPage]
  );

  useEffect(() => clearTimers, [clearTimers]);

  return {
    selectedPage,
    switchPage,
    getPageClassName
  };
}
