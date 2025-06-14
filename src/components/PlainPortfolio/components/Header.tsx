import React from "react";
import { PersonalInfo } from "../../../data";
import styles from "../PlainPortfolio.module.css";

interface HeaderProps {
  personalInfo: PersonalInfo;
}

const Header: React.FC<HeaderProps> = ({ personalInfo }) => {
  return (
    <div className={styles.header}>
      <div className={styles.profileSection}>
        <img
          src={personalInfo.profileImage}
          alt={personalInfo.name}
          className={styles.profileImage}
        />
        <div className={styles.headerContent}>
          <h1>{personalInfo.name}</h1>
          <h2>{personalInfo.tagline}</h2>
          <div className={styles.socialLinks}>
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
            >
              LeetCode
            </a>
            <a
              href={personalInfo.socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a href={personalInfo.socialLinks.email}>Email</a>
          </div>
        </div>
      </div>

      <div className={styles.backLink}>
        <a href="/" className={styles.backToOS}>
          ← Back to OS View
        </a>
      </div>
    </div>
  );
};

export default Header;
