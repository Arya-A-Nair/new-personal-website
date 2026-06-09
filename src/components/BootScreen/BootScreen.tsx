import React from "react";
import { FaApple } from "react-icons/fa6";
import styles from "./BootScreen.module.css";

interface BootScreenProps {
  duration: number;
}

const BootScreen: React.FC<BootScreenProps> = ({ duration }) => {
  return (
    <div className={styles.bootScreen} role="status" aria-label="Loading">
      <FaApple className={styles.appleLogo} aria-hidden="true" />
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default BootScreen;
