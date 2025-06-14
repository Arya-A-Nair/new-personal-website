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
  }, [windowId, slug]);

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

        // Add query parameters if provided
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

      // For Notes window, default to "all" if no slug is present
      if (windowId === "Notes" && !slug) {
        updateURL(windowId, "all");
      } else {
        updateURL(windowId, slug);
      }
    },
    [zIndexCounter, updateURL, slug]
  );

  const closeWindow = useCallback(
    (windowId: string) => {
      setWindowStates(prev => ({
        ...prev,
        [windowId]: {
          ...prev[windowId],
          isVisible: false,
        },
      }));
      setActiveElement(prev => {
        const newActiveElement = prev === windowId ? "" : prev;
        updateURL(newActiveElement || null);
        return newActiveElement;
      });
    },
    [updateURL]
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

      // For Notes window, default to "all" if no slug is present
      if (windowId === "Notes" && !slug) {
        updateURL(windowId, "all");
      } else {
        updateURL(windowId, slug);
      }
    },
    [zIndexCounter, updateURL, slug]
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

        // For Notes window, default to "all" if no slug is present
        if (windowId === "Notes" && !slug) {
          updateURL(windowId, "all");
        } else {
          updateURL(windowId, slug);
        }
      }
    },
    [windowStates, zIndexCounter, updateURL, slug]
  );

  const toggleCommandCentre = useCallback(() => {
    setShowCommandCentre(prev => !prev);
  }, []);

  const closeCommandCentre = useCallback(() => {
    setShowCommandCentre(false);
  }, []);

  const updateSlug = useCallback(
    (newSlug: string | null, shouldReplace = false, queryParams?: Record<string, string>) => {
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
