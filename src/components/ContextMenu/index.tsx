import React, { useEffect, useRef } from "react";
import styles from "./ContextMenu.module.css";

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
  separatorAfter?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDismiss = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleDismiss);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleDismiss);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Keep the menu inside the viewport.
  const style: React.CSSProperties = {
    left: Math.min(x, window.innerWidth - 230),
    top: Math.min(y, window.innerHeight - items.length * 32 - 24),
  };

  return (
    <div ref={menuRef} className={styles.menu} style={style} role="menu">
      {items.map(item => (
        <React.Fragment key={item.label}>
          <button
            className={`${styles.item} ${item.danger ? styles.danger : ""}`}
            role="menuitem"
            onClick={() => {
              onClose();
              item.onClick();
            }}
          >
            {item.label}
          </button>
          {item.separatorAfter && <div className={styles.separator} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;
