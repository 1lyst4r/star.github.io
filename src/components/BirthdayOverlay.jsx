import { useEffect } from "react";
import { birthdayPopupText } from "../data/profile.js";

export function BirthdayOverlay({ isOpen, onClose }) {
  // Functions
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`birthday-overlay${isOpen ? " show" : ""}`}
      id="birthday-overlay"
      aria-hidden={isOpen ? "false" : "true"}
      onClick={handleOverlayClick}
    >
      <div className="birthday-message-card" role="dialog" aria-modal="true" aria-labelledby="birthday-message-title">
        <button className="birthday-close-button" onClick={onClose} aria-label="Close birthday message" type="button">
          {String.fromCharCode(215)}
        </button>
        <div className="birthday-message-eyebrow">august 16</div>
        <h2 id="birthday-message-title">{birthdayPopupText.title}</h2>
        <p id="birthday-message-body">{birthdayPopupText.body}</p>
      </div>
    </div>
  );
}
