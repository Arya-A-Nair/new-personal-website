import { useState, useEffect, useCallback } from "react";
import { windowComponentsConfig, appConfig } from "../config/windowComponents";

interface WindowState {
  isVisible: boolean;
  zIndex: number;
}

export const useWindowManager = () => {
  const [windowStates, setWindowStates] = useState<Record<string, WindowState>>(
    () => {
      const initialStates: Record<string, WindowState> = {};
      windowComponentsConfig.forEach(config => {
        initialStates[config.id] = {
          isVisible: false,
          zIndex: config.defaultZIndex,
        };
      });
      return initialStates;
    }
  );

  const [activeElement, setActiveElement] = useState<string>("");
  const [zIndexCounter, setZIndexCounter] = useState<number>(
    appConfig.zIndex.initial
  );
  const [brightness, setBrightness] = useState<number>(
    appConfig.brightness.default
  );
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [showCommandCentre, setShowCommandCentre] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, appConfig.preloader.duration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showCommandCentre) {
        setShowCommandCentre(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCommandCentre]);

  const activateWindow = useCallback(
    (windowId: string) => {
      setWindowStates(prev => ({
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isVisible: true,
          zIndex: zIndexCounter + appConfig.zIndex.increment,
        },
      }));
      setZIndexCounter(prev => prev + appConfig.zIndex.increment);
      setActiveElement(windowId);
    },
    [zIndexCounter]
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isVisible: false,
      },
    }));
    setActiveElement(prev => (prev === windowId ? "" : prev));
  }, []);

  const openWindow = useCallback(
    (windowId: string) => {
      setWindowStates(prev => ({
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isVisible: true,
          zIndex: zIndexCounter + appConfig.zIndex.increment,
        },
      }));
      setZIndexCounter(prev => prev + appConfig.zIndex.increment);
    },
    [zIndexCounter]
  );

  const focusWindow = useCallback(
    (windowId: string) => {
      if (windowStates[windowId]?.isVisible) {
        setWindowStates(prev => ({
          ...prev,
          [windowId]: {
            ...prev[windowId],
            zIndex: zIndexCounter + appConfig.zIndex.increment,
          },
        }));
        setZIndexCounter(prev => prev + appConfig.zIndex.increment);
        setActiveElement(windowId);
      }
    },
    [windowStates, zIndexCounter]
  );

  const toggleCommandCentre = useCallback(() => {
    setShowCommandCentre(prev => !prev);
  }, []);

  const closeCommandCentre = useCallback(() => {
    setShowCommandCentre(false);
  }, []);

  return {
    windowStates,
    activeElement,
    brightness,
    showPreloader,
    showCommandCentre,

    setActiveElement,
    setBrightness,
    activateWindow,
    openWindow,
    focusWindow,
    closeWindow,
    toggleCommandCentre,
    closeCommandCentre,

    appConfig,
    windowComponentsConfig,
  };
};

export default useWindowManager;
