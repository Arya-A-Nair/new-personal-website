import React from "react";
import WindowBox from "../WindowBox/WindowBox";

const AboutUs = ({ onClickClose, setActiveElement, zIndexVal }) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("AboutUs")}
            zIndexVal={zIndexVal}
            offset={60}
            displayText="So who am I??"
        >
            About Us
        </WindowBox>
    );
};

export default AboutUs;
