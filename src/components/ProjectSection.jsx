import { ProjectCard } from "./ProjectCard.jsx";

export function ProjectSection({ section }) {
  // Functions
  if (!section.cards?.length) {
    return null;
  }

  return (
    <div className="projects-section">
      <div className="projects-section-title">{section.title}</div>
      <div className="projects-section-subtitle">{section.subtitle}</div>
      <div className="projects-grid">
        {section.cards.map((project) => (
          <ProjectCard project={project} key={project.name} />
        ))}
      </div>
    </div>
  );
}
