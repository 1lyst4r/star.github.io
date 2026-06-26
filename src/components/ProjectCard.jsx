import { GithubIcon, LinkIcon, StarIcon } from "./icons.jsx";
import { WarningBadge } from "./WarningBadge.jsx";

export function ProjectCard({ project }) {
  // Variables
  const description = project.desc || project.description;
  const stars = project.stars ?? project.starCount;
  const hasStars = stars !== undefined && stars !== null;

  return (
    <article className="project-card">
      <div className="project-card-body">
        <div className="project-card-header">
          <div className="project-name-wrap">
            <span className="project-card-name">{project.name}</span>
            {hasStars && (
              <span className="project-stars" aria-label={`${stars} stars`}>
                <StarIcon />
                {stars}
              </span>
            )}
            <WarningBadge message={project.warn} />
          </div>
          <div className="project-card-icons">
            {project.github && (
              <a className="project-icon-button" href={project.github} target="_blank" rel="noopener" title="GitHub" aria-label={`${project.name} GitHub`}>
                <GithubIcon />
              </a>
            )}
            {project.link && (
              <a className="project-icon-button" href={project.link} target="_blank" rel="noopener" title="Open project" aria-label={`Open ${project.name}`}>
                <LinkIcon />
              </a>
            )}
          </div>
        </div>
        {project.role && (
          <div className="project-card-role">
            <strong>Role:</strong> {project.role}
          </div>
        )}
        {description && <div className="project-card-description">{description}</div>}
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
    </article>
  );
}
