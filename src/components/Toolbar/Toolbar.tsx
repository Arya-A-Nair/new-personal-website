import React, { useRef, useEffect, useMemo } from "react";
import { useMotionValue } from "framer-motion";
import styles from "./Toolbar.module.css";
import ToolbarItem from "./ToolbarItem";
import { getToolbarItems, appConfig } from "../../config/windowComponents";

interface ToolbarProps {
  selectActiveItem: (item: string) => void;
  activeElement: string;
  windowStates: Record<string, { isVisible: boolean; isMinimized: boolean }>;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectActiveItem,
  activeElement,
  windowStates,
}) => {
  const toolbarItems = getToolbarItems();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseX = useMotionValue(Infinity);

  const magnifyEnabled = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    []
  );

  const handleToolbarKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = itemRefs.current.findIndex(
      ref => ref === document.activeElement
    );

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % itemRefs.current.length;
        itemRefs.current[nextIndex]?.focus();
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex =
          (currentIndex - 1 + itemRefs.current.length) %
          itemRefs.current.length;
        itemRefs.current[prevIndex]?.focus();
        break;
      case "Home":
        event.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        itemRefs.current[itemRefs.current.length - 1]?.focus();
        break;
    }
  };

  useEffect(() => {
    const activeItem = toolbarItems.find(item => item.id === activeElement);
    if (activeItem) {
      const announcement = document.getElementById("toolbar-announcement");
      if (announcement) {
        announcement.textContent = `${activeItem.displayName} window is now active`;
      }
    }
  }, [activeElement, toolbarItems]);

  return (
    <>
      <div
        ref={toolbarRef}
        className={styles.container}
        style={{
          zIndex: appConfig.toolbar.maxZIndex,
        }}
        role="toolbar"
        aria-label="Application windows"
        onKeyDown={handleToolbarKeyDown}
        onMouseMove={e => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {toolbarItems.map((config, index) => (
          <ToolbarItem
            key={config.id}
            config={config}
            onSelect={selectActiveItem}
            isActive={activeElement === config.id}
            isRunning={
              windowStates[config.id]?.isVisible ||
              windowStates[config.id]?.isMinimized ||
              false
            }
            mouseX={mouseX}
            magnifyEnabled={magnifyEnabled}
            ref={el => (itemRefs.current[index] = el)}
          />
        ))}
      </div>
      <div
        id="toolbar-announcement"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </>
  );
};

export default Toolbar;
