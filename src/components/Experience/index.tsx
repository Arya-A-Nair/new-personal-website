import React, { useState, useEffect } from "react";
import styles from "./Experience.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { experience } from "../../data";

interface ExperienceProps {
    onClickClose: () => void;
    setActiveElement: (element: string) => void;
    zIndexVal: number;
    activeElement: string;
}

const Experience: React.FC<ExperienceProps> = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [selectedCompany, setSelectedCompany] = useState<number>(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (activeElement !== "Experience") return;

            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    setSelectedCompany((prev) =>
                        prev > 0 ? prev - 1 : experience.length - 1
                    );
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    setSelectedCompany((prev) =>
                        prev < experience.length - 1 ? prev + 1 : 0
                    );
                    break;
                case "Escape":
                    event.preventDefault();
                    onClickClose();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeElement, onClickClose]);

    return (
        <WindowBox
            onClickClose={onClickClose}
            setActive={() => setActiveElement("Experience")}
            zIndexVal={zIndexVal}
            offset={20}
            displayText="Experience - Professional Journey"
            activeElement={activeElement === "Experience"}
            displayTextMobile={"Experience"}
        >
            <div className={styles.osContainer}>
                <div className={styles.explorerLayout}>
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <span className={styles.sidebarTitle}>
                                📁 Companies
                            </span>
                            <span className={styles.itemCount}>
                                ({experience.length} items)
                            </span>
                        </div>
                        <div className={styles.companyList}>
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`${styles.companyItem} ${
                                        selectedCompany === index
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => setSelectedCompany(index)}
                                >
                                    <span className={styles.folderIcon}>
                                        🏢
                                    </span>
                                    <div className={styles.companyDetails}>
                                        <span className={styles.companyName}>
                                            {exp.companyName}
                                        </span>
                                        <span className={styles.companyType}>
                                            {exp.position.includes("Intern")
                                                ? "Internship"
                                                : exp.position.includes("Head")
                                                ? "Leadership"
                                                : "Full-time"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.detailsPanel}>
                        <div className={styles.toolbar}>
                            <div className={styles.breadcrumb}>
                                <span>📁 Experience</span>
                                <span className={styles.separator}>›</span>
                                <span>
                                    {experience[selectedCompany].companyName}
                                </span>
                            </div>
                            <div className={styles.viewOptions}>
                                <div className={styles.keyboardHints}>
                                    <span className={styles.hint}>
                                        ↑↓ Navigate
                                    </span>
                                    <span className={styles.hint}>
                                        ESC Close
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.mobileHeader}>
                            <h1 className={styles.mobileTitle}>Experience</h1>
                            <p className={styles.mobileSubtitle}>
                                Professional Journey
                            </p>
                        </div>

                        <div className={styles.mobileCompanySelector}>
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`${styles.mobileCompanyChip} ${
                                        selectedCompany === index
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => setSelectedCompany(index)}
                                >
                                    {exp.companyName}
                                </div>
                            ))}
                        </div>

                        <div className={styles.contentArea}>
                            <div className={styles.mobileExperienceCard}>
                                <div className={styles.mobileCardHeader}>
                                    <div className={styles.mobileCompanyIcon}>
                                        🏢
                                    </div>
                                    <div className={styles.mobileCardInfo}>
                                        <h2 className={styles.position}>
                                            {
                                                experience[selectedCompany]
                                                    .position
                                            }
                                        </h2>
                                        <h3 className={styles.company}>
                                            {
                                                experience[selectedCompany]
                                                    .companyName
                                            }
                                        </h3>
                                        <div className={styles.duration}>
                                            📅{" "}
                                            {
                                                experience[selectedCompany]
                                                    .duration
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.experienceHeader}>
                                <div className={styles.companyInfo}>
                                    <h2 className={styles.position}>
                                        {experience[selectedCompany].position}
                                    </h2>
                                    <h3 className={styles.company}>
                                        @{" "}
                                        {
                                            experience[selectedCompany]
                                                .companyName
                                        }
                                    </h3>
                                    <div className={styles.duration}>
                                        📅{" "}
                                        {experience[selectedCompany].duration}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    <span className={styles.sectionIcon}>
                                        🎯
                                    </span>
                                    Key Achievements & Responsibilities
                                </h4>
                                <div className={styles.achievementsList}>
                                    {experience[selectedCompany].workDone.map(
                                        (work, idx) => (
                                            <div
                                                key={idx}
                                                className={styles.achievement}
                                            >
                                                <span className={styles.bullet}>
                                                    ▸
                                                </span>
                                                <span
                                                    className={
                                                        styles.achievementText
                                                    }
                                                >
                                                    {work}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h4 className={styles.sectionHeader}>
                                    <span className={styles.sectionIcon}>
                                        ⚡
                                    </span>
                                    Technologies & Tools
                                </h4>
                                <div className={styles.techGrid}>
                                    {experience[selectedCompany].techStack.map(
                                        (tech, idx) => (
                                            <div
                                                key={idx}
                                                className={styles.techItem}
                                            >
                                                <span
                                                    className={styles.techIcon}
                                                >
                                                    🔧
                                                </span>
                                                <span
                                                    className={styles.techName}
                                                >
                                                    {tech}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WindowBox>
    );
};

export default Experience;
