import React, { forwardRef } from "react";
import styles from "./Toolbar.module.css";
import { WindowConfig } from "../../config/windowComponents";

interface ToolbarItemProps {
  config: WindowConfig;
  onSelect: (windowId: string) => void;
  isActive: boolean;
}

const ToolbarItem = forwardRef<HTMLDivElement, ToolbarItemProps>(
  ({ config, onSelect, isActive }, ref) => {
    const handleClick = () => {
      onSelect(config.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        className={`${styles.toolbarItem} ${isActive ? styles.active : ""}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={config.description || `Open ${config.displayName}`}
        aria-pressed={isActive}
        aria-current={isActive ? "true" : undefined}
      >
        <span className={styles.tooltip} role="tooltip" aria-hidden="true">
          {config.displayName}
        </span>
        <img
          src={config.icon}
          alt=""
          className={styles.toolbarIcon}
          aria-hidden="true"
        />
      </div>
    );
  }
);

ToolbarItem.displayName = "ToolbarItem";

export default ToolbarItem;
