import React from "react";
import WindowBox from "../WindowBox/WindowBox";

const AboutUs = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("AboutUs")}
            zIndexVal={zIndexVal}
            offset={60}
            displayText="So who am I??"
            activeElement={activeElement==="AboutUs"}
        >
            About Us
        </WindowBox>
    );
};

export default AboutUs;
