import { contributionSection } from "../data/contributions.js";
import { projectSections, projectsPageContent } from "../data/projects.js";
import { ProjectSection } from "../components/ProjectSection.jsx";

export function ProjectsPage({ className }) {
  // Variables
  const sections = [...projectSections, contributionSection];

  // Functions
  return (
    <div className={className} id="projects-page">
      <div className="projects-hero">
        <h1>{projectsPageContent.title}</h1>
        <p>{projectsPageContent.description}</p>
      </div>
      <div id="projects-sections-container">
        {sections.map((section) => (
          <ProjectSection section={section} key={section.title} />
        ))}
      </div>
    </div>
  );
}
