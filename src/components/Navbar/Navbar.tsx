import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";
import { FaApple } from "react-icons/fa6";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useIsMobile } from "../../hooks/useIsMobile";
import { getWindowDisplayName } from "../../config/windowComponents";

const REPO_URL = "https://github.com/Arya-A-Nair/new-personal-website";

interface NavbarProps {
  setBrightness: (brightness: number) => void;
  brightness: number;
  onCommandCentreToggle?: () => void;
  activeElement?: string;
  onOpenApp?: (windowId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  setBrightness,
  brightness,
  onCommandCentreToggle,
  activeElement,
  onOpenApp,
}) => {
  const isMobile = useIsMobile(600);
  const navigate = useNavigate();
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeAppName = activeElement
    ? getWindowDisplayName(activeElement)
    : "Finder";

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

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        {!isMobile && (
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
              </div>
            )}
          </div>
        )}
        {!isMobile && <span className={styles.activeApp}>{activeAppName}</span>}
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

      <BatteryContainer setBrightness={setBrightness} brightness={brightness} />
    </div>
  );
};

export default Navbar;
