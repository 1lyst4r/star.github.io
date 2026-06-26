import { projectSections } from "../data/projects.js";
import { GithubIcon, LinkIcon, WarningIcon } from "./icons.jsx";

function WarningBadge({ message }) {
  // Functions
  if (!message) {
    return null;
  }

  return (
    <span className="warning-wrapper">
      <span className="warning-icon">
        <WarningIcon />
      </span>
      <span className="warning-tooltip">{message}</span>
    </span>
  );
}

function ProjectCard({ card }) {
  // Variables
  const CardElement = card.link ? "a" : "div";
  const cardProps = card.link
    ? {
        href: card.link,
        target: "_blank",
        rel: "noopener"
      }
    : {};

  // Functions
  const openGithub = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(card.github, "_blank");
  };

  return (
    <CardElement className="project-card" {...cardProps}>
      {card.thumb && <img className="project-thumbnail" src={card.thumb} alt={`${card.name} thumbnail`} loading="lazy" />}
      <div className="project-card-body">
        <div className="project-card-header">
          <div className="project-name-wrap">
            <span className="project-card-name">{card.name}</span>
            <WarningBadge message={card.warn} />
          </div>
          <div className="project-card-icons">
            {card.github && (
              <button className="project-icon-button" title="GitHub" onClick={openGithub} type="button">
                <GithubIcon />
              </button>
            )}
            {card.link && (
              <span className="project-icon-button" style={{ cursor: "default" }}>
                <LinkIcon />
              </span>
            )}
          </div>
        </div>
        {card.desc && <div className="project-card-description">{card.desc}</div>}
        {card.role && (
          <div className="project-card-role">
            <strong>Role:</strong> {card.role}
          </div>
        )}
        {card.tags?.length > 0 && (
          <div className="project-tags-list">
            {card.tags.map((tag) => (
              <span className="project-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </CardElement>
  );
}

function ProjectSection({ section }) {
  // Functions
  if (!section.cards?.length) {
    return null;
  }

  return (
    <div className="projects-section">
      <div className="projects-section-title">{section.title}</div>
      <div className="projects-section-subtitle">{section.sub}</div>
      <div className="projects-grid">
        {section.cards.map((card) => (
          <ProjectCard card={card} key={card.name} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsPage({ className }) {
  // Functions
  return (
    <div className={className} id="projects-page">
      <div className="projects-hero">
        <h1>Projects</h1>
        <p>A collection of things I've built.</p>
      </div>
      <div id="projects-sections-container">
        {projectSections.map((section) => (
          <ProjectSection section={section} key={section.title} />
        ))}
      </div>
    </div>
  );
}
