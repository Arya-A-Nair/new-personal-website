import React, { useEffect, useState } from "react";
import styles from "./CommandCentre.module.css";
import { WindowConfig } from "../../config/windowComponents";

interface CommandCentreProps {
  isVisible: boolean;
  onClose: () => void;
  windowConfigs: WindowConfig[];
  onApplicationSelect: (windowId: string) => void;
  windowStates: Record<string, { isVisible: boolean; zIndex: number }>;
}

const CommandCentre: React.FC<CommandCentreProps> = ({
  isVisible,
  onClose,
  windowConfigs,
  onApplicationSelect,
  windowStates,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = windowConfigs.filter(
    config =>
      config.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplicationClick = (windowId: string) => {
    onApplicationSelect(windowId);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      setSearchTerm("");
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Command Centre</h2>
          <input
            type="text"
            placeholder="Search applications..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.appsGrid}>
          {filteredApps.map(config => (
            <div
              key={config.id}
              className={`${styles.appCard} ${
                windowStates[config.id]?.isVisible ? styles.active : ""
              }`}
              onClick={() => handleApplicationClick(config.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  handleApplicationClick(config.id);
                }
              }}
            >
              <div className={styles.appIconContainer}>
                <img
                  src={config.icon}
                  alt={config.displayName}
                  className={styles.appIcon}
                />
                {windowStates[config.id]?.isVisible && (
                  <div className={styles.runningIndicator} />
                )}
              </div>
              <div className={styles.appInfo}>
                <h3 className={styles.appName}>{config.displayName}</h3>
                {config.description && (
                  <p className={styles.appDescription}>{config.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className={styles.noResults}>
            <p>No applications found matching "{searchTerm}"</p>
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.hint}>
            Press <kbd>ESC</kbd> to close or click outside
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandCentre;
