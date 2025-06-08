import React from "react";
import styles from "./Toolbar.module.css";
import ToolbarItem from "./ToolbarItem";
import { getToolbarItems, appConfig } from "../../config/windowComponents";

interface ToolbarProps {
    selectActiveItem: (item: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectActiveItem }) => {
    const toolbarItems = getToolbarItems();

    return (
        <div
            className={styles.container}
            style={{
                zIndex: appConfig.toolbar.maxZIndex,
            }}
            role="toolbar"
            aria-label="Application windows"
        >
            {toolbarItems.map((config) => (
                <ToolbarItem
                    key={config.id}
                    config={config}
                    onSelect={selectActiveItem}
                />
            ))}
        </div>
    );
};

export default Toolbar;
