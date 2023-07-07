import React from "react";
import { motion } from "framer-motion";
import styles from "./ProjectItem.module.css";
const animation = {
    hidden: {
        x: 200,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 40,
            damping: 10,
        },
    },
    exit: {
        x: -200,
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 40,
            damping: 10,
        },
    },
};

const ProjectItem = ({ data }) => {
    return (
        <motion.div
            className={styles.container}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animation}
        >
            <div className={[styles.imageContainer]}>
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    <img src={process.env.PUBLIC_URL + "/images/" + data.img} />
                    <div className={styles.overlay}>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/images/mark-github.png"
                            }
                            onClick={() => window.open(data.link)}
                        />
                    </div>
                </div>
            </div>
            <div className={[styles.childContainer]}>
                <div className={styles.projectTitle}>{data.title}</div>
                <div className={styles.projectDescription}>
                    <ul>
                        {data.description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.projectTechStack}>
                    <p>Technologies Interacted with</p>
                    <div>
                        {data.techStack.map((item, index) => (
                            <div key={index} className={styles.item}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectItem;
