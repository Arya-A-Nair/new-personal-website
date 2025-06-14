import { ComponentType } from "react";
import AboutUs from "../components/AboutUs";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Notes from "../components/Notes";

import linux from "../assets/linux.png";
import visualStudio from "../assets/visualStudio.png";
import terminal from "../assets/terminal.png";
import notes from "../assets/notes.png";

export interface WindowComponentProps {
  onClickClose: () => void;
  setActiveElement: (element: string) => void;
  zIndexVal: number;
  activeElement: string;
  slug?: string;
  searchParams?: URLSearchParams;
  updateSlug?: (
    slug: string | null,
    shouldReplace?: boolean,
    queryParams?: Record<string, string>
  ) => void;
}

export interface WindowConfig {
  id: string;
  name: string;
  displayName: string;
  component: ComponentType<WindowComponentProps>;
  icon: string;
  defaultZIndex: number;
  preload?: boolean;
  description?: string;
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
    position: "bottom" | "top";
  };
}

export const windowComponentsConfig: WindowConfig[] = [
  {
    id: "AboutUs",
    name: "About Me",
    displayName: "About Me",
    component: AboutUs,
    icon: linux,
    defaultZIndex: 1,
    preload: true,
    description: "Learn more about Arya Nair",
  },
  {
    id: "Projects",
    name: "Projects",
    displayName: "Projects",
    component: Projects,
    icon: visualStudio,
    defaultZIndex: 1,
    preload: false,
    description: "View my portfolio projects",
  },
  {
    id: "Experience",
    name: "Experience",
    displayName: "Experience",
    component: Experience,
    icon: terminal,
    defaultZIndex: 1,
    preload: false,
    description: "Check out my work experience",
  },
  {
    id: "Notes",
    name: "Notes",
    displayName: "Notes",
    component: Notes,
    icon: notes,
    defaultZIndex: 1,
    preload: false,
    description: "Browse my knowledge base and notes",
  },
];

export const appConfig: AppConfig = {
  preloader: {
    duration: 2000,
    imageSrc: "/images/preloader.gif",
    altText: "Loading...",
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
    position: "bottom",
  },
};

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
  return windowComponentsConfig;
};

export const validateWindowConfig = (config: WindowConfig): boolean => {
  const requiredFields = ["id", "name", "displayName", "component", "icon"];
  return requiredFields.every(
    field => field in config && config[field as keyof WindowConfig]
  );
};

export const getWindowDisplayName = (id: string): string => {
  const config = getWindowConfigById(id);
  return config?.displayName || id;
};

export const getWindowIcon = (id: string): string | undefined => {
  const config = getWindowConfigById(id);
  return config?.icon;
};

export const isValidWindowId = (id: string): boolean => {
  return getAllWindowIds().includes(id);
};
