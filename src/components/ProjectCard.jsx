import { GithubIcon, LinkIcon } from "./icons.jsx";
import { WarningBadge } from "./WarningBadge.jsx";

export function ProjectCard({ project }) {
  // Variables
  const CardElement = project.link ? "a" : "div";
  const cardProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener"
      }
    : {};

  // Functions
  const openGithub = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(project.github, "_blank", "noopener");
  };

  return (
    <CardElement className="project-card" {...cardProps}>
      {project.thumb && <img className="project-thumbnail" src={project.thumb} alt={`${project.name} thumbnail`} loading="lazy" />}
      <div className="project-card-body">
        <div className="project-card-header">
          <div className="project-name-wrap">
            <span className="project-card-name">{project.name}</span>
            <WarningBadge message={project.warn} />
          </div>
          <div className="project-card-icons">
            {project.github && (
              <button className="project-icon-button" title="GitHub" onClick={openGithub} type="button">
                <GithubIcon />
              </button>
            )}
            {project.link && (
              <span className="project-icon-button" style={{ cursor: "default" }}>
                <LinkIcon />
              </span>
            )}
          </div>
        </div>
        {project.desc && <div className="project-card-description">{project.desc}</div>}
        {project.role && (
          <div className="project-card-role">
            <strong>Role:</strong> {project.role}
          </div>
        )}
        {project.tags?.length > 0 && (
          <div className="project-tags-list">
            {project.tags.map((tag) => (
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
