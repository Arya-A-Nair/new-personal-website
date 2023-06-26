import React from "react";
import "./Experience.module.css";
import WindowBox from "../WindowBox/WindowBox";

const Experience = ({ onClickClose, setActiveElement, zIndexVal,activeElement }) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Experience")}
            zIndexVal={zIndexVal}
            offset={20}
            displayText="Companies I have worked with"
            activeElement={activeElement==="Experience"}
        >
            Experience
        </WindowBox>
    );
};

export default Experience;
