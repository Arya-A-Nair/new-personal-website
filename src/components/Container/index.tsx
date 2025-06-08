import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";
import AboutUs from "../AboutUs";
import Projects from "../Projects";
import Experience from "../Experience";
import Navbar from "../Navbar/Navbar";

const Container: React.FC = () => {
    const [showAboutUs, setShowAboutUs] = useState<boolean>(false);
    const [showProjects, setShowProjects] = useState<boolean>(false);
    const [showExperience, setShowExperience] = useState<boolean>(false);
    const [activeElement, setActiveElement] = useState<string>("");
    const [zIndexAboutUs, setZIndexAboutUs] = useState<number>(0);
    const [zIndexProject, setZIndexProject] = useState<number>(0);
    const [zIndexExperience, setZIndexExperience] = useState<number>(0);
    const [, setZIndexCounter] = useState<number>(1);
    const [showPreloader, setShowPreloader] = useState<boolean>(true);
    const [brightness, setBrightness] = useState<number>(1);

    useEffect(() => {
        if (activeElement === "AboutUs") {
            setZIndexCounter((prev) => {
                setZIndexAboutUs(prev + 1);
                return prev + 1;
            });
            setShowAboutUs(true);
        } else if (activeElement === "Projects") {
            setZIndexCounter((prev) => {
                setZIndexProject(prev + 1);
                return prev + 1;
            });
            setShowProjects(true);
        } else if (activeElement === "Experience") {
            setZIndexCounter((prev) => {
                setZIndexExperience(prev + 1);
                return prev + 1;
            });
            setShowExperience(true);
        }
    }, [activeElement]);

    useEffect(() => {
        setTimeout(() => {
            setShowPreloader(false);
        }, 2000);
    }, []);

    return (
        <>
            {showPreloader && (
                <img
                    src="/images/preloader.gif"
                    alt="preloader"
                    className={styles.preloader}
                />
            )}
            {!showPreloader && (
                <div
                    className={styles.container}
                    style={{
                        opacity: brightness,
                    }}
                >
                    <Navbar
                        setBrightness={setBrightness}
                        brightness={brightness}
                    />
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
                        selectActiveItem={(e: string) => {
                            setActiveElement(e);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Container;
