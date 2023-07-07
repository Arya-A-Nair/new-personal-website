import React, { useEffect, useState } from "react";
import styles from "./Experience.module.css";
import WindowBox from "../WindowBox/WindowBox";
import ItemTab from "./ItemTab";
import CompanyTab from "./CompanyTab";
import { experience } from "../../assets/data";
const Experience = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Experience")}
            zIndexVal={zIndexVal}
            offset={20}
            displayText="Companies I have worked with"
            activeElement={activeElement === "Experience"}
            displayTextMobile={"Experience"}
        >
            <div className={styles.container}>
                <div className={styles.containerTitle}>
                    <span className={styles.title}>Experience</span>
                    <span className={styles.greyLine}></span>
                </div>
                <div className={styles.TabContainer}>
                    {experience.map((item, index) => (
                        <CompanyTab
                            key={index}
                            title={item.companyName}
                            isActive={activeIndex === index}
                            onClick={() => {
                                console.log(index);
                                setActiveIndex(index);
                            }}
                        />
                    ))}
                </div>
                {experience.map(
                    (item, index) =>
                        activeIndex === index && (
                            <ItemTab
                                isActive={activeIndex === index}
                                data={item}
                            />
                        )
                )}
            </div>
        </WindowBox>
    );
};

export default Experience;
