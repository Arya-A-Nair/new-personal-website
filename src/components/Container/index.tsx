import React from "react";
import styles from "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar/Navbar";
import WindowRenderer from "./WindowRenderer";
import { useWindowManager } from "../../hooks/useWindowManager";

const Container: React.FC = () => {
    const {
        windowStates,
        activeElement,
        brightness,
        showPreloader,
        setActiveElement,
        setBrightness,
        activateWindow,
        focusWindow,
        closeWindow,
        appConfig,
        windowComponentsConfig,
    } = useWindowManager();

    if (showPreloader) {
        return (
            <img
                src={appConfig.preloader.imageSrc}
                alt={appConfig.preloader.altText}
                className={styles.preloader}
            />
        );
    }

    return (
        <div
            className={styles.container}
            style={{
                opacity: brightness,
            }}
        >
            <Navbar setBrightness={setBrightness} brightness={brightness} />

            {windowComponentsConfig.map((config) => (
                <WindowRenderer
                    key={config.id}
                    config={config}
                    isVisible={windowStates[config.id]?.isVisible || false}
                    zIndex={
                        windowStates[config.id]?.zIndex || config.defaultZIndex
                    }
                    activeElement={activeElement}
                    onClose={closeWindow}
                    setActiveElement={focusWindow}
                />
            ))}

            <Toolbar selectActiveItem={activateWindow} />
        </div>
    );
};

export default Container;
