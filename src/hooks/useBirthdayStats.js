import { useCallback, useEffect, useRef, useState } from "react";
import { birthday, birthdayCountdownTarget } from "../data/profile.js";

function createBirthdayStats() {
  // Variables
  const now = new Date();
  const birthdayThisYear = new Date(now.getFullYear(), 7, 16);
  let ageInYears = now.getFullYear() - birthday.getFullYear();

  // Functions
  if (now < birthdayThisYear) {
    ageInYears -= 1;
  }

  const totalSecondsLeft = Math.max(0, Math.floor((birthdayCountdownTarget - now) / 1000));
  const days = Math.floor(totalSecondsLeft / 86400);
  const hours = Math.floor((totalSecondsLeft % 86400) / 3600);
  const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
  const seconds = totalSecondsLeft % 60;

  return {
    age: `${ageInYears} yrs`,
    countdown: {
      days: days.toLocaleString("en-US"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    },
    totalSecondsLeft
  };
}

export function useBirthdayStats(onCelebrationStart) {
  // Variables
  const initialStats = createBirthdayStats();
  const [age, setAge] = useState(initialStats.age);
  const [countdown, setCountdown] = useState(initialStats.countdown);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [countdownHidden, setCountdownHidden] = useState(false);
  const [birthdayNoteAvailable, setBirthdayNoteAvailable] = useState(false);
  const [birthdayNoteVisible, setBirthdayNoteVisible] = useState(false);
  const [birthdayMessageOpen, setBirthdayMessageOpen] = useState(false);
  const birthdayCelebrationStartedRef = useRef(false);
  const hideCountdownTimerRef = useRef(null);
  const birthdayButtonFrameRef = useRef(null);

  // Functions
  const closeBirthdayMessage = useCallback(() => {
    setBirthdayMessageOpen(false);
  }, []);

  const openBirthdayMessage = useCallback(() => {
    setBirthdayMessageOpen(true);
  }, []);

  const showBirthdayNoteButton = useCallback(() => {
    if (birthdayNoteAvailable) {
      return;
    }

    setBirthdayNoteAvailable(true);
    birthdayButtonFrameRef.current = requestAnimationFrame(() => {
      setBirthdayNoteVisible(true);
    });
  }, [birthdayNoteAvailable]);

  const fadeOutCountdown = useCallback(() => {
    if (countdownComplete) {
      return;
    }

    setCountdownComplete(true);
    hideCountdownTimerRef.current = window.setTimeout(() => {
      setCountdownHidden(true);
    }, 850);
  }, [countdownComplete]);

  const startBirthdayCelebration = useCallback(() => {
    showBirthdayNoteButton();
    fadeOutCountdown();

    if (birthdayCelebrationStartedRef.current) {
      return;
    }

    birthdayCelebrationStartedRef.current = true;
    onCelebrationStart();
    openBirthdayMessage();
  }, [fadeOutCountdown, onCelebrationStart, openBirthdayMessage, showBirthdayNoteButton]);

  const updateBirthdayStats = useCallback(() => {
    const nextStats = createBirthdayStats();
    setAge(nextStats.age);
    setCountdown(nextStats.countdown);

    if (nextStats.totalSecondsLeft === 0) {
      startBirthdayCelebration();
    }
  }, [startBirthdayCelebration]);

  useEffect(() => {
    updateBirthdayStats();
    const intervalId = window.setInterval(updateBirthdayStats, 1000);

    return () => {
      window.clearInterval(intervalId);

      if (hideCountdownTimerRef.current) {
        window.clearTimeout(hideCountdownTimerRef.current);
      }

      if (birthdayButtonFrameRef.current) {
        cancelAnimationFrame(birthdayButtonFrameRef.current);
      }
    };
  }, [updateBirthdayStats]);

  return {
    age,
    countdown,
    countdownComplete,
    countdownHidden,
    birthdayNoteAvailable,
    birthdayNoteVisible,
    birthdayMessageOpen,
    openBirthdayMessage,
    closeBirthdayMessage
  };
}
