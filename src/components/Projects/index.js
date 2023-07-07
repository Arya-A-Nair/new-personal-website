import React, { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { projects } from "../../assets/data";
import ProjectItem from "./ProjectItem";

const Projects = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        let interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Projects")}
            zIndexVal={zIndexVal}
            offset={40}
            displayText="Projects I have worked on"
            activeElement={activeElement === "Projects"}
        >
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <span className={styles.title}>Projects</span>
                    <span className={styles.greyLine}></span>
                </div>
                <div>
                    {projects.map(
                        (item, index) =>
                            activeIndex === index && (
                                <ProjectItem key={index} data={item} />
                            )
                    )}
                </div>
                <div className={styles.containerLine}>
                    {projects.map((item, index) => (
                        <div
                            key={index}
                            className={
                                activeIndex === index
                                    ? styles.blueLine
                                    : styles.greyLine
                            }
                            onClick={() => {
                                setActiveIndex(index);
                            }}
                        />
                    ))}
                </div>
            </div>
        </WindowBox>
    );
};

export default Projects;
