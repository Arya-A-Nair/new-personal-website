import React from "react";
import {
  WindowConfig,
  WindowComponentProps,
} from "../../config/windowComponents";

interface WindowRendererProps {
  config: WindowConfig;
  isVisible: boolean;
  zIndex: number;
  activeElement: string;
  onClose: (windowId: string) => void;
  setActiveElement: (element: string) => void;
  slug?: string;
  searchParams?: URLSearchParams;
  updateSlug?: (
    slug: string | null,
    shouldReplace?: boolean,
    queryParams?: Record<string, string>
  ) => void;
}

const WindowRenderer: React.FC<WindowRendererProps> = ({
  config,
  isVisible,
  zIndex,
  activeElement,
  onClose,
  setActiveElement,
  slug,
  searchParams,
  updateSlug,
}) => {
  if (!isVisible) {
    return null;
  }

  const Component = config.component;

  const windowProps: WindowComponentProps = {
    onClickClose: () => onClose(config.id),
    setActiveElement,
    zIndexVal: zIndex,
    activeElement,
    slug,
    searchParams,
    updateSlug,
  };

  return <Component {...windowProps} />;
};

export default WindowRenderer;
