import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  windowComponentsConfig,
  appConfig,
  isValidWindowId,
} from "../config/windowComponents";

interface WindowState {
  isVisible: boolean;
  zIndex: number;
}

export const useWindowManager = () => {
  const navigate = useNavigate();
  const { windowId, slug } = useParams<{ windowId?: string; slug?: string }>();
  const [searchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const lastWindowId = useRef<string | undefined>(undefined);
  const lastSlug = useRef<string | undefined>(undefined);
  const windowHistory = useRef<string[]>([]);

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

  const updateWindowHistory = useCallback((windowId: string) => {
    windowHistory.current = [
      windowId,
      ...windowHistory.current.filter(id => id !== windowId),
    ].slice(0, 10);
  }, []);

  const getNextActiveWindow = useCallback(
    (closingWindowId: string, currentStates: Record<string, WindowState>) => {
      const filteredHistory = windowHistory.current.filter(
        id => id !== closingWindowId
      );

      for (const windowId of filteredHistory) {
        if (currentStates[windowId]?.isVisible) {
          return windowId;
        }
      }

      const visibleWindows = Object.keys(currentStates).filter(
        id => currentStates[id]?.isVisible && id !== closingWindowId
      );

      return visibleWindows.length > 0 ? visibleWindows[0] : null;
    },
    []
  );

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

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastWindowId.current = windowId;
      lastSlug.current = slug;

      if (windowId && isValidWindowId(windowId)) {
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
        updateWindowHistory(windowId);
      }
      return;
    }

    if (lastWindowId.current === windowId && lastSlug.current === slug) {
      return;
    }

    lastWindowId.current = windowId;
    lastSlug.current = slug;

    if (windowId && isValidWindowId(windowId)) {
      setWindowStates(prev => {
        const currentWindow = prev[windowId];
        if (!currentWindow?.isVisible) {
          return {
            ...prev,
            [windowId]: {
              ...currentWindow,
              isVisible: true,
              zIndex: zIndexCounter + appConfig.zIndex.increment,
            },
          };
        }
        return prev;
      });

      if (!windowStates[windowId]?.isVisible) {
        setZIndexCounter(prev => prev + appConfig.zIndex.increment);
      }
      setActiveElement(windowId);
      updateWindowHistory(windowId);
    } else if (!windowId) {
      setWindowStates(prev => {
        const newStates = { ...prev };
        let hasChanges = false;
        Object.keys(newStates).forEach(id => {
          if (newStates[id].isVisible) {
            newStates[id] = { ...newStates[id], isVisible: false };
            hasChanges = true;
          }
        });
        return hasChanges ? newStates : prev;
      });
      setActiveElement("");
    }
  }, [windowId, slug, zIndexCounter, windowStates, updateWindowHistory]);

  const updateURL = useCallback(
    (
      newWindowId: string | null,
      newSlug?: string | null,
      shouldReplace = false,
      queryParams?: Record<string, string>
    ) => {
      const options = shouldReplace ? { replace: true } : {};

      if (newWindowId && isValidWindowId(newWindowId)) {
        let url = `/window/${newWindowId}`;
        if (newSlug) {
          url += `/${newSlug}`;
        }

        if (queryParams && Object.keys(queryParams).length > 0) {
          const params = new URLSearchParams();
          Object.entries(queryParams).forEach(([key, value]) => {
            if (value) params.set(key, value);
          });
          const queryString = params.toString();
          if (queryString) {
            url += `?${queryString}`;
          }
        }

        navigate(url, options);
      } else {
        navigate("/", options);
      }
    },
    [navigate]
  );

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
      updateWindowHistory(windowId);

      if (windowId === "Notes") {
        const currentParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          currentParams[key] = value;
        });

        if (!slug) {
          updateURL(windowId, "all", false, currentParams);
        } else {
          updateURL(windowId, slug, false, currentParams);
        }
      } else {
        updateURL(windowId, slug);
      }
    },
    [zIndexCounter, updateURL, slug, updateWindowHistory, searchParams]
  );

  const closeWindow = useCallback(
    (windowId: string) => {
      setWindowStates(prev => {
        const newStates = {
          ...prev,
          [windowId]: {
            ...prev[windowId],
            isVisible: false,
          },
        };

        const nextActiveWindow = getNextActiveWindow(windowId, newStates);

        if (nextActiveWindow) {
          setActiveElement(nextActiveWindow);
          if (nextActiveWindow === "Notes") {
            const currentParams: Record<string, string> = {};
            searchParams.forEach((value, key) => {
              currentParams[key] = value;
            });

            if (!slug) {
              updateURL(nextActiveWindow, "all", false, currentParams);
            } else {
              updateURL(nextActiveWindow, slug, false, currentParams);
            }
          } else {
            updateURL(nextActiveWindow, slug);
          }
        } else {
          setActiveElement("");
          updateURL(null);
        }

        return newStates;
      });
    },
    [getNextActiveWindow, updateURL, slug, searchParams]
  );

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
      updateWindowHistory(windowId);

      if (windowId === "Notes") {
        const currentParams: Record<string, string> = {};
        searchParams.forEach((value, key) => {
          currentParams[key] = value;
        });

        if (!slug) {
          updateURL(windowId, "all", false, currentParams);
        } else {
          updateURL(windowId, slug, false, currentParams);
        }
      } else {
        updateURL(windowId, slug);
      }
    },
    [zIndexCounter, updateURL, slug, updateWindowHistory, searchParams]
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
        updateWindowHistory(windowId);

        if (windowId === "Notes") {
          const currentParams: Record<string, string> = {};
          searchParams.forEach((value, key) => {
            currentParams[key] = value;
          });

          if (!slug) {
            updateURL(windowId, "all", false, currentParams);
          } else {
            updateURL(windowId, slug, false, currentParams);
          }
        } else {
          updateURL(windowId, slug);
        }
      }
    },
    [
      windowStates,
      zIndexCounter,
      updateURL,
      slug,
      updateWindowHistory,
      searchParams,
    ]
  );

  const toggleCommandCentre = useCallback(() => {
    setShowCommandCentre(prev => !prev);
  }, []);

  const closeCommandCentre = useCallback(() => {
    setShowCommandCentre(false);
  }, []);

  const updateSlug = useCallback(
    (
      newSlug: string | null,
      shouldReplace = false,
      queryParams?: Record<string, string>
    ) => {
      updateURL(activeElement, newSlug, shouldReplace, queryParams);
    },
    [activeElement, updateURL]
  );

  return {
    windowStates,
    activeElement,
    brightness,
    showPreloader,
    showCommandCentre,
    slug,
    searchParams,

    setActiveElement,
    setBrightness,
    activateWindow,
    openWindow,
    focusWindow,
    closeWindow,
    toggleCommandCentre,
    closeCommandCentre,
    updateSlug,

    appConfig,
    windowComponentsConfig,
  };
};

export default useWindowManager;
