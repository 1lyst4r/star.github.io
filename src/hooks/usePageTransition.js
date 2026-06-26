import { useCallback, useEffect, useRef, useState } from "react";

export function usePageTransition(currentPage) {
  // Variables
  const [activePage, setActivePage] = useState(currentPage);
  const [exitingPage, setExitingPage] = useState(null);
  const currentPageRef = useRef(currentPage);
  const timersRef = useRef([]);

  // Functions
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);

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

  const shouldRenderPage = useCallback(
    (pageId) => {
      return pageId === currentPage || pageId === activePage || pageId === exitingPage;
    },
    [activePage, currentPage, exitingPage]
  );

  useEffect(() => {
    if (currentPage === currentPageRef.current) {
      return;
    }

    const previousPage = currentPageRef.current;
    currentPageRef.current = currentPage;

    clearTimers();
    setActivePage(null);
    setExitingPage(previousPage);

    timersRef.current = [
      window.setTimeout(() => setActivePage(currentPage), 60),
      window.setTimeout(() => setExitingPage(null), 620)
    ];
  }, [clearTimers, currentPage]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    getPageClassName,
    shouldRenderPage
  };
}
