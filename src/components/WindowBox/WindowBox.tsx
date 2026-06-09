import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import styles from "./WindowBox.module.css";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

interface WindowBoxProps {
  children: React.ReactNode;
  onClickClose: () => void;
  onClickMinimize?: () => void;
  zIndexVal: number;
  setActive: () => void;
  offset?: number;
  displayText: string;
  activeElement: boolean;
  displayTextMobile: string;
  initialWidth?: number;
  initialHeight?: number;
  windowId?: string;
}

interface Dimensions {
  height: number;
  width: number;
}

interface Position {
  x: number | string;
  y: number | string;
}

const WindowBox: React.FC<WindowBoxProps> = ({
  children,
  onClickClose,
  onClickMinimize,
  zIndexVal,
  setActive,
  offset = 0,
  displayText,
  activeElement,
  displayTextMobile,
  initialWidth = 60,
  initialHeight = 80,
  windowId,
}) => {
  const isMobile = useIsMobile(600);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: initialHeight,
    width: initialWidth,
  });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isMinimizing, setIsMinimizing] = useState<boolean>(false);

  const handleMinimize = () => {
    if (!onClickMinimize) {
      onClickClose();
      return;
    }

    // Aim the genie animation at this window's dock icon.
    const el = containerRef.current;
    const icon = windowId
      ? document.querySelector(`[data-dock-id="${windowId}"]`)
      : null;
    if (el && icon) {
      const iconRect = icon.getBoundingClientRect();
      const parentRect = (
        el.offsetParent as HTMLElement | null
      )?.getBoundingClientRect();
      if (parentRect) {
        // The minimizing transform replaces the drag translate, so the
        // target is computed from the window's untransformed layout box.
        const baseCx = parentRect.left + el.offsetLeft + el.offsetWidth / 2;
        const baseCy = parentRect.top + el.offsetTop + el.offsetHeight / 2;
        const dx = iconRect.left + iconRect.width / 2 - baseCx;
        const dy = iconRect.top + iconRect.height / 2 - baseCy;
        el.style.setProperty("--minimize-dx", `${dx}px`);
        el.style.setProperty("--minimize-dy", `${dy}px`);
      }
    }

    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimizing(false);
      onClickMinimize();
    }, 320);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile) {
        setDimensions({ height: initialHeight, width: initialWidth });
        setPosition({ x: "50%", y: "50%" });
      } else {
        setDimensions({ height: 100, width: 100 });
        setPosition({ x: 0, y: 0 });
      }
    };
    handleResize();
  }, [isMobile]);

  const handleZoom = () => {
    if (
      dimensions.height === initialHeight &&
      dimensions.width === initialWidth
    ) {
      setDimensions({ height: isMobile ? 100 : 90, width: 100 });
      setPosition({ x: 0, y: 0 });
    } else {
      setDimensions({ height: initialHeight, width: initialWidth });
      setPosition({ x: "50%", y: "50%" });
    }
  };

  const positionHandler = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      bounds="parent"
      onMouseDown={() => setActive()}
      onDrag={(e, data) => positionHandler(e, data)}
      position={{
        x: parseFloat(position.x.toString()),
        y: parseFloat(position.y.toString()),
      }}
      disabled={isMobile}
    >
      <div
        ref={containerRef}
        data-window="true"
        className={`${styles.container} ${
          isMinimizing ? styles.minimizing : ""
        }`}
        style={{
          zIndex: zIndexVal,
          top: dimensions.width === 100 ? 0 : `calc(10% - ${offset}px)`,
          left: dimensions.width === 100 ? 0 : `calc(10% - ${offset}px)`,
          height: `${dimensions.height}%`,
          width: `${dimensions.width}%`,
          boxShadow: activeElement
            ? "0 24px 64px rgba(0, 0, 0, 0.55), 0 0 0 0.5px rgba(255, 255, 255, 0.18)"
            : "0 10px 28px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.08)",
        }}
      >
        <div
          className={`${styles.statBar} ${
            activeElement ? "" : styles.statBarInactive
          }`}
        >
          {isMobile ? (
            <>
              <div className={styles.mobileBackButton} onClick={onClickClose}>
                <span className={styles.backArrow}>‹</span>
              </div>
              <div className={styles.mobileTitle}>{displayTextMobile}</div>
              <div className={styles.mobileSpacer}></div>
            </>
          ) : (
            <>
              <div
                className={styles.trafficLights}
                role="group"
                aria-label="Window controls"
              >
                <button
                  className={`${styles.light} ${styles.lightClose}`}
                  onClick={onClickClose}
                  aria-label="Close window"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <button
                  className={`${styles.light} ${styles.lightMinimize}`}
                  onClick={handleMinimize}
                  aria-label="Minimize window"
                >
                  <span aria-hidden="true">−</span>
                </button>
                <button
                  className={`${styles.light} ${styles.lightZoom}`}
                  onClick={handleZoom}
                  aria-label="Zoom window"
                >
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <div className={styles.windowTitle}>{displayText}</div>
              <div className={styles.titleSpacer}></div>
            </>
          )}
        </div>
        <div className={styles.ContentContainer}>{children}</div>
      </div>
    </Draggable>
  );
};

export default WindowBox;
