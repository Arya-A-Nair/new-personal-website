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
}

const WindowRenderer: React.FC<WindowRendererProps> = ({
  config,
  isVisible,
  zIndex,
  activeElement,
  onClose,
  setActiveElement,
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
  };

  return <Component {...windowProps} />;
};

export default WindowRenderer;
