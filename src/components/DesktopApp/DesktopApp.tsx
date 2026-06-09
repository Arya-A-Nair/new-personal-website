import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DesktopApp.module.css";
import iconPlain from "../../assets/icon-plain.svg";
import pdf from "../../assets/pdf.svg";
import { personalInfo } from "../../data";

const DesktopApp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.desktopIcons}>
      <div
        className={styles.desktopApp}
        onClick={() => navigate("/plain")}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate("/plain");
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open plain view of portfolio"
      >
        <div className={styles.iconContainer}>
          <img src={iconPlain} alt="" className={styles.icon} />
        </div>
        <span className={styles.label}>Plain View</span>
      </div>

      <div
        className={styles.desktopApp}
        onClick={() => window.open(personalInfo.socialLinks.resume, "_blank")}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open(personalInfo.socialLinks.resume, "_blank");
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Open resume PDF"
      >
        <div className={styles.iconContainer}>
          <img src={pdf} alt="" className={styles.icon} />
        </div>
        <span className={styles.label}>Resume.pdf</span>
      </div>
    </div>
  );
};

export default DesktopApp;
