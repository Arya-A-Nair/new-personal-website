import React from "react";
import "./Experience.module.css";
import WindowBox from "../WindowBox/WindowBox";

const Experience = ({ onClickClose, setActiveElement, zIndexVal }) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Experience")}
            zIndexVal={zIndexVal}
        >
            Experience
        </WindowBox>
    );
};

export default Experience;
