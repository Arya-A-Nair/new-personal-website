import React, { forwardRef, useRef } from "react";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./Toolbar.module.css";
import { WindowConfig } from "../../config/windowComponents";

const BASE_SIZE = 52;
const MAX_SIZE = 76;
const MAGNIFY_RANGE = 140;

interface ToolbarItemProps {
  config: WindowConfig;
  onSelect: (windowId: string) => void;
  isActive: boolean;
  isRunning: boolean;
  mouseX: MotionValue<number>;
  magnifyEnabled: boolean;
}

const ToolbarItem = forwardRef<HTMLDivElement, ToolbarItemProps>(
  ({ config, onSelect, isActive, isRunning, mouseX, magnifyEnabled }, ref) => {
    const itemRef = useRef<HTMLDivElement | null>(null);

    const distance = useTransform(mouseX, value => {
      const bounds = itemRef.current?.getBoundingClientRect();
      if (!bounds || !magnifyEnabled) return MAGNIFY_RANGE;
      return value - bounds.x - bounds.width / 2;
    });

    const sizeTarget = useTransform(
      distance,
      [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
      [BASE_SIZE, MAX_SIZE, BASE_SIZE]
    );

    const size = useSpring(sizeTarget, {
      mass: 0.1,
      stiffness: 170,
      damping: 14,
    });

    const handleClick = () => {
      onSelect(config.id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
      }
    };

    const setRefs = (el: HTMLDivElement | null) => {
      itemRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    return (
      <motion.div
        ref={setRefs}
        className={`${styles.toolbarItem} ${isActive ? styles.active : ""} ${
          isRunning ? styles.running : ""
        }`}
        style={magnifyEnabled ? { width: size, height: size } : undefined}
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
      </motion.div>
    );
  }
);

ToolbarItem.displayName = "ToolbarItem";

export default ToolbarItem;
