import React from "react";
import styles from "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar/Navbar";
import WindowRenderer from "./WindowRenderer";
import CommandCentre from "../CommandCentre";
import DesktopApp from "../DesktopApp/DesktopApp";
import BootScreen from "../BootScreen/BootScreen";
import { useWindowManager } from "../../hooks/useWindowManager";

const Container: React.FC = () => {
  const {
    windowStates,
    activeElement,
    brightness,
    showPreloader,
    showCommandCentre,
    slug,
    searchParams,
    setBrightness,
    activateWindow,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleCommandCentre,
    closeCommandCentre,
    updateSlug,
    appConfig,
    windowComponentsConfig,
  } = useWindowManager();

  if (showPreloader) {
    return <BootScreen duration={appConfig.preloader.duration} />;
  }

  return (
    <div
      className={styles.container}
      style={{
        opacity: brightness,
      }}
    >
      <Navbar
        setBrightness={setBrightness}
        brightness={brightness}
        onCommandCentreToggle={toggleCommandCentre}
        activeElement={activeElement}
        onOpenApp={activateWindow}
      />

      <DesktopApp />

      {windowComponentsConfig.map(config => (
        <WindowRenderer
          key={config.id}
          config={config}
          isVisible={windowStates[config.id]?.isVisible || false}
          zIndex={windowStates[config.id]?.zIndex || config.defaultZIndex}
          activeElement={activeElement}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          setActiveElement={focusWindow}
          slug={slug}
          searchParams={searchParams}
          updateSlug={updateSlug}
        />
      ))}

      <Toolbar
        selectActiveItem={activateWindow}
        activeElement={activeElement}
        windowStates={windowStates}
      />

      <CommandCentre
        isVisible={showCommandCentre}
        onClose={closeCommandCentre}
        windowConfigs={windowComponentsConfig}
        onApplicationSelect={activateWindow}
        windowStates={windowStates}
      />
    </div>
  );
};

export default Container;
