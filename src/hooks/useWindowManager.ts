import { useState, useEffect, useCallback } from 'react';
import { windowComponentsConfig, appConfig } from '../config/windowComponents';

// Window state interface
interface WindowState {
    isVisible: boolean;
    zIndex: number;
}

// Window manager hook
export const useWindowManager = () => {
    // Initialize window states
    const [windowStates, setWindowStates] = useState<Record<string, WindowState>>(() => {
        const initialStates: Record<string, WindowState> = {};
        windowComponentsConfig.forEach(config => {
            initialStates[config.id] = {
                isVisible: false,
                zIndex: config.defaultZIndex,
            };
        });
        return initialStates;
    });

    const [activeElement, setActiveElement] = useState<string>('');
    const [zIndexCounter, setZIndexCounter] = useState<number>(appConfig.zIndex.initial);
    const [brightness, setBrightness] = useState<number>(appConfig.brightness.default);
    const [showPreloader, setShowPreloader] = useState<boolean>(true);

    // Preloader management
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPreloader(false);
        }, appConfig.preloader.duration);

        return () => clearTimeout(timer);
    }, []);

    // Window activation handler
    const activateWindow = useCallback((windowId: string) => {
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
    }, [zIndexCounter]);

    // Window closing handler
    const closeWindow = useCallback((windowId: string) => {
        setWindowStates(prev => ({
            ...prev,
            [windowId]: {
                ...prev[windowId],
                isVisible: false,
            },
        }));
        setActiveElement('');
    }, []);

    // Active element change handler
    useEffect(() => {
        if (activeElement && windowComponentsConfig.find(config => config.id === activeElement)) {
            activateWindow(activeElement);
        }
    }, [activeElement, activateWindow]);

    return {
        // State
        windowStates,
        activeElement,
        brightness,
        showPreloader,

        // Actions
        setActiveElement,
        setBrightness,
        closeWindow,

        // Configuration
        appConfig,
        windowComponentsConfig,
    };
};

export default useWindowManager; 