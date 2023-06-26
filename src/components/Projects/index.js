import React from "react";
import "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";

const Projects = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Projects")}
            zIndexVal={zIndexVal}
            offset={40}
            displayText="Projects I have worked on"
            activeElement={activeElement==="Projects"}
        >
            Projects
        </WindowBox>
    );
};

export default Projects;
