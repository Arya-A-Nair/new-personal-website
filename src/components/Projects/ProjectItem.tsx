import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectItem.module.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Project } from "../../assets/data";

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
                            <FaGithub
                                onClick={() => window.open(data.link)}
                                title="View Source Code"
                            />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>

            <div className={styles.contentLayout}>
                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                        <img src={"/images/" + data.img} alt={data.title} />
                        <div className={styles.imageOverlay}>
                            <IconContext.Provider
                                value={{
                                    className: styles.overlayIcon,
                                    size: "2.5rem",
                                }}
                            >
                                <FaExternalLinkAlt
                                    onClick={() => window.open(data.link)}
                                />
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>

                <div className={styles.projectContent}>
                    <div className={styles.projectDescription}>
                        <h4>About this project</h4>
                        <ul>
                            {data.description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.projectTechStack}>
                        <h4>Technologies Used</h4>
                        <div className={styles.techGrid}>
                            {data.techStack.map((tech, index) => (
                                <div key={index} className={styles.techItem}>
                                    <span className={styles.techIcon}>⚡</span>
                                    <span className={styles.techName}>
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.projectLinks}>
                        <button
                            className={styles.secondaryButton}
                            onClick={() => window.open(data.link)}
                        >
                            <FaGithub />
                            Source Code
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectItem;
