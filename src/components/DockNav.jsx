import { NavLink } from "react-router-dom";
import { socialLinks } from "../data/profile.js";
import { BirthdayNoteIcon, BlogIcon, DiscordIcon, HomeIcon, ProjectsIcon } from "./icons.jsx";

function openExternalUrl(url) {
  // Functions
  window.open(url, "_blank", "noopener");
}

function getDockLinkClassName({ isActive }) {
  // Functions
  return `dock-button${isActive ? " active" : ""}`;
}

export function DockNav({ birthdayNoteAvailable, birthdayNoteVisible, onOpenBirthdayMessage }) {
  // Variables
  const birthdayButtonClassName = `dock-button birthday-note-button${birthdayNoteVisible ? " is-visible" : ""}`;
  const birthdayButtonStyle = birthdayNoteAvailable ? { display: "flex" } : undefined;
  const birthdayButtonAriaHidden = birthdayNoteAvailable ? "false" : "true";
  const birthdayButtonTabIndex = birthdayNoteAvailable ? undefined : -1;

  // Functions
  return (
    <nav className="dock-nav">
      <NavLink
        aria-label="Home"
        className={getDockLinkClassName}
        end
        id="btn-home-page"
        title="Home"
        to="/"
      >
        <HomeIcon />
      </NavLink>
      <NavLink
        aria-label="Projects"
        className={getDockLinkClassName}
        id="btn-projects-page"
        title="Projects"
        to="/projects"
      >
        <ProjectsIcon />
      </NavLink>
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
