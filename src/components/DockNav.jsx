import { socialLinks } from "../data/profile.js";
import { BirthdayNoteIcon, BlogIcon, DiscordIcon, HomeIcon, ProjectsIcon } from "./icons.jsx";

function openExternalUrl(url) {
  // Functions
  window.open(url, "_blank");
}

export function DockNav({ selectedPage, onSwitchPage, birthdayNoteAvailable, birthdayNoteVisible, onOpenBirthdayMessage }) {
  // Variables
  const birthdayButtonClassName = `dock-button birthday-note-button${birthdayNoteVisible ? " is-visible" : ""}`;
  const birthdayButtonStyle = birthdayNoteAvailable ? { display: "flex" } : undefined;
  const birthdayButtonAriaHidden = birthdayNoteAvailable ? "false" : "true";
  const birthdayButtonTabIndex = birthdayNoteAvailable ? undefined : -1;

  // Functions
  return (
    <nav className="dock-nav">
      <button
        className={`dock-button${selectedPage === "home-page" ? " active" : ""}`}
        id="btn-home-page"
        onClick={() => onSwitchPage("home-page")}
        title="Home"
        type="button"
      >
        <HomeIcon />
      </button>
      <button
        className={`dock-button${selectedPage === "projects-page" ? " active" : ""}`}
        id="btn-projects-page"
        onClick={() => onSwitchPage("projects-page")}
        title="Projects"
        type="button"
      >
        <ProjectsIcon />
      </button>
      <button
        className={birthdayButtonClassName}
        id="birthday-note-button"
        onClick={onOpenBirthdayMessage}
        title="Birthday note"
        aria-hidden={birthdayButtonAriaHidden}
        tabIndex={birthdayButtonTabIndex}
        style={birthdayButtonStyle}
        type="button"
      >
        <BirthdayNoteIcon />
      </button>
      <button className="dock-button" title="Blog (coming soon)" style={{ opacity: 0.28, cursor: "not-allowed" }} type="button">
        <BlogIcon />
      </button>
      <div className="dock-separator" />
      <button
        className="dock-button icon-filled"
        onClick={() => openExternalUrl(socialLinks.discord)}
        title="Discord"
        style={{ color: "#5865f2" }}
        type="button"
      >
        <DiscordIcon />
      </button>
      <button
        className="dock-button"
        onClick={() => openExternalUrl(socialLinks.roblox)}
        title="Roblox"
        style={{ color: "#e8e8e8" }}
        type="button"
      >
        <img className="dock-image-icon" src="https://files.catbox.moe/xdngjl.png" alt="Roblox" />
      </button>
      <button
        className="dock-button"
        onClick={() => openExternalUrl(socialLinks.x)}
        title="X / Twitter"
        style={{ color: "#e7e7e7" }}
        type="button"
      >
        <img className="dock-image-icon" src="https://files.catbox.moe/hwlhdr.webp" alt="X" />
      </button>
    </nav>
  );
}
