import { useEffect, useState } from "react";

export function useTypingIntro({ text, speedBase, speedRandomness, startsAfter }) {
  // Variables
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showIntroSubtitle, setShowIntroSubtitle] = useState(false);
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Functions
  useEffect(() => {
    const timeoutIds = [];
    let typingIndex = 0;

    const scheduleTimeout = (callback, delay) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
      return timeoutId;
    };

    const typeNextCharacter = () => {
      if (typingIndex < text.length) {
        typingIndex += 1;
        setTypedText(text.slice(0, typingIndex));
        scheduleTimeout(typeNextCharacter, speedBase + Math.random() * speedRandomness);
        return;
      }

      scheduleTimeout(() => {
        setShowCursor(false);
        setShowIntroSubtitle(true);

        scheduleTimeout(() => {
          setShowAboutSection(true);
          setShowStats(true);
        }, 380);
      }, 320);
    };

    scheduleTimeout(typeNextCharacter, startsAfter);

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [speedBase, speedRandomness, startsAfter, text]);

  return {
    typedText,
    showCursor,
    showIntroSubtitle,
    showAboutSection,
    showStats
  };
}
