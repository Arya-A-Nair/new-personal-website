import React from "react";
import "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";

const Projects = ({ onClickClose, setActiveElement, zIndexVal }) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Projects")}
            zIndexVal={zIndexVal}
            offset={40}
        >
            Projects
        </WindowBox>
    );
};

export default Projects;
