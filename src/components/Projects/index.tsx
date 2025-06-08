import React, { useState } from "react";
import styles from "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { projects } from "../../assets/data";
import ProjectItem from "./ProjectItem";
import {
    BsArrowLeftCircle,
    BsArrowRightCircle,
} from "react-icons/bs";
import { IconContext } from "react-icons";

interface ProjectsProps {
    onClickClose: () => void;
    setActiveElement: (element: string) => void;
    zIndexVal: number;
    activeElement: string;
}

const Projects: React.FC<ProjectsProps> = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <IconContext.Provider value={{ className: styles.arrow , size:"1.5rem"}}>
            <WindowBox
                onClickClose={onClickClose}
                setActive={() => setActiveElement("Projects")}
                zIndexVal={zIndexVal}
                offset={40}
                displayText="Projects I have worked on"
                activeElement={activeElement === "Projects"}
                displayTextMobile={"Projects"}
            >
                <div className={styles.container}>
                    <div className={styles.containerTitle}>
                        <span className={styles.title}>Projects</span>
                        <span className={styles.greyLine}></span>
                    </div>
                    <div className={styles.projectContainer}>
                        {projects.map(
                            (item, index) =>
                                activeIndex === index && (
                                    <ProjectItem key={index} data={item} />
                                )
                        )}
                    </div>
                    <div className={styles.containerLine}>
                        <BsArrowLeftCircle
                            className={styles.arrow}
                            onClick={() => {
                                if (activeIndex > 0) {
                                    setActiveIndex(activeIndex - 1);
                                }
                            }}
                        />
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
                        <BsArrowRightCircle
                            className={styles.arrow}
                            onClick={() => {
                                if (activeIndex < projects.length - 1) {
                                    setActiveIndex(activeIndex + 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </WindowBox>
        </IconContext.Provider>
    );
};

export default Projects; 