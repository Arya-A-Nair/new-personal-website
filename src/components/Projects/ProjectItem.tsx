import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectItem.module.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Project } from "../../data";

interface ProjectItemProps {
  data: Project;
}

const animation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const ProjectItem: React.FC<ProjectItemProps> = ({ data }) => {
  return (
    <motion.div
      className={styles.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={animation}
    >
      <div className={styles.projectHeader}>
        <div className={styles.projectMeta}>
          <div className={styles.projectTitle}>{data.title}</div>
          <div className={styles.projectActions}>
            <IconContext.Provider
              value={{
                className: styles.actionIcon,
                size: "1.2rem",
              }}
            >
              <button
                className={styles.githubButton}
                onClick={() => window.open(data.link)}
                aria-label={`View source code for ${data.title} on GitHub`}
                title="View Source Code"
              >
                <FaGithub aria-hidden="true" />
              </button>
            </IconContext.Provider>
          </div>
        </div>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={"/images/" + data.img}
              alt={`Screenshot of ${data.title} project`}
            />
            <button
              className={styles.viewProjectButton}
              onClick={() => window.open(data.link)}
              aria-label={`View ${data.title} project live`}
              title={`View ${data.title} project`}
            >
              <div className={styles.imageOverlay}>
                <IconContext.Provider
                  value={{
                    className: styles.overlayIcon,
                    size: "2.5rem",
                  }}
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                </IconContext.Provider>
              </div>
            </button>
          </div>
        </div>

        <div className={styles.projectContent}>
          <div className={styles.projectDescription}>
            <h4>About this project</h4>
            <ul role="list">
              {data.description.map((item, index) => (
                <li key={index} role="listitem">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.projectTechStack}>
            <h4>Technologies Used</h4>
            <div
              className={styles.techGrid}
              role="list"
              aria-label="Technologies used in this project"
            >
              {data.techStack.map((tech, index) => (
                <div key={index} className={styles.techItem} role="listitem">
                  <span className={styles.techIcon} aria-hidden="true">
                    ⚡
                  </span>
                  <span className={styles.techName}>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.projectLinks}>
            <button
              className={styles.secondaryButton}
              onClick={() => window.open(data.link)}
              aria-label={`View ${data.title} project live`}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              View Project
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectItem;
