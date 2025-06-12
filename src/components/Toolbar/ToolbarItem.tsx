import React from "react";
import styles from "./Toolbar.module.css";
import { WindowConfig } from "../../config/windowComponents";

interface ToolbarItemProps {
    config: WindowConfig;
    onSelect: (windowId: string) => void;
    isActive: boolean;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({
    config,
    onSelect,
    isActive,
}) => {
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
            className={`${styles.toolbarItem} ${isActive ? styles.active : ""}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={config.description || `Open ${config.displayName}`}
        >
            <span className={styles.tooltip}>{config.displayName}</span>
            <img
                src={config.icon}
                alt={`${config.displayName} icon`}
                className={styles.toolbarIcon}
            />
        </div>
    );
};

export default ToolbarItem;
