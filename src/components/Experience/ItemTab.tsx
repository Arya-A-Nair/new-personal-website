import React from "react";
import { motion } from "framer-motion";
import styles from "./ItemTab.module.css";
import { Experience } from "../../assets/data";

interface ItemTabProps {
    isActive: boolean;
    data: Experience;
}

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

const ItemTab: React.FC<ItemTabProps> = ({ isActive, data }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animation}
            className={styles.container}
        >
            <div>
                <span className={styles.position}>{data.position}</span>
                <span className={styles.companyName}>{data.companyName}</span>
            </div>
            <div className={styles.duration}>{data.duration}</div>
            <div className={styles.superContainer}>
                <div className={styles.workDone}>
                    <ul>
                        {data.workDone.map((work, index) => (
                            <li key={index}>{work}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.techStack}>
                    {data.techStack.map((tech, index) => (
                        <div key={index} className={styles.item}>
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ItemTab;
