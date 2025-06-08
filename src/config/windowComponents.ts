import { ComponentType } from 'react';
import AboutUs from '../components/AboutUs';
import Projects from '../components/Projects';
import Experience from '../components/Experience';

// Import toolbar icons
import linux from '../assets/linux.png';
import visualStudio from '../assets/visualStudio.png';
import terminal from '../assets/terminal.png';

// Window component interface
export interface WindowComponentProps {
    onClickClose: () => void;
    setActiveElement: (element: string) => void;
    zIndexVal: number;
    activeElement: string;
}

export interface WindowConfig {
    id: string;
    name: string;
    displayName: string; // For toolbar display
    component: ComponentType<WindowComponentProps>;
    icon: string; // Toolbar icon path
    defaultZIndex: number;
    preload?: boolean;
    description?: string; // Optional description for accessibility
}

export interface AppConfig {
    preloader: {
        duration: number;
        imageSrc: string;
        altText: string;
    };
    brightness: {
        default: number;
        min: number;
        max: number;
    };
    zIndex: {
        initial: number;
        increment: number;
    };
    toolbar: {
        maxZIndex: number;
        position: 'bottom' | 'top';
    };
}

export const windowComponentsConfig: WindowConfig[] = [
    {
        id: 'AboutUs',
        name: 'About Me',
        displayName: 'About Me',
        component: AboutUs,
        icon: linux,
        defaultZIndex: 1,
        preload: true,
        description: 'Learn more about Arya Nair',
    },
    {
        id: 'Projects',
        name: 'Projects',
        displayName: 'Projects',
        component: Projects,
        icon: visualStudio,
        defaultZIndex: 1,
        preload: false,
        description: 'View my portfolio projects',
    },
    {
        id: 'Experience',
        name: 'Experience',
        displayName: 'Experience',
        component: Experience,
        icon: terminal,
        defaultZIndex: 1,
        preload: false,
        description: 'Check out my work experience',
    },
];

export const appConfig: AppConfig = {
    preloader: {
        duration: 2000,
        imageSrc: '/images/preloader.gif',
        altText: 'Loading...',
    },
    brightness: {
        default: 1,
        min: 0.1,
        max: 1,
    },
    zIndex: {
        initial: 1,
        increment: 1,
    },
    toolbar: {
        maxZIndex: 99999999,
        position: 'bottom',
    },
};

// Helper functions
export const getWindowConfigById = (id: string): WindowConfig | undefined => {
    return windowComponentsConfig.find(config => config.id === id);
};

export const getAllWindowIds = (): string[] => {
    return windowComponentsConfig.map(config => config.id);
};

export const getPreloadableWindows = (): WindowConfig[] => {
    return windowComponentsConfig.filter(config => config.preload);
};

export const getToolbarItems = (): WindowConfig[] => {
    return windowComponentsConfig; // All windows appear in toolbar by default
};

// Validation helpers
export const validateWindowConfig = (config: WindowConfig): boolean => {
    const requiredFields = ['id', 'name', 'displayName', 'component', 'icon'];
    return requiredFields.every(field => field in config && config[field as keyof WindowConfig]);
};

export const getWindowDisplayName = (id: string): string => {
    const config = getWindowConfigById(id);
    return config?.displayName || id;
};

export const getWindowIcon = (id: string): string | undefined => {
    const config = getWindowConfigById(id);
    return config?.icon;
};

// Type guards
export const isValidWindowId = (id: string): boolean => {
    return getAllWindowIds().includes(id);
}; 