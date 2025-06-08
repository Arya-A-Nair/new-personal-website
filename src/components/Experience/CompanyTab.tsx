import React from "react";
import styles from "./CompanyTab.module.css";
import { motion } from "framer-motion";

interface CompanyTabProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

// write a variant for framer  in which the text color and the border bottom becomes #67B6FF when the tab is active and #fff when the tab is inactive
const animation = {
    hidden: {
        color: "#fff",
        borderBottom: "1px solid #fff",
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
    visible: {
        color: "#67B6FF",
        borderBottom: "1px solid #67B6FF",
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

const CompanyTab: React.FC<CompanyTabProps> = ({
    title,
    isActive,
    onClick,
}) => {
    return (
        <motion.div
            className={styles.container}
            onClick={() => onClick()}
            variants={animation}
            animate={isActive ? "visible" : "hidden"}
        >
            {title}
        </motion.div>
    );
};

export default CompanyTab;
