import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";
import { FaApple, FaSignal, FaWifi } from "react-icons/fa6";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getWindowDisplayName } from "../../config/windowComponents";
import { ACHIEVEMENT_EVENT, getProgress } from "../../utils/achievements";

const REPO_URL = "https://github.com/Arya-A-Nair/new-personal-website";

interface NavbarProps {
  setBrightness: (brightness: number) => void;
  brightness: number;
  onCommandCentreToggle?: () => void;
  activeElement?: string;
  onOpenApp?: (windowId: string) => void;
  onTrophiesToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  setBrightness,
  brightness,
  onCommandCentreToggle,
  activeElement,
  onOpenApp,
  onTrophiesToggle,
}) => {
  const isMobile = useIsMobile(600);
  const navigate = useNavigate();
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [trophyProgress, setTrophyProgress] = useState(() => getProgress());
  const menuRef = useRef<HTMLDivElement>(null);

  const activeAppName = activeElement
    ? getWindowDisplayName(activeElement)
    : "Finder";

  useEffect(() => {
    const refresh = () => setTrophyProgress(getProgress());
    window.addEventListener(ACHIEVEMENT_EVENT, refresh);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, refresh);
  }, []);

  useEffect(() => {
    if (!appleMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAppleMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAppleMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [appleMenuOpen]);

  const handleRestart = () => {
    try {
      window.sessionStorage.removeItem("aryaos-booted");
    } catch {
      // Boot flag could not be cleared; reload still works.
    }
    window.location.href = "/";
  };

  const handleShutDown = () => {
    setAppleMenuOpen(false);
    window.dispatchEvent(new CustomEvent("aryaos-shutdown"));
  };

  if (isMobile) {
    return (
      <div
        className={`${styles.container} ${styles.iosStatusBar}`}
        data-chrome="true"
      >
        <div className={styles.iosLeft}>
          <DateTime />
        </div>
        <div className={styles.iosRight}>
          <FaSignal className={styles.iosIcon} aria-hidden="true" />
          <FaWifi className={styles.iosIcon} aria-hidden="true" />
          <BatteryContainer
            setBrightness={setBrightness}
            brightness={brightness}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} data-chrome="true">
      <div className={styles.leftSection}>
        <div className={styles.logoContainer} ref={menuRef}>
          <button
            className={`${styles.appleButton} ${
              appleMenuOpen ? styles.appleButtonOpen : ""
            }`}
            onClick={() => setAppleMenuOpen(prev => !prev)}
            aria-label="Apple menu"
            aria-expanded={appleMenuOpen}
            aria-haspopup="menu"
          >
            <FaApple className={styles.appleIcon} />
          </button>
          {appleMenuOpen && (
            <div className={styles.appleMenu} role="menu">
              <button
                className={styles.appleMenuItem}
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  onOpenApp?.("AboutUs");
                }}
              >
                About This Portfolio
              </button>
              <div className={styles.appleMenuSeparator} />
              <button
                className={styles.appleMenuItem}
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  window.open(REPO_URL, "_blank");
                }}
              >
                View Source on GitHub
              </button>
              <button
                className={styles.appleMenuItem}
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  navigate("/plain");
                }}
              >
                Switch to Plain View
              </button>
              <div className={styles.appleMenuSeparator} />
              <button
                className={styles.appleMenuItem}
                role="menuitem"
                onClick={handleRestart}
              >
                Restart...
              </button>
              <button
                className={styles.appleMenuItem}
                role="menuitem"
                onClick={handleShutDown}
              >
                Shut Down...
              </button>
            </div>
          )}
        </div>
        <span className={styles.activeApp}>{activeAppName}</span>
        {onCommandCentreToggle && (
          <button
            className={styles.commandCentreButton}
            onClick={onCommandCentreToggle}
            title="Command Centre (⌘K)"
            aria-label="Open Command Centre"
          >
            <BsGrid3X3Gap className={styles.commandCentreIcon} />
          </button>
        )}
      </div>

      <DateTime />

      <div className={styles.rightSection}>
        {onTrophiesToggle && (
          <button
            className={styles.trophyButton}
            onClick={onTrophiesToggle}
            title="Trophy Room"
            aria-label={`Open trophy room. ${trophyProgress.unlocked} of ${trophyProgress.total} unlocked`}
          >
            🏆
            <span className={styles.trophyCount}>
              {trophyProgress.unlocked}/{trophyProgress.total}
            </span>
          </button>
        )}
        <BatteryContainer
          setBrightness={setBrightness}
          brightness={brightness}
        />
      </div>
    </div>
  );
};

export default Navbar;
