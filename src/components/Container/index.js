import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";
import AboutUs from "../AboutUs";
import Projects from "../Projects";
import Experience from "../Experience";
import Navbar from "../Navbar/Navbar";

const Container = () => {
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showProjects, setShowProjects] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [activeElement, setActiveElement] = useState("");
    const [zIndexAboutUs, setZIndexAboutUs] = useState(0);
    const [zIndexProject, setZIndexProject] = useState(0);
    const [zIndexExperience, setZIndexExperience] = useState(0);

    useEffect(() => {
        const maxOfThree = Math.max(
            zIndexAboutUs,
            zIndexExperience,
            zIndexProject
        );
        if (activeElement === "AboutUs") {
            setZIndexAboutUs(maxOfThree + 1);
            setShowAboutUs(true);
        } else if (activeElement === "Projects") {
            setZIndexProject(maxOfThree + 1);
            setShowProjects(true);
        } else if (activeElement === "Experience") {
            setZIndexExperience(maxOfThree + 1);
            setShowExperience(true);
        }
    }, [activeElement]);

    return (
        <div className={styles.container}>
            <Navbar />
            {showAboutUs && (
                <AboutUs
                    onClickClose={() => {
                        setShowAboutUs(false);
                        setActiveElement("");
                    }}
                    setActiveElement={setActiveElement}
                    zIndexVal={zIndexAboutUs}
                    activeElement={activeElement}
                />
            )}
            {showProjects && (
                <Projects
                    onClickClose={() => {
                        setShowProjects(false);
                        setActiveElement("");
                    }}
                    setActiveElement={setActiveElement}
                    zIndexVal={zIndexProject}
                    activeElement={activeElement}
                />
            )}
            {showExperience && (
                <Experience
                    onClickClose={() => {
                        setShowExperience(false);
                        setActiveElement("");
                    }}
                    setActiveElement={setActiveElement}
                    zIndexVal={zIndexExperience}
                    activeElement={activeElement}
                />
            )}
            <Toolbar
                selectActiveItem={(e) => {
                    setActiveElement(e);
                }}
            />
        </div>
    );
};

export default Container;
