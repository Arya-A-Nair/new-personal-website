import React from "react";
import styles from "./Navbar.module.css";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";
import { FaApple } from "react-icons/fa6";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useIsMobile } from "../../hooks/useIsMobile";

interface NavbarProps {
  setBrightness: (brightness: number) => void;
  brightness: number;
  onCommandCentreToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  setBrightness,
  brightness,
  onCommandCentreToggle,
}) => {
  const isMobile = useIsMobile(600);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        {!isMobile && (
          <div className={styles.logoContainer}>
            <FaApple className={styles.appleIcon} />
          </div>
        )}
        {onCommandCentreToggle && (
          <button
            className={styles.commandCentreButton}
            onClick={onCommandCentreToggle}
            title="Command Centre"
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
