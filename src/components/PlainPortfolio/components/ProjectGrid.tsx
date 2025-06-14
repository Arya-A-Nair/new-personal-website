import React from "react";
import { Project } from "../../../data";
import styles from "../PlainPortfolio.module.css";

interface ProjectGridProps {
  projects: Project[];
  maxProjects?: number;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  maxProjects = 6,
}) => {
  const displayProjects = projects.slice(0, maxProjects);

  return (
    <div className={styles.section}>
      <h2 id="projects">featured projects</h2>
      <div className={styles.projectGrid}>
        {displayProjects.map((project, index) => (
          <div key={index} className={styles.projectItem}>
            <img src={`/images/${project.img}`} alt={project.title} />
            <div className={styles.projectInfo}>
              <h3>{project.title}</h3>
              <p>{project.description[0]}</p>
              <div className={styles.projectMeta}>
                <span>{project.techStack.slice(0, 3).join(", ")}</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
