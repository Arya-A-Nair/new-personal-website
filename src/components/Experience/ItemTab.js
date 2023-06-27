import React from "react";
import { motion } from "framer-motion";

// write a variant for item in framer that when a particular component is opened it appears ffrom the right and when it is closed it disappears to the left
const animation = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
    exit: {
        x: -100,
        opacity: 0,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

const ItemTab = ({ isActive, val }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animation}
        >
            {val + 1}
        </motion.div>
    );
};

export default ItemTab;
